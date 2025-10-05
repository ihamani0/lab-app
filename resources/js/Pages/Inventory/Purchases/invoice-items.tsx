import FormField from "@/components/form-field";
import SelectField from "@/components/select-field"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/Types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash } from "lucide-react";


type InvoiceItem = {
  material_id: string;
  ordered_quantity: string;
  unit_price: string;
  discount_percentage: string;
  tax_percentage :string;
  batch_number:string
  expiry_date : string
  received_quantity : string
};


type Props = {
    materials : Product[],
    index : number ,
    handleItemChange : (index : number , key : keyof InvoiceItem , value : string  ) => void;
    item : InvoiceItem ,
    calcLineTotal : (item : InvoiceItem) => number;
    removeItem : (index : number) => void;
    errors: any; // Add errors prop
}

export default function InvoiceItems({materials , index , item,  handleItemChange , calcLineTotal , removeItem, errors} : Props) {
  return (
    <div className="grid gap-x-4 md:grid-cols-7  xl:grid-cols-9 border p-3 rounded-lg py-5">

        {/* Material */}
        <div className="flex-1 space-y-2">
            <Label>Material</Label>
                <Select value={item.material_id} onValueChange={(val) => handleItemChange(index, "material_id", val)}>
                <SelectTrigger className="w-full">
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
            {errors[`items.${index}.material_id`] &&
            <p className="text-red-500 text-sm">{errors[`items.${index}.material_id`]}</p>}
        </div>

        {/* Quantity */}
        <FormField
            label="Quantity"
            type="number"
            placeholder="Quantity"
            name="ordered_quantity"
            value={item.ordered_quantity}
            onChangeEvent={(value: string) => handleItemChange(index , "ordered_quantity" , value)}
            min="1"
            error={errors[`items.${index}.ordered_quantity`]}
        />

        {/* Price */}
        <FormField
            label="Price"
            type="number"
            placeholder="Price"
            name="unit_price"
            value={item.unit_price}
            onChangeEvent={(value: string) => handleItemChange(index , "unit_price" , value)}
            min="0"
            error={errors[`items.${index}.unit_price`]}

        />
        {/* Discount */}
        <FormField
            label="Discount (%)"
            type="number"
            placeholder="Discount"
            name="discount_percentage"
            value={item.discount_percentage}
            onChangeEvent={(value: string) => handleItemChange(index , "discount_percentage" , value)}
            min="0"
            max="100"
            error={errors[`items.${index}.discount_percentage`]}
        />

        <FormField
            label="tax (%)"
            type="number"
            placeholder="Tax"
            name="tax_percentage"
            value={item.tax_percentage}
            onChangeEvent={(value: string) => handleItemChange(index , "tax_percentage" , value)}
            min="0"
            max="100"
            error={errors[`items.${index}.tax_percentage`]}
        />

        <FormField
            label="Batch Number :"
            placeholder="20240709-63"
            name="batch_number"
            value={item.batch_number}
            onChangeEvent={(value: string) => handleItemChange(index , "batch_number" , value)}
            error={errors[`items.${index}.batch_number`]}
        />

        <FormField
            label="Expire Date"
            placeholder="2027/09/12"
            name="expiry_date"
            value={item.expiry_date}
            onChangeEvent={(value: string) => handleItemChange(index , "expiry_date" , value)}
            error={errors[`items.${index}.expiry_date`]}
        />

        <FormField
            label="Received Qty"
            placeholder="00"
            name="received_quantity"
            value={item.received_quantity}
            onChangeEvent={(value: string) => handleItemChange(index , "received_quantity" , value)}
            error={errors[`items.${index}.received_quantity`]}
        />




        {/* Line Total */}
        <div className="flex flex-col justify-end h-full py-2 items-end">
            <Label>Line Total</Label>
            <p className="font-semibold pt-2">
              {calcLineTotal(item).toFixed(2)}
            </p>
        </div>

        {/* Remove */}
        <div className="flex justify-center h-full py-2">
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
