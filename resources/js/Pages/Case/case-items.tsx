import FormField from "@/components/form-field";
import SelectField from "@/components/select-field"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product, Service, statusCase } from "@/Types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCheckIcon, Clock, icons, Timer, Trash } from "lucide-react";


const STATUS_ITEM = [
    {
        id: "pending",
        name: "Pending",
        icon : Clock
    },
    {
        id: "in_progress",
        name: "In Progress",
        icon : Timer
    },
    {
        id: "completed",
        name: "Completed",
        icon:CheckCheckIcon
    }
]

type caseItem = {
    service_id : string;
    tooth_number : string;
    shade : string;
    disk_type: string;
    quantity : string;
    unit_price : string;
    description:string;
    status : statusCase;
}


type Props = {
    service : Service[],
    index : number ,
    handleItemChange : (index : number , key : keyof caseItem , value : string  ) => void;
    item : caseItem ,
    calcLineTotal : (item : caseItem) => number;
    removeItem : (index : number) => void;
    errors: any; // Add errors prop
}

export default function CaseItems({service , index , item,  handleItemChange , calcLineTotal , removeItem, errors} : Props) {



  return (
    <div className="grid gap-x-4 md:grid-cols-8  border p-3 rounded-lg py-5">

        {/* Service */}
        <div className="flex-1 space-y-2">
            <Label>Service</Label>
                <Select value={item.service_id}
                onValueChange={(val) => {
                     const selectedPrice = service.find(s => s.id.toString() === val)?.price.toString() || "0";
                    handleItemChange(index, "service_id", val)
                    handleItemChange(index, "unit_price", selectedPrice);
                }}>
                <SelectTrigger className="w-full flex-1">
                    <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                    {service.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name} - {s.price}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors[`case_items.${index}.service_id`] &&
            <p className="text-red-500 text-sm">{errors[`case_items.${index}.service_id`]}</p>}
        </div>

        {/* tooth_number */}
        <FormField
            label="Tooth Number"
            placeholder="11,12"
            name="tooth_number"
            value={item.tooth_number}
            onChangeEvent={(value: string) => handleItemChange(index , "tooth_number" , value)}
            min="1"
            error={errors[`case_items.${index}.tooth_number`]}
        />

        <FormField
            label="Shade"
            required
            placeholder="2M2"
            name="shade"
            value={item.shade}
            onChangeEvent={(value: string) => handleItemChange(index , "shade" , value)}
            error={errors[`case_items.${index}.shade`]}
        />

        <FormField
            label="disk_type"
            placeholder="3D pro A2"
            name="disk_type"
            value={item.disk_type}
            onChangeEvent={(value: string) => handleItemChange(index , "disk_type" , value)}
            error={errors[`case_items.${index}.disk_type`]}
        />

        <FormField
            label="Quantity"
            type="number"
            placeholder="1"
            name="quantity"
            value={item.quantity}
            onChangeEvent={(value: string) => handleItemChange(index , "quantity" , value)}
            error={errors[`case_items.${index}.quantity`]}
        />

        {/* Price */}
        <FormField
            label="Price"
            // type="number"
            placeholder="Price"
            name="unit_price"
            value={item.unit_price}
            onChangeEvent={(value: string) => handleItemChange(index , "unit_price" , value)}
            min="0"
            error={errors[`case_items.${index}.unit_price`]}
        />

        {/* Note */}

        <FormField
            label="Note"
            // type="number"
            placeholder="description"
            name="description"
            value={item.description}
            onChangeEvent={(value: string) => handleItemChange(index , "description" , value)}
            min="0"
            error={errors[`case_items.${index}.description`]}
        />

        {/* Status */}
        <div className="flex-1 space-y-2">
            <Label>Status</Label>
            <SelectField
                options={STATUS_ITEM}
                value={item.status}
                onValueChange={(val) => {
                    handleItemChange(index, "status", val)
                }}
                placeholder='Select Status'
            />

            {errors[`case_items.${index}.status`] &&
            <p className="text-red-500 text-sm">{errors[`case_items.${index}.status`]}</p>}

            {/* <Label>Status</Label>
                <Select value={item.status}
                onValueChange={(val) => {
                    handleItemChange(index, "status", val)
                }}>
                <SelectTrigger className="w-full flex-1">
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    {STATUS_ITEM.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                        {s.name}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors[`case_items.${index}.status`] &&
            <p className="text-red-500 text-sm">{errors[`case_items.${index}.status`]}</p>} */}
        </div>


        {/* Line Total */}
        <div className="flex flex-col justify-end h-full py-2 items-end">
            <Label>Line Total</Label>
            <p className="font-semibold pt-2">
              {calcLineTotal(item).toFixed(2)}
            </p>
        </div>

        {/* Remove */}
        <div className="flex justify-center items-center h-full py-2">
            <Button
                type="button"
                variant="destructive"
                size="icon"
                className="cursor-pointer"
                onClick={() => removeItem(index)}
                >
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    </div>
  )
}
