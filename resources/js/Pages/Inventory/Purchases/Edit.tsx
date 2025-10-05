import { router, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CalendarIcon, PlusCircle } from "lucide-react"

import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, Product, Suppiler, Purchase } from "@/Types"
import InvoiceItems from "./invoice-items"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useEffect } from "react"
import { toast } from "sonner"

// Example enums (adjust based on your backend)

const STATUS = [
    {
        value: "draft",
        name: "Draft",
    },
    {
        value: "confirmed",
        name: "Confirmed",
    },
    {
        value: "cancelled",
        name: "Cancelled",
    }
    ,
    {
        value: "received",
        name: "Received",
    }
    ,
    {
        value: "partially_received",
        name: "Partially Received",
    }
] as const

const PAYMENT_STATUS = [
    { value : "pending" , name : "Pending"},
    { value : "partial" , name : "Partial"},
    { value : "paid" , name : "Paid"}
] as const

type PropsType = {
  suppliers: Suppiler[]
  materials: Product[]
  purchase: Purchase
}

export default function PurchaseEdit({ suppliers, materials, purchase }: PropsType) {


  const form = useForm({
    supplier_id: purchase.supplier.id?.toString() ?? "",
    invoice_number: purchase.invoice_number ?? "",
    purchase_date: purchase.purchase_date ? new Date(purchase.purchase_date) : null,
    invoice_pdf: null as File | null,
    tax: purchase.tax_amount?.toString() ?? "",
    status: purchase.status ?? "draft",
    // payment_status: purchase.payment_status ?? "pending",
    paid_amount : purchase.paid_amount?.toString() ?? "",
    // ==============================================
    items: purchase.purchase_items.map((item) => ({
      material_id: item.material.id.toString(),
      ordered_quantity: item.ordered_quantity.toString(),
      unit_price: item.unit_price.toString(),
      discount_percentage: item.discount_percentage.toString(),
      tax_percentage: item.tax_percentage.toString(),
      batch_number: item.batch_number ?? "",
      expiry_date: item.expiry_date ?? "",
      received_quantity : item.received_quantity.toString()
    })),
  })

  const addItem = () => {
    form.setData("items", [
      ...form.data.items,
      { material_id: "", ordered_quantity: "1", unit_price: "0", discount_percentage: "0", tax_percentage: "0", batch_number: "0", expiry_date: ""  , received_quantity : "0" },
    ])
  }

  const removeItem = (index: number) => {
    const newItems = [...form.data.items]
    newItems.splice(index, 1)
    form.setData("items", newItems)
  }

  const handleItemChange = (index: number, key: keyof typeof form.data.items[0], value: string) => {
    const newItems = [...form.data.items]
    if(!newItems[index])return;
    newItems[index][key] = value
    form.setData("items", newItems)
  }

  const calcLineTotal = (item: typeof form.data.items[0]) => {
    const quantity = parseFloat(item.ordered_quantity) || 0
    const price = parseFloat(item.unit_price) || 0
    const discount = parseFloat(item.discount_percentage) || 0
    const subtotal = quantity * price
    return subtotal - subtotal * (discount / 100)
  }

  const totalAmount = form.data.items.reduce((sum, item) => sum + calcLineTotal(item), 0)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // form.put(`/purchases/${purchase.id}`, {
    //   forceFormData: true,
    // })
    router.post(`/purchases/${purchase.id}` , {
        _method : "put" ,
        ...form.data ,
        invoice_pdf : form.data.invoice_pdf ,
    } ,
    {
        forceFormData: true, // ensures multipart/form-data
        preserveScroll: true,
    });
  }

  useEffect(() => {
    if (form.errors.items) {
      toast.error(form.errors.items)
    }
  }, [form.errors.items])

  return (
    <AppLayout breadcrumbs={[
      { title: "Dashboard", href: "/" },
      { title: "Purchase Management", href: "/purchases" },
      { title: "Edit Purchase", href: `/purchases/${purchase.id}/edit` },
    ]}>
      <form onSubmit={submit} className="space-y-6">

        {/* Header */}
        <Card className="m-4">
          <CardHeader><CardTitle>Edit Purchase Invoice</CardTitle></CardHeader>
          <CardContent className="grid gap-3 grid-cols-1  md:grid-cols-4">

            {/* Supplier */}
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Select value={form.data.supplier_id} onValueChange={(val) => form.setData("supplier_id", val)} >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Invoice Number */}
            <div className="space-y-2">
              <Label>Invoice Number</Label>
              <Input value={form.data.invoice_number} onChange={(e) => form.setData("invoice_number", e.target.value)} />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.data.status} onValueChange={(val) => form.setData("status", val)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  {STATUS.map((st) => <SelectItem key={st.value} value={st.value}>{st.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/*
            Payment Status

            <div className="space-y-2">
            <Label>Payment Status</Label>
            <Select
                value={form.data.payment_status}
                onValueChange={(val) => form.setData("payment_status", val)}
            >
                <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                {PAYMENT_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                    {status.name}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div> */}

            {/* Invoice Date */}
            <div className="space-y-2 w-full">
              <Label>Purchase Date</Label>
                <Popover>
                    {/* I avoid asChild here to avoid ref-forwarding issues */}
                    <PopoverTrigger>
                    <Button
                    type="button"
                        variant="outline"
                        data-empty={!form.data.purchase_date}
                        className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                        {form.data.purchase_date
                            ? format(form.data.purchase_date as Date, "PPP")
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
                        selected={form.data.purchase_date ??  undefined}
                        // pass a callback — date is Date | undefined
                        onSelect={(date) => form.setData("purchase_date", date ?? null)}
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
            </div>


            {/* paid_amount*/}
            <div className="space-y-2">
            <Label>Paid Amount</Label>
            <Input
              type="number"
              value={form.data.paid_amount}
              placeholder="00.00"
              onChange={(val)=> form.setData("paid_amount" , val.target.value)}
              />
            </div>


            {/* Upload New invoice  */}
            <div className="space-y-2 md:col-span-full">
            <Label>New Invoice (PDF)</Label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => form.setData("invoice_pdf", e.target.files?.[0] ?? null)}
            />
            </div>



          </CardContent>
        </Card>

        {/* Items */}
        <Card className="mx-4">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Invoice Items</CardTitle>
            <CardAction>
              <Button type="button" onClick={addItem} size="sm"><PlusCircle className="w-4 h-4 mr-1" /> Add Item</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {form.data.items.map((item, index) => (
              <InvoiceItems
                key={index}
                index={index}
                item={item}
                materials={materials}
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
          <Button type="submit" className="py-6 px-10">Update Purchase</Button>
        </div>
      </form>
    </AppLayout>
  )
}
