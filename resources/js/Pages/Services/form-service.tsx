import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Doctor, Service } from "@/Types"
import FormField from "@/components/form-field"
import TextAriaField from "@/components/textaria-field"


type Props = {
    service  ?: Service;
    method : "post" | "put";
    action : string;
}

export default function FormService({service , method , action} : Props) {

    const form = useForm({
        name: service?.name || "",
        description: service?.description || "",
        price: service?.price || "",
  })

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errors: Record<string, string> = {}
    
    if (!form.data.name.trim()) errors.name = "Name is required"
    if (!form.data.price) errors.price = "Price is required"


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
            placeholder="Service Name"
            value={form.data.name}
            error={clientErrors?.name || form.errors?.name}
            required
            onChangeEvent={(value) => {
                form.setData("name", value)
                setClientErrors(prev => ({ ...prev, name: "" }))
            }}
        />


        {/* Description */}
        <TextAriaField 
                name="description"
                label="Description"
                placeholder="Service Description"
                value={form.data.description}
                error={form.errors?.description}
                onChange={(value) => {
                    form.setData("description", value)
                }}
        />




        {/* Cabine */}
        <FormField
                name="price"
                label="Price"
                placeholder="00.00 DZD"
                value={form.data.price}
                type="number"
                step="0.01"
                min="0"
                required
                error={clientErrors?.price || form.errors?.price}
                onChangeEvent={(value) => {
                    form.setData("price", value)
                }}
            />



      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save Service"}
      </Button>
    </form>
  )
}

 