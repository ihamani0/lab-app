import { router, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Brands, Category, Product as ProductType } from "@/Types"
import FormField from "@/components/form-field"
import TextAriaField from "@/components/textaria-field"
import SelectField from "@/components/select-field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  product?: ProductType
  categoroies: Category[]
  method: "post" | "put"
  action: string
}

function FormMaterial({ product, method, action, categoroies }: Props) {
  const [brands, setBrands] = useState([])

  const form = useForm({
    sku: product?.sku || "",
    name: product?.name || "",
    image: product?.image || null as File | string | null,
    description: product?.description || "",
    unit: product?.unit || "",
    stock_quantity: product?.stock_quantity || "",
    price: product?.price || "",
    min_stock: product?.min_stock || "",
    category_id: product?.category.id || "",
    brand_id: product?.brand.id || "",
  })

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errors: Record<string, string> = {}

    if (!form.data.name.trim()) errors.name = "Name is required"
    if (!form.data.min_stock) errors.min_stock = "Minimal stock is required"
    if (!form.data.category_id) errors.category_id = "Category is required"
    if (!form.data.brand_id) errors.brand_id = "Brand is required"

    setClientErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    // form.post(action, {
    //     _method: 'put',
    //   preserveScroll: true,
    //   forceFormData: true,
    //   onSuccess: () => form.reset(),
    // })
    router.post(action,  {
        _method: method, // Laravel will treat this as PUT
        ...form.data,   // all other fields
        image: form.data.image, // file if present
    }, {
        forceFormData: true, // ensures multipart/form-data
        preserveScroll: true,
        })
  }

  // fetch brands dynamically
  useEffect(() => {
    if (form.data.category_id) {
      fetch(`/brands/by-category/${form.data.category_id}`)
        .then((res) => res.json())
        .then((data) => setBrands(data))
    } else {
      setBrands([])
      form.setData("brand_id", "")
    }
  }, [form.data.category_id])

  return (
    <form onSubmit={submit} className="mt-6 px-4 space-y-6 overflow-y-auto">
      {/* SKU with prefix */}
      <div className="w-full sm:w-64 md:w-80">
        <Label htmlFor="sku">SKU (optinal)</Label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">
            MT-
          </span>
          <Input
            id="sku"
            type="text"
            placeholder="Enter SKU..."
            value={form.data.sku}
            onChange={(e) => form.setData("sku", e.target.value)}
            aria-label="Material SKU"
            className="w-full py-5 pl-12 pr-4"
          />
        </div>
      </div>

      {/* Name */}
      <FormField
        name="name"
        label="Name"
        placeholder="Material name"
        value={form.data.name}
        error={clientErrors?.name || form.errors?.name}
        required
        onChangeEvent={(value) => {
          form.setData("name", value)
          setClientErrors((prev) => ({ ...prev, name: "" }))
        }}
      />

      {/* Description */}
      <TextAriaField
        label="Description"
        placeholder="Enter description..."
        name="description"
        value={form.data.description}
        onChange={(value) => form.setData("description", value)}
      />

      {/* Stock */}
      <div className="flex items-center justify-between gap-x-2">

        <FormField
            name="stock_quantity"
            label="Stock Quantity"
            placeholder="Quantity"
            value={form.data.stock_quantity}
            error={clientErrors?.stock_quantity || form.errors?.stock_quantity}
            required
            onChangeEvent={(value) => {
                form.setData("stock_quantity", value)
                setClientErrors((prev) => ({ ...prev, stock_quantity: "" }))
            }}
        />
        <FormField
            name="unit"
            label="Unit "
            placeholder="Disk ..."
            value={form.data.unit}
            error={clientErrors?.unit || form.errors?.unit}
            required
            onChangeEvent={(value) => {
                form.setData("unit", value)
                setClientErrors((prev) => ({ ...prev, unit: "" }))
            }}
        />
        </div>

      {/* Min stock */}
      <div className="flex items-center justify-between gap-x-2">
        
            <FormField
            name="price"
            label="Price of the products"
            placeholder="Price..."
            value={form.data.price}
            error={clientErrors?.price || form.errors?.price}
            onChangeEvent={(value) => {
                form.setData("price", value)
                setClientErrors((prev) => ({ ...prev, price: "" }))
            }}
            />

            <FormField
                name="min_stock"
                label="Minimal Stock Quantity"
                placeholder="Minimal quantity..."
                value={form.data.min_stock}
                error={clientErrors?.min_stock || form.errors?.min_stock}
                required
                onChangeEvent={(value) => {
                    form.setData("min_stock", value)
                    setClientErrors((prev) => ({ ...prev, min_stock: "" }))
                }}
                />
        </div>

      {/* Category */}
      <SelectField
        options={categoroies}
        value={form.data.category_id?.toString() ?? ""}
        onValueChange={(value) => form.setData("category_id", value)}
        placeholder="Select Category"
        groupLabel="Categories"
        className="w-full"
      />

      {/* Brand */}
      <SelectField
        options={brands}
        value={form.data.brand_id?.toString() ?? ""}
        onValueChange={(value) => form.setData("brand_id", value)}
        placeholder="Select Brand"
        groupLabel="Brands"
        className="w-full"
      />

      {/* Image Upload */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => form.setData("image", e.target.files?.[0] || null)}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full cursor-pointer py-5"
        disabled={form.processing}
      >
        {form.processing ? "Saving..." : "Save Material"}
      </Button>
    </form>
  )
}

export default FormMaterial
