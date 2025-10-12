import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Download } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import { InvoiceCase } from "@/Types"
import { useForm } from "@inertiajs/react"

type Props = {
    invoice : InvoiceCase
}


export default function DetailsInvoice({invoice} : Props) {
    const [isPaid, setIsPaid] = useState(invoice.payment_status === "paid")


//   const total = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const form = useForm({
        payment_status  :  isPaid ? "paid" : "unpaid",
        payment_date : new Date()
    });
  const handleDownload = () => {

  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Invoice Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Invoice #{invoice.invoice_number}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Issued on {invoice.invoice_date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isPaid ? "success" : "destructive"}>
              {isPaid ? "Paid" : "Unpaid"}
            </Badge>
            <Switch checked={isPaid} onCheckedChange={setIsPaid} />
          </div>
        </CardHeader>

        <CardContent>
          {isPaid && (
            <div className="flex items-center gap-3 mt-2">
              <Label className="text-sm">Paid Date:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.data.payment_date ? format(form.data.payment_date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.data.payment_date || new Date()}
                    onSelect={(val)=> form.setData('payment_date' , val ?? new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <p>{invoice.case.doctor.name}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p>{invoice.case.doctor.email || '-'}</p>
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
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">${parseInt(item.unit_price).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    ${(parseInt(item.quantity) * parseInt(item.unit_price)).toFixed(2)}
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
          <p className="text-2xl font-bold">${invoice.total_amount}</p>
        </div>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          Download Invoice
        </Button>
      </div>
    </div>
  )
}
