
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FORMAT_DATE } from "@/constants"
import { getBadgeVariantForPurchase } from "@/lib/utils"
import { Purchase } from "@/Types"
import { format } from "date-fns"
import { BadgeInfo, EyeIcon } from "lucide-react"

export default function ViewPurchase({purchase} : {purchase : Purchase}) {

    console.log(purchase)
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="default" size="icon">
                <EyeIcon />
            </Button>
        </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Invoice #{purchase.invoice_number}</DialogTitle>
          <div className="text-sm text-muted-foreground">
            <p>Supplier: <span className="font-medium">{purchase.supplier.name}</span></p>
            <p>Date: {format(purchase.purchase_date , FORMAT_DATE)}</p>
            <p>Status: <span className="capitalize">{purchase.status}</span></p>
          </div>
        </DialogHeader>

        {/* Items Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Material</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Unit Price</th>
                <th className="p-2 text-right">Discount</th>
                <th className="p-2 text-right">Tax</th>
                <th className="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {purchase.purchase_items.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{i+1}</td>
                  <td className="p-2">{item.material.name}</td>
                  <td className="p-2 text-right">{item.ordered_quantity}</td>
                  <td className="p-2 text-right">{item.unit_price.toFixed(2)}</td>
                  <td className="p-2 text-right">{item.discount_amount.toFixed(2)}</td>
                  <td className="p-2 text-right">{item.tax_amount.toFixed(2)}</td>
                  <td className="p-2 text-right">{item.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-6 flex flex-col items-end space-y-1 text-sm">
          <p>Subtotal: <span className="font-medium">{purchase.subtotal_amount.toFixed(2)}</span></p>
          <p>Discount: <span className="font-medium">{purchase.discount_amount.toFixed(2)}</span></p>
          <p>Tax: <span className="font-medium">{purchase.tax_amount.toFixed(2)}</span></p>
          <p>Net: <span className="font-bold">{purchase.net_amount.toFixed(2)}</span></p>
          <p>Paid: <span className="font-medium">{purchase.paid_amount.toFixed(2)}</span></p>
          <p className="flex gap-1 items-center">
            <BadgeInfo/> Payment Status:{" "}
            <Badge variant={getBadgeVariantForPurchase(purchase.payment_status)}>
              {purchase.payment_status}
            </Badge>

          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
