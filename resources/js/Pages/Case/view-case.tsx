
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
import { Case } from "@/Types"
import { format } from "date-fns"
import { BadgeInfo, Coins, EyeIcon, NotebookPenIcon, Package, Stethoscope, User, Wrench } from "lucide-react"



export default function ViewCase({prosthesis_case} : {prosthesis_case : Case}) {


  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="default" size="icon">
                <EyeIcon />
            </Button>
        </DialogTrigger>
      <DialogContent className="h-[70vh] overflow-y-auto"
        style={{width:'90vw' , maxWidth:'1200px'}}>

        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-center">
                <NotebookPenIcon />
                <h1 className="text-xl">Edit Case</h1>
                <Badge variant="outline" className="text-base shadow mx-2" >
                    #{prosthesis_case.case_number}
                </Badge>
          </DialogTitle>
          <div className="text-base text-muted-foreground my-4  grid grid-cols-2 ">

            <div className="space-y-4">
                <div className="flex items-center gap-1">
                    <Stethoscope/>
                    <span className="font-medium">{prosthesis_case.doctor.name}</span>
                </div>
                <div className="flex items-center gap-1">
                    <User/>
                    <span className="font-medium">{prosthesis_case.patient.name}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Wrench/>
                    <span className="font-medium">{prosthesis_case.technician.name}</span>
                </div>
            </div>
            <div className="space-y-4">
                <p className="flex gap-1 items-center">
                    Case Status:{" "}
                    <Badge variant={getBadgeVariantForPurchase(prosthesis_case.status)}>
                    {prosthesis_case.status}
                    </Badge>
                </p>
                {/* Check if te status is delevried to show the date */}
                {prosthesis_case.status === "delivered" && (
                    <p>
                        <p>Date: {format(prosthesis_case.delivered_date ?? "" , FORMAT_DATE)}</p>
                    </p>
                )}
            </div>


          </div>
        </DialogHeader>

        {/* Items Table */}
        <div className="overflow-x-auto space-x-4">

            <div className="flex items-center gap-x-3">
                <Package />
                Case Items
            </div>

            <div className="my-4">
            <table className="w-full border-collapse text-sm">
                <thead className="bg-muted">
                <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Service</th>
                    <th className="p-2 text-left">N Tooth</th>
                    <th className="p-2 text-right">Shade</th>
                    <th className="p-2 text-right">Disk Type</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Unit Price</th>
                    <th className="p-2 text-right">Status</th>
                    <th className="p-2 text-right">Total</th>
                </tr>
                </thead>
                <tbody>
                {prosthesis_case.case_items.map((item, i) => (
                    <tr key={i} className="border-t">
                    <td className="p-2">{i+1}</td>
                    <td className="p-2">{item.service.name}</td>
                    <td className="p-2">{item.tooth_number || '/'}</td>
                    <td className="p-2 text-right">{item.shade || '/'}</td>
                    <td className="p-2 text-right">{item.disk_type || '/'}</td>
                    <td className="p-2 text-right">{parseInt(item.quantity)}</td>
                    <td className="p-2 text-right">{parseInt(item.unit_price).toFixed(2)}</td>
                    <td className="p-2 text-right">{item.status}</td>
                    <td className="p-2 text-right">{parseInt(item.quantity) * parseInt(item.unit_price) }</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Totals */}

        <div className="mt-6 flex flex-col items-start space-y-1 text-base">
            <div className="flex items-center gap-x-2"><Coins /> Cost :</div>
          <p>Total: <span className="font-medium">{parseInt(prosthesis_case.total_cost || '0')?.toFixed(2) }</span></p>

        </div>

      </DialogContent>
    </Dialog>
  )
}
