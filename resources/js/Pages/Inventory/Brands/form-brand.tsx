import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Brands, Category, Doctor } from "@/Types"
import FormField from "@/components/form-field"
import TextAriaField from "@/components/textaria-field"
import SelectField from "@/components/select-field"


type Props = {
    brand  ?: Brands;
    categoroies:Category[];
    method : "post" | "put";
    action : string;
}


function FormBrand({brand , method , action ,categoroies} : Props) {


    // console.log(brand , categoroies);

    const form = useForm({
        name: brand?.name || "",
        description: brand?.description || "",
        category_id: brand?.category.id || "",
  })

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errors: Record<string, string> = {}

    if (!form.data.name.trim()) errors.name = "Name is required"

    setClientErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) return

    form[method](action, {
      preserveScroll: true,
      onError: () => {
        // keep form open, just show errors
      },
      onSuccess: () => {
        form.reset()
        // ⚡ only close sheet here if you control it with state
      },
    })
  }

  return (
    <form onSubmit={submit} className="mt-6 px-4 space-y-4">
      {/* Name */}
      <FormField
            name="name"
            label="Name"
            placeholder="Doctor Name"
            value={form.data.name}
            error={clientErrors?.name || form.errors?.name}
            required
            onChangeEvent={(value) => {
                form.setData("name", value)
                setClientErrors(prev => ({ ...prev, name: "" }))
            }}
        />



        <TextAriaField
            label="descrption"
            placeholder="descrption ."
            name="descrption"
            value={form.data.description}
            onChange={(value) => {
                form.setData("description", value)
            }}
        />


        <SelectField
            options={categoroies}
            value={form.data.category_id?.toString() ?? ""}
            onValueChange={(value) => {
                form.setData("category_id", value)
            }}
            placeholder="Select Category"
            groupLabel="Categories"
            className="w-full"
            triggerClassName="w-full"
            contentClassName="w-full"
        />




      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save Brand"}
      </Button>
    </form>
  )
}

export default FormBrand;
