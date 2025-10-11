
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

import FormField from "@/components/form-field"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Doctor, Patient, User } from "@/Types"
import { Calendar1, CalendarIcon, HeartPulse, PlusCircle, Stethoscope, Wrench } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"



type Props = {
    doctors : Doctor[];
    technicians : User[];
    patients: Patient[];
}

export default function FormCase({doctors , technicians , patients} : Props) {

    const form = useForm({
        doctor_id: "",
        received_date: undefined as Date | undefined ,
        patient_id: "",
        technician_id: "",
        description:"",
        assistant:""
  })

    const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

    const validate = () => {
    const errors: Record<string, string> = {}
        if (!form.data.doctor_id) errors.doctor_id = "Doctor is required"
        if (!form.data.patient_id) errors.patient_id = "Patient is required"
        if (!form.data.technician_id) errors.technician_id = "Technician is required"
        if (!form.data.assistant.trim()) errors.assistant = "Assistant is required"
        if (!form.data.received_date) errors.received_date = "Received date is required"

        setClientErrors(errors)
        return Object.keys(errors).length === 0
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) return

    form.post("/prosthesis-case", {
      preserveScroll: true,
      onError: (e) => {
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

    {/* Date */}
    <div className="w-full space-y-3">
        <Label> <Calendar1/> Date Purchase (no selected = today)</Label>
        <Popover>
            {/* I avoid asChild here to avoid ref-forwarding issues */}
            <PopoverTrigger className="w-full">
            <Button
                type="button"
                variant="outline"
                data-empty={!form.data.received_date}
                className="data-[empty=true]:text-muted-foreground w-full   justify-start text-left font-normal"
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>
                {form.data.received_date
                    ? format(form.data.received_date as Date, "PPP")
                    : "Pick a date"}
                </span>
            </Button>
            </PopoverTrigger>

            <PopoverContent
            className="w-auto p-0 z-50 "
            align="start"
            sideOffset={8}
            >
            <Calendar
                mode="single"
                // Calendar wants Date | undefined
                selected={form.data.received_date ??  undefined}
                // pass a callback — date is Date | undefined
                onSelect={(date) => form.setData("received_date", date ?? undefined)}
                modifiers={{
                    today: new Date(), // mark today's date
                }}
                modifiersClassNames={{
                    today: "bg-blue-500 text-white rounded-lg",
                }}
                className="rounded-md border"
            />
            </PopoverContent>
        </Popover>
        {(clientErrors.received_date || form.errors.received_date) && (
            <p className="text-red-500 text-sm">{clientErrors.received_date || form.errors.received_date}</p>
        )}
    </div>

    {/* Doctor   */}
    <div className="w-full space-y-3">
        <Label> <Stethoscope />  Doctor</Label>
        <Select
            value={form.data.doctor_id}
            onValueChange={(val) => form.setData("doctor_id", val)}

        >
            <SelectTrigger className="w-full py-5">
            <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent  className="min-w-[var(--radix-select-trigger-width)]" >
            {doctors.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                {s.name}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
        {(clientErrors.doctor_id || form.errors.doctor_id) && (
            <p className="text-red-500 text-sm">{clientErrors.doctor_id || form.errors.doctor_id}</p>
        )}
    </div>


    {/* patien_id  */}
    <div className="w-full space-y-3">
        <Label> <HeartPulse /> Patien</Label>
        <Select
            value={form.data.patient_id}
            onValueChange={(val) => form.setData("patient_id", val)}

        >
            <SelectTrigger className="w-full py-5">
            <SelectValue placeholder="Select Patien" />
            </SelectTrigger>
            <SelectContent  className="min-w-[var(--radix-select-trigger-width)]" >
            {patients.map((p) => (
                <SelectItem key={p.id} value={p.id.toString()}>
                {p.name}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
        {(clientErrors.patient_id || form.errors.patient_id) && (
            <p className="text-red-500 text-sm">{clientErrors.patient_id || form.errors.patient_id}</p>
        )}
    </div>


    {/* technician_id */}
        <div className="w-full space-y-3">
        <Label><Wrench /> Technician</Label>
        <Select
            value={form.data.technician_id}
            onValueChange={(val) => form.setData("technician_id", val)}

        >
            <SelectTrigger className="w-full py-5">
            <SelectValue placeholder="Select Technician" />
            </SelectTrigger>
            <SelectContent  className="min-w-[var(--radix-select-trigger-width)]" >
            {technicians.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>
                {t.name}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
        {(clientErrors.technician_id || form.errors.technician_id) && (
            <p className="text-red-500 text-sm">{clientErrors.technician_id || form.errors.technician_id}</p>
        )}
    </div>

    {/* assistant */}
    <div className="w-full space-y-3">
        <FormField
            label="Assistant"
            name="assistant"

            placeholder="Assistant ..."
            value={form.data.assistant}
            onChangeEvent={(value: string) => form.setData("assistant", value)}
            min="0"
            max="100"
            error={clientErrors.assistant || form.errors.assistant}
        />
    </div>

    {/* description */}
    <div className="w-full space-y-3">

        <Textarea
            placeholder="description case Her ...."
            onChange={(e) => form.setData('description' , e.target.value)}
        />
    </div>




      {/* Submit */}
      <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
        {form.processing ? "Saving..." : "Save CASE"}
      </Button>
    </form>
  )
}


