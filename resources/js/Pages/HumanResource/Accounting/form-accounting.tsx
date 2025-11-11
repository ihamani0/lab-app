import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { User } from "@/Types"
import FormField from "@/components/form-field"



type Props = {
    accounting  ?: User;
    method : "post" | "put";
    action : string;
}


function FormAccounting({accounting , method , action} : Props) {




    const form = useForm({
        name: accounting?.name || "",
        email: accounting?.email || "",
        is_active : accounting?.is_active || false  ,
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
            placeholder="Technicien Name"
            value={form.data.name}
            error={clientErrors?.name || form.errors?.name}
            required
            onChangeEvent={(value) => {
                form.setData("name", value)
                setClientErrors(prev => ({ ...prev, name: "" }))
            }}
        />


      <FormField
            name="email"
            label="Email"
            placeholder="Email"
            value={form.data.email}
            type="email"
            error={clientErrors?.email || form.errors?.email}
            onChangeEvent={(value) => {
                form.setData("email", value)
            }}
        />


        {/* is_active */}



      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save Accounting"}
      </Button>
    </form>
  )
}

export default FormAccounting;
