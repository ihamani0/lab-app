import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Plus,
  Calendar1,
  CalendarIcon,
  HeartPulse
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";


import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { useForm } from '@inertiajs/react';
import FormField from '@/components/form-field';
import { UserNurse } from '@/components/ui/NurseIcon';
import { route } from 'ziggy-js';
import { toast } from 'sonner';
import { Doctor, Patient } from "@/Types";

type props ={
    patients: Patient[];
    doctor : Doctor
}

export default function CreateCaseDoctor({patients , doctor} : props) {

    const form = useForm({
            doctor_id: doctor.id  ,
            received_date: undefined as Date | undefined ,
            patient_id: "",
            description:"",
            assistant:""
      })
    const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

    const validate = () => {
    const errors: Record<string, string> = {}
        if (!form.data.patient_id) errors.patient_id = "Patient is required"
        if (!form.data.assistant.trim()) errors.assistant = "Assistant is required"
        if (!form.data.description) errors.description = "Description date is required"

        setClientErrors(errors)
        return Object.keys(errors).length === 0
    }


    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        // Submit the form data
        form.post(route('prosthesis-case.store'), {
        preserveScroll: true,
        onError: (e) => {
            // keep form open, just show errors

        },
        onSuccess: () => {
            form.reset()
            // ⚡ only close sheet here if you control it with state
            toast.success("Case created successfully");
        },
        })
    }


  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> New Case
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>
                    Add a new patient case
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="mt-6 px-4 space-y-4">

                <div className="w-full space-y-3">
                <Label> <Calendar1/> Date : (no selected = today)</Label>
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

            {/* assistant */}
            <div className="w-full space-y-3">
                <Label> <UserNurse  /> Assistant</Label>
                <FormField
                    label=""
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
                    placeholder="description crown, bridge, T:A2 ...."
                    onChange={(e) => form.setData('description' , e.target.value)}
                />
                {(clientErrors.description || form.errors.description) && (
                    <p className="text-red-500 text-sm">{clientErrors.description || form.errors.description}</p>
                )}
            </div>
            {/* Submit */}
            <Button type="submit" className="w-full cursor-pointer py-5"  disabled={form.processing}>
                {form.processing ? "Saving..." : "Save CASE"}
            </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}
