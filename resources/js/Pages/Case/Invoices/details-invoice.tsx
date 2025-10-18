import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowBigLeftDashIcon, ArrowLeftCircle, CalendarIcon, Download, Link, User, Wrench } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import { BreadcrumbItem, FalshProps, InvoiceCase } from "@/Types"
import { router, useForm, usePage } from "@inertiajs/react"
import AppLayout from "@/Layouts/AppLayout"
import { toast } from "sonner"
import SelectField from "@/components/select-field"

type Props = {
    invoice : InvoiceCase
}


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
    title: 'Invoice Managment',
    href: '/prosthesis-invoice',
    },
    {
    title: 'Invoice Details',
    href: '/prosthesis-invoice',
    }
];


export default function DetailsInvoice({invoice} : Props) {
    const [isPaid, setIsPaid] = useState(invoice.payment_status === "paid")


//   const total = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const form = useForm({
        status : invoice.status,
        payment_status: invoice.payment_status
                        ? invoice.payment_status
                        : (isPaid ? "paid" : "unpaid"),
        payment_date : invoice.payment_date ? new Date(invoice.payment_date) : undefined
    });

    useEffect(() => {
        form.setData("payment_status", isPaid ? "paid" : "unpaid");
    }, [isPaid]);



    const { flash }  =  usePage<FalshProps>().props ;

        // For sonner Toast mesage Flash
        useEffect(()=>{
            if(flash.success){
                toast.success(flash.success)
            }

            if(flash.error){
                toast.error(flash.error)
            }
    } , [flash])




    const handleDownload = () => {
        window.location.href = `/prosthesis-invoice/${invoice.id}/download-invoice`;
    }

    const submit= (e : React.FormEvent)=>{
        e.preventDefault();

        if(isPaid  && !form.data.payment_date) return ;

        if(!isPaid) form.data.payment_date = undefined;

        form.put(`/prosthesis-invoice/${invoice.id}` , {
            preserveScroll: true,
        });
    }


  return (
    <AppLayout breadcrumbs={breadcrumbs}>

    <div className=" p-6 space-y-6 ">

      {/* Invoice Header */}
      <form onSubmit={submit }>
        <Card className="w-full shadow-md border rounded-lg">
        <CardHeader className="flex flex-col gap-4">
            {/* Header Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
                <CardTitle className="text-2xl font-bold">
                Invoice #{invoice.invoice_number}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                Issued on {invoice.invoice_date}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <SelectField
                options={[
                    { id: "draft", name: "Draft" },
                    { id: "final", name: "Final" },
                    { id: "canceled", name: "Canceled" },
                ]}
                value={form.data.status}
                onValueChange={(val) => form.setData("status", val)}
                />

                <Badge variant={isPaid ? "success" : "destructive"}>
                {isPaid ? "Paid" : "Unpaid"}
                </Badge>

                <Switch checked={isPaid} onCheckedChange={setIsPaid} />
            </div>
            </div>
        </CardHeader>

        <CardContent className="space-y-4">
            {/* Payment Date Section */}
            {isPaid && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Label className="text-sm font-medium">Paid Date:</Label>
                <Popover>
                <PopoverTrigger className="px-4 py-2 border rounded flex items-center gap-2 bg-muted/30 hover:bg-muted/50 transition">
                    <CalendarIcon className="h-4 w-4" />
                    {form.data.payment_date
                    ? format(form.data.payment_date, "PPP")
                    : "Pick a date"}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={form.data.payment_date || new Date()}
                    onSelect={(val) =>
                        form.setData("payment_date", val ?? new Date())
                    }
                    />
                </PopoverContent>
                </Popover>
            </div>
            )}
        </CardContent>

        <div className="flex justify-end items-center px-6 py-4 border-t bg-muted/10 rounded-b-lg">
            <Button
            type="submit"
            variant="amber"
            className="px-6 py-2"
            disabled={form.processing}
            >
            {form.processing ? "Updating..." : "Update"}
            </Button>
        </div>
        </Card>
    </form>
      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personale Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
            <div className="col-span-full grid grid-cols-2  ">
                    <div>
                    <Label>Billied To</Label>
                    <p>{invoice.case.doctor.name}</p>
                    </div>
                    <div>
                    <Label>Email</Label>
                    <p>{invoice.case.doctor.email || '-'}</p>
                    </div>
            </div>
            <div className="col-span-full grid grid-cols-2  ">
                <div>
                <Label> <User />Patient</Label>
                <p className="font-bold">{invoice.case.patient.name}</p>
                </div>
            </div>

            <div className="col-span-full grid grid-cols-2  ">
                <div>
                <Label> <Wrench /> Technician</Label>
                <p>{invoice.case.technician.name}</p>
                </div>
            </div>

        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px] text-center">Qty</TableHead>
                <TableHead className="w-[120px] text-right">Price</TableHead>
                <TableHead className="w-[120px] text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.case.case_items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.service.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">{parseInt(item.unit_price).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {(parseInt(item.quantity) * parseInt(item.unit_price)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Total + Download */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-2xl font-bold">{invoice.total_amount}</p>
        </div>
        <Button onClick={handleDownload} size="lg" className="gap-2 cursor-pointer">
          <Download className="h-5 w-5" />
          Download Invoice
        </Button>
      </div>
    </div>
    </AppLayout>

  )
}
