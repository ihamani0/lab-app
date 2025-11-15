

 import { useForm, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BookCheckIcon, Calendar1, CalendarIcon, Check, NotebookPenIcon, NotebookText, Package, PlusCircle, Stethoscope, User, UserCog, UserIcon, Wrench } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout"
import { Doctor, User as TechniciansType, Patient, Case, statusCase, Service, FalshProps } from "@/Types"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useEffect } from "react"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import CaseItems from "./case-items"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@radix-ui/react-separator"
import { route } from "ziggy-js"



const STATUS = [
    {
        value: "pending",
        name: "Pending",
    },
    {
        value: "delivered",
        name: "Delivered",
    },
    {
        value: "canceled",
        name: "Canceled",
    },
    {
        value: "in_progress",
        name: "In Progress",
    },
    {
        value: "completed",
        name: "Completed",
    },
    {
        value: "on_hold",
        name: "On Hold",
    }
]


type PropsType = {
    prosthesis_case : Case
    doctors : Doctor[],
    technicians : TechniciansType[],
    patients : Patient[],
    service : Service[]
}

export default function PurchaseEdit({prosthesis_case , doctors, technicians, patients ,service }: PropsType) {




    const { flash }  =  usePage<FalshProps>().props ;


    const form = useForm({
        id : prosthesis_case.id,

        patient_id : prosthesis_case.patient?.id?.toString() ?? "",
        doctor_id : prosthesis_case.doctor?.id?.toString() ?? "",
        technician_id : prosthesis_case.technician?.id?.toString() ?? "",

        assistant : prosthesis_case.assistant ?? "",
        description: prosthesis_case.description?? "",
        status : prosthesis_case.status ?? "pending" ,

        delivered_date : prosthesis_case.delivered_date? new Date(prosthesis_case.delivered_date) : null,

        case_items : prosthesis_case.case_items.map(item => ({
            service_id : item.service.id.toString() ,
            tooth_number : item.tooth_number ,
            description : item.description ,
            shade : item.shade,
            disk_type: item.disk_type,
            quantity : item.quantity ,
            unit_price : item.unit_price ,
            status : item.status ?? "pending"
        }))
    });



  const addItem = () => {
    form.setData("case_items", [
      ...form.data.case_items,
      { service_id: "", tooth_number: "", shade: "", disk_type: "", quantity: "1", unit_price: "0",description:"" , status: "pending" },
    ])
  }

  const removeItem = (index: number) => {
    const newItems = [...form.data.case_items]
    newItems.splice(index, 1)
    form.setData("case_items", newItems)
  }

  const handleItemChange = (index: number, key: keyof typeof form.data.case_items[0], value: string) => {
    const newItems = [...form.data.case_items]
    if(!newItems[index])return;
    (newItems[index] as any)[key] = value; // Temporarily cast to any to bypass type checking for status
    form.setData("case_items", newItems)
  }

  const calcLineTotal = (item: typeof form.data.case_items[0]) => {
    const quantity = parseFloat(item.quantity) || 0
    const price = parseFloat(item.unit_price) || 0
    const subtotal = quantity * price
    return subtotal
  }

  const totalAmount = form.data.case_items.reduce((sum, item) => sum + calcLineTotal(item), 0)



  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log(route('prosthesis-case.update' , {"prosthesis-case" : prosthesis_case.id} ))
    form.put(route('prosthesis-case.update' , {"prosthesis_case" : prosthesis_case.id} ) ,
    {
        preserveScroll: true,
    });
  }


  useEffect(() => {
    if (form.errors.case_items) {
      toast.error(form.errors.case_items)
    }
    if(flash){
        flash.success && toast.success(flash.success)
        flash.error && toast.error(flash.error)
    }
  }, [form.errors , flash])



  return (
    <AppLayout breadcrumbs={[
      { title: "Dashboard", href: route('dashboard') },
      { title: "Case Management", href: route('prosthesis-case.index') },
      { title: "Edit Case", href: route('prosthesis-case.edit' , prosthesis_case.id) },
    ]}>
      <form onSubmit={submit} className="space-y-6">

        {/* Header */}
        <Card className="m-4">
          <CardHeader><CardTitle className="flex gap-x-2 items-center" >
                <NotebookPenIcon />
                <h1 className="text-lg">Edit Case</h1>
                <Badge variant="outline" className="text-base shadow mx-2" >
                    #{prosthesis_case.case_number}
                </Badge>
            </CardTitle>
            </CardHeader>
            {/* flex flex-col */}
          <CardContent className="flex flex-col  ">


            <div className="grid gap-3 grid-cols-1  md:grid-cols-2 flex-1" >
                {/* Col 3 */}
                <div className="space-y-5">

                    {/* Doctors */}
                    <div className="space-y-2">
                    <Label className="flex gap-x-1 items-center text-lg">
                        <Stethoscope/>
                        Doctor
                        </Label>
                    <Select value={form.data.doctor_id} onValueChange={(val) => form.setData("doctor_id", val)} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                        {doctors.map((d) => (
                            <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    {/* ERROR DISPLAY */}
                    {form.errors.doctor_id && <p className="text-sm text-red-500 mt-1">{form.errors.doctor_id}</p>}
                    </div>


                    {/* Patient */}
                    <div className="space-y-2">
                    <Label className="flex gap-x-1 items-center text-lg">
                        <User/>
                        Patient</Label>
                    <Select value={form.data.patient_id} onValueChange={(val) => form.setData("patient_id", val)} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                        {patients.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    {form.errors.patient_id && <p className="text-sm text-red-500 mt-1">{form.errors.patient_id}</p>}
                    </div>

                    {/* Technician */}
                    <div className="space-y-2">
                    <Label className="flex gap-x-1 items-center text-lg" >
                        <Wrench />
                        Technician
                        </Label>
                    <Select value={form.data.technician_id} onValueChange={(val) => form.setData("technician_id", val)} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                        {technicians.map((t) => (
                            <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                    {form.errors.technician_id && <p className="text-sm text-red-500 mt-1">{form.errors.technician_id}</p>}
                </div>

                {/* Col 2 */}

                <div className="space-y-5">

                    {/* Assistant */}

                    <div className="space-y-2">

                        <Label className="flex gap-x-1 items-center text-lg">
                            <UserCog />
                            Assistant
                        </Label>
                        <Input value={form.data.assistant} onChange={(e) => form.setData("assistant", e.target.value)} />

                        {form.errors.assistant && <p className="text-sm text-red-500 mt-1">{form.errors.status}</p>}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label className="flex gap-x-1 items-center text-lg">
                                <BookCheckIcon />
                                Status</Label>
                            <Select value={form.data.status} onValueChange={(val) => form.setData("status", val as statusCase)}>
                                <SelectTrigger className="w-full" >
                                    <SelectValue placeholder="Select status" /></SelectTrigger>
                                <SelectContent>
                                {STATUS.map((st) => <SelectItem key={st.value} value={st.value}>{st.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {form.errors.status && <p className="text-sm text-red-500 mt-1">{form.errors.assistant}</p>}
                    </div>



                    {/* Delivery Date */}
                    {(form.data.status === "completed" || form.data.status === "delivered") && (
                    <div className="space-y-2 w-full">
                    <Label className="flex gap-x-1 items-center text-lg">
                        <Calendar1 />
                        Delivery Date
                        </Label>
                        <Popover>
                            {/* I avoid asChild here to avoid ref-forwarding issues */}
                            <PopoverTrigger>
                            <Button
                            type="button"
                                variant="outline"
                                data-empty={!form.data.delivered_date}
                                className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>
                                {form.data.delivered_date
                                    ? format(form.data.delivered_date as Date, "PPP")
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
                                selected={form.data.delivered_date ??  undefined}
                                // pass a callback — date is Date | undefined
                                onSelect={(date) => form.setData("delivered_date", date ?? null)}
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
                        {form.errors.delivered_date && <p className="text-red-500 text-sm">{form.errors.delivered_date}</p>}
                    </div>
                    )}
                </div>
            </div>

            <Separator className="my-4 border " />
            <div className="">
                {/* description*/}
                <div className="space-y-2">
                <Label className="flex gap-x-1 items-center text-lg">
                    <NotebookText />
                    Description</Label>
                <Textarea
                //   placeholder="description"
                    defaultValue={form.data.description}
                onChange={(val)=> form.setData("description" , val.target.value)}
                />
                </div>
                {form.errors.description && <p className="text-sm text-red-500 mt-1">{form.errors.description}</p>}
            </div>


          </CardContent>
        </Card>

        {/* Items */}

        <Card className="mx-4">
          <CardHeader className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-x-3">
                <Package />
                Case Items
                </CardTitle>
            <CardAction>
              <Button type="button" onClick={addItem} size="sm"><PlusCircle className="w-4 h-4 mr-1" /> Add Item</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {form.data.case_items.map((item, index) => (
              <CaseItems
                key={index}
                index={index}
                item={item}
                service={service}
                handleItemChange={handleItemChange}
                calcLineTotal={calcLineTotal}
                removeItem={removeItem}
                errors={form.errors}
              />
            ))}
          </CardContent>
        </Card>


        {/* Summary */}


        <Card className="mx-4">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent>
            <p className="text-lg"><span className="font-semibold">Total:</span> {totalAmount.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-center w-full m-4">
          <Button type="submit" className="py-6 px-10">Update Case</Button>
        </div>
      </form>
    </AppLayout>
  )
}
