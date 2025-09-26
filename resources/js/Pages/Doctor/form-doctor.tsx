import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Doctor } from "@/Types"
import FormField from "@/components/form-field"


type Props = {
    doctor  ?: Doctor;
    method : "post" | "put";
    action : string;
}


function FormDoctor({doctor , method , action} : Props) {



    const form = useForm({
        name: doctor?.name || "",
        phone: doctor?.phone || "",
        address: doctor?.address || "",
        email: doctor?.email || "",
        cabine: doctor?.cabine || "",
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
            onChange={(value) => {
                form.setData("name", value)
                setClientErrors(prev => ({ ...prev, name: "" }))
            }}
        />

      {/* Phone */}
      <FormField
            name="phone"
            label="Phone Number"
            placeholder="Phone Number"
            value={form.data.phone}
            error={clientErrors?.phone || form.errors?.phone}
            onChange={(value) => {
                form.setData("phone", value)
            }}
        />

      <FormField
            name="email"
            label="Email"
            placeholder="Email"
            value={form.data.email}
            type="email"
            error={clientErrors?.email || form.errors?.email}
            onChange={(value) => {
                form.setData("email", value)
            }}
        />

      {/* Email */}
        <FormField
            name="address"
            label="address"
            placeholder="Address"
            value={form.data.address}
            error={clientErrors?.address || form.errors?.address}
            onChange={(value) => {
                form.setData("address", value)
            }}
        />


        {/* Cabine */}
        <FormField
                name="cabine"
                label="cabine"
                placeholder="Cabine Name"
                value={form.data.cabine}

                error={clientErrors?.cabine || form.errors?.cabine}
                onChange={(value) => {
                    form.setData("cabine", value)
                }}
            />



      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save Doctor"}
      </Button>
    </form>
  )
}

export default FormDoctor
