import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Category } from "@/Types"
import FormField from "@/components/form-field"
import { Textarea } from "@/components/ui/textarea"
import TextAriaField from "@/components/textaria-field"


type Props = {
    category  ?: Category;
    method : "post" | "put";
    action : string;
}


function FormCategory({category , method , action} : Props) {



    const form = useForm({
        name: category?.name || "",
        description: category?.description || "",
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





      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save Category"}
      </Button>
    </form>
  )
}

export default FormCategory;
