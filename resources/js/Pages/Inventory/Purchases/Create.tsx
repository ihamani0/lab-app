import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CalendarIcon, PlusCircle } from "lucide-react"

import AppLayout from "@/Layouts/AppLayout"
import { BreadcrumbItem, Product, Suppiler } from "@/Types"
import InvoiceItems from "./invoice-items"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import FormField from "@/components/form-field"
import { useEffect } from "react"
import { toast } from "sonner"


type PropsType = {
    suppliers : Suppiler[],
    materials : Product[],
}

type InvoiceItem = {
  material_id: string;
  ordered_quantity: string;
  unit_price: string;
  discount_percentage: string;
  tax_percentage :string;
  batch_number:string
  expiry_date : string
  received_quantity:string
};


const breadcrumbs : BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Purchase Managment',
        href: '/purchases',
    },
    {
    title: 'Create Purchase',
    href: '/purchases/create',
    }
];





export default function PurchaseCreate({ suppliers = [], materials = []  }:PropsType) {
  const form = useForm<{
    supplier_id: string;
    invoice_number: string;
    purchase_date: Date | null;
    invoice_pdf: File | null;
    tax: string;
    items: InvoiceItem[];
  }>({
    supplier_id: "",
    invoice_number: "",
    purchase_date: null,
    invoice_pdf: null,
    tax: '',
    items: [],
  })

  const addItem = () => {
    form.setData("items", [
      ...form.data.items,
      { material_id: "", ordered_quantity: "1", unit_price:"0", discount_percentage: '0' , tax_percentage : '0' ,  batch_number : '0' , expiry_date:'' , received_quantity : '0' },
    ])
  }

  const removeItem = (index: number) => {
    const newItems = [...form.data.items]
    newItems.splice(index, 1)
    form.setData("items", newItems)
  }

  const handleItemChange = (index: number, key: keyof InvoiceItem, value: string) => {
    console.log(typeof value)
    const newItems = [...form.data.items] as InvoiceItem[];

    if (newItems[index]) {
        newItems[index][key] = value;
        form.setData("items", newItems);
    }
  }

  const calcLineTotal = (item: InvoiceItem) => {
    const quantity = parseFloat(item.ordered_quantity) || 0;
    const price = parseFloat(item.unit_price) || 0;
    const discount = parseFloat(item.discount_percentage) || 0;
    const tax = parseFloat(item.tax_percentage) || 0;


    const subtotal = quantity * price;
    const discountAmount = subtotal * (discount / 100);
    const taxAmount = subtotal * (tax/100);
    return subtotal - discountAmount + taxAmount ;
  }

  const totalAmount = form.data.items.reduce(
    (sum, item) => sum + calcLineTotal(item),
    0
  )


  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    form.post('/purchases', {
      forceFormData: true, // for file upload
    });
  }


  useEffect(()=>{
    if(form.errors.items){
        toast.error(form.errors.items)
    }
  }, [form.errors.items])

  return (

    <AppLayout  breadcrumbs={breadcrumbs}>

    <form onSubmit={submit} className="space-y-6">

      {/* Invoice Header */}
    <Card className="m-4">
        <CardHeader>
          <CardTitle>Purchase Invoice</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {/* Supplier */}
        <div className="w-full space-y-3">
            <Label>Supplier</Label>
            <Select
              value={form.data.supplier_id}
              onValueChange={(val) => form.setData("supplier_id", val)}

            >
              <SelectTrigger className="w-full py-5">
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent  className="min-w-[var(--radix-select-trigger-width)]" >
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.errors.supplier_id && (
              <p className="text-red-500 text-sm">{form.errors.supplier_id}</p>
            )}
        </div>

          {/* Invoice Number */}
        <div className="w-full space-y-3">
            <Label>Invoice Number</Label>
            <Input
              type="text"
              className="py-5"
              value={form.data.invoice_number}
              onChange={(e) =>
                form.setData("invoice_number", e.target.value)
              }
            />
            {form.errors.invoice_number && (
              <p className="text-red-500 text-sm">{form.errors.invoice_number}</p>
            )}
          </div>

          {/* Tax  */}
        <div className="w-full space-y-3">
            <FormField
                label="Tax (TVA %)"
                name="tax"
                type="number"
                placeholder="Tax"
                value={form.data.tax}
                onChangeEvent={(value: string) => form.setData("tax", value)}
                min="0"
                max="100"
                error={form.errors.tax}
            />
        </div>


          {/* Upload PDF */}
        <div className="w-full space-y-3">
            <Label>Supplier Invoice (PDF)</Label>
            <Input
              type="file"

              accept="application/pdf"
              onChange={(e) =>
                form.setData("invoice_pdf", e.target.files?.[0] ?? null)
              }
            />
            {form.errors.invoice_pdf && (
              <p className="text-red-500 text-sm">{form.errors.invoice_pdf}</p>
            )}
        </div>

        {/* Invoice Date */}
        <div className="w-full space-y-3">
            <Label>Date Purchase (no selected = today)</Label>
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



            {form.errors.purchase_date && (
              <p className="text-red-500 text-sm">{form.errors.purchase_date}</p>
            )}
        </div>

        </CardContent>
      </Card>

      {/* Items Section */}
      <Card className="mx-4">

        <CardHeader className="flex justify-between items-center">
          <CardTitle>Invoice Items</CardTitle>
          <CardAction>
            <Button type="button" onClick={addItem} size="sm">
                <PlusCircle className="w-4 h-4 mr-1" /> Add Item
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">

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
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            <span className="font-semibold">Total:</span> {totalAmount.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-center w-full m-4">
      <Button type="submit" className="py-6 px-10 cursor-pointer">
        Save Purchase
      </Button>
      </div>
    </form>
    </AppLayout>

  )
}



{/* <div
    key={index}
    className="grid gap-2 md:grid-cols-6 items-end border p-3 rounded-lg py-5"
>

    <div className="flex flex-col justify-between items-center">
    <Label className="mb-3">Material</Label>
    <Select
        value={item.material_id}
        onValueChange={(val) =>
        handleItemChange(index, "material_id", val)
        }
    >
        <SelectTrigger>
        <SelectValue placeholder="Select material" />
        </SelectTrigger>
        <SelectContent>
        {materials.map((m) => (
            <SelectItem key={m.id} value={m.id.toString()}>
            {m.name}
            </SelectItem>
        ))}
        </SelectContent>
    </Select>
    {form.errors[`items.${index}.material_id`] && (
        <p className="text-red-500 text-sm">
        {form.errors[`items.${index}.material_id`]}
        </p>
    )}
    </div>


    <div>
    <Label>Quantity</Label>
    <Input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) =>
        handleItemChange(index, "quantity", e.target.value)
        }
    />
    {form.errors[`items.${index}.quantity`] && (
        <p className="text-red-500 text-sm">
        {form.errors[`items.${index}.quantity`]}
        </p>
    )}
    </div>


    <div>
    <Label>Price</Label>
    <Input
        type="number"
        min="0"
        value={item.price}
        onChange={(e) =>
        handleItemChange(index, "price", e.target.value)
        }
    />
    {form.errors[`items.${index}.price`] && (
        <p className="text-red-500 text-sm">
        {form.errors[`items.${index}.price`]}
        </p>
    )}
    </div>


    <div>
    <Label>Discount (%)</Label>
    <Input
        type="number"
        min="0"
        max="100"
        value={item.discount}
        onChange={(e) =>
        handleItemChange(index, "discount", e.target.value)
        }
    />
    {form.errors[`items.${index}.discount`] && (
        <p className="text-red-500 text-sm">
        {form.errors[`items.${index}.discount`]}
        </p>
    )}
    </div>


    <div>
    <Label>Line Total</Label>
    <p className="font-semibold">
        {calcLineTotal(item).toFixed(2)}
    </p>
    </div>

    <Button
    type="button"
    variant="destructive"
    size="icon"
    onClick={() => removeItem(index)}
    >
    <Trash className="w-4 h-4" />
    </Button>
</div> */}
