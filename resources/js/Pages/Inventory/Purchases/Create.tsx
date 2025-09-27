import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash } from "lucide-react"
import { useState } from "react"
import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem } from "@/Types"


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Purchase Managment',
        href: '/purchase',
    },
    {
    title: 'Create Purchase',
    href: '/purchases/create',
    }
];



export default function PurchaseCreate({ suppliers = [], materials = [] }) {
  const form = useForm({
    supplier_id: "",
    invoice_number: "",
    invoice_date: "",
    invoice_pdf: null,
    items: [],
  })

  const addItem = () => {
    form.setData("items", [
      ...form.data.items,
      { material_id: "", quantity: 1, price: 0, discount: 0 },
    ])
  }

  const removeItem = (index: number) => {
    const newItems = [...form.data.items]
    newItems.splice(index, 1)
    form.setData("items", newItems)
  }

  const handleItemChange = (index: number, key: string, value: any) => {
    const newItems = [...form.data.items]
    newItems[index][key] = value
    form.setData("items", newItems)
  }

  const calcLineTotal = (item) => {
    const subtotal = item.quantity * item.price
    const discountAmount = subtotal * (item.discount / 100)
    return subtotal - discountAmount
  }

  const totalAmount = form.data.items.reduce(
    (sum, item) => sum + calcLineTotal(item),
    0
  )

  const submit = (e) => {
    e.preventDefault()
    form.post(route("purchases.store"), {
      forceFormData: true, // for file upload
    })
  }

  return (

    <AppLayout  breadcrumbs={breadcrumbs}>

    <form onSubmit={submit} className="space-y-6">
      {/* Invoice Header */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Invoice</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {/* Supplier */}
          <div>
            <Label>Supplier</Label>
            <Select
              value={form.data.supplier_id}
              onValueChange={(val) => form.setData("supplier_id", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.errors.supplier_id && (
              <p className="text-red-500 text-sm">{form.errors.supplier_id}</p>
            )}
          </div>

          {/* Invoice Number */}
          <div>
            <Label>Invoice Number</Label>
            <Input
              value={form.data.invoice_number}
              onChange={(e) =>
                form.setData("invoice_number", e.target.value)
              }
            />
            {form.errors.invoice_number && (
              <p className="text-red-500 text-sm">{form.errors.invoice_number}</p>
            )}
          </div>

          {/* Invoice Date */}
          <div>
            <Label>Invoice Date</Label>
            <Input
              type="date"
              value={form.data.invoice_date}
              onChange={(e) =>
                form.setData("invoice_date", e.target.value)
              }
            />
            {form.errors.invoice_date && (
              <p className="text-red-500 text-sm">{form.errors.invoice_date}</p>
            )}
          </div>

          {/* Upload PDF */}
          <div>
            <Label>Supplier Invoice (PDF)</Label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                form.setData("invoice_pdf", e.target.files[0])
              }
            />
            {form.errors.invoice_pdf && (
              <p className="text-red-500 text-sm">{form.errors.invoice_pdf}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Invoice Items</CardTitle>
          <Button type="button" onClick={addItem} size="sm">
            <PlusCircle className="w-4 h-4 mr-1" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.data.items.map((item, index) => (
            <div
              key={index}
              className="grid gap-2 md:grid-cols-5 items-end border p-3 rounded-lg"
            >
              {/* Material */}
              <div>
                <Label>Material</Label>
                <Select
                  value={item.material_id}
                  onValueChange={(val) =>
                    handleItemChange(index, "material_id", val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((m) => (
                      <SelectItem key={m.id} value={m.id.toString()}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.errors[`items.${index}.material_id`] && (
                  <p className="text-red-500 text-sm">
                    {form.errors[`items.${index}.material_id`]}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
                {form.errors[`items.${index}.quantity`] && (
                  <p className="text-red-500 text-sm">
                    {form.errors[`items.${index}.quantity`]}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
                {form.errors[`items.${index}.price`] && (
                  <p className="text-red-500 text-sm">
                    {form.errors[`items.${index}.price`]}
                  </p>
                )}
              </div>

              {/* Discount */}
              <div>
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={item.discount}
                  onChange={(e) =>
                    handleItemChange(index, "discount", e.target.value)
                  }
                />
                {form.errors[`items.${index}.discount`] && (
                  <p className="text-red-500 text-sm">
                    {form.errors[`items.${index}.discount`]}
                  </p>
                )}
              </div>

              {/* Line Total */}
              <div>
                <Label>Line Total</Label>
                <p className="font-semibold">
                  {calcLineTotal(item).toFixed(2)}
                </p>
              </div>

              {/* Remove */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeItem(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            <span className="font-semibold">Total:</span> {totalAmount.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Submit */}
      <Button type="submit" className="w-full">
        Save Purchase
      </Button>
    </form>
    </AppLayout>

  )
}
