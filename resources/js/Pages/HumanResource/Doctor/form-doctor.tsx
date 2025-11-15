import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Doctor } from "@/Types"
import FormField from "@/components/form-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


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
        email: doctor?.user.email || "",
        cabine: doctor?.cabine || "",
        specialty: doctor?.specialty || "",
        in_clinic : doctor?.in_clinic || false,
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

      {/* Phone */}
      <FormField
            name="phone"
            label="Phone Number"
            placeholder="Phone Number"
            value={form.data.phone}
            error={clientErrors?.phone || form.errors?.phone}
            onChangeEvent={(value) => {
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
            onChangeEvent={(value) => {
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
            onChangeEvent={(value) => {
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
                onChangeEvent={(value) => {
                    form.setData("cabine", value)
                }}
            />

        {/* Cabine */}
        <FormField
                name="specialty"
                label="specialty"
                placeholder="Specialty"
                value={form.data.specialty}

                error={clientErrors?.specialty || form.errors?.specialty}
                onChangeEvent={(value) => {
                    form.setData("specialty", value)
                }}
            />

        <div className="flex items-center space-x-3">
            <Checkbox
                id="in_clinic"
                name="in_clinic"
                checked={form.data.in_clinic}
                onCheckedChange={(checked) =>
                    form.setData("in_clinic", checked === true)
                }
            />
            <Label htmlFor="in_clinic">In Clinic</Label>
        </div>



      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save Doctor"}
      </Button>
    </form>
  )
}

export default FormDoctor
