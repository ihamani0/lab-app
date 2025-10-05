import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";


import { Stock } from "@/Types";
import { router, useForm } from "@inertiajs/react";
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon, ArrowLeftRightIcon, Minus, PenIcon, Plus } from "lucide-react";
import { useState } from "react"

type Props = {
    stock : Stock
}

export default function EditStock({stock} : Props) {

    const form = useForm<{
        material_id: number;
        delta: number;
        type: string;
        raison: string;
    }>({
    material_id: stock.id,
    delta: 0,
    type: '',
    raison: ''
    });



    const newQuantity = parseInt(stock.quantity) + form.data.delta;


    const submit = () => {
        form.post('/stock');
    }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
            <PenIcon size="sm"/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{stock.name}<div className="text-2xl"> Current: {stock.quantity} → New: {newQuantity}</div></DrawerTitle>
            <DrawerDescription>
                    {form.errors.type && <p className="text-red-500">{form.errors.type}</p>}
                    {form.errors.delta && <p className="text-red-500">{form.errors.delta}</p>}
            </DrawerDescription>
          </DrawerHeader>

          {/* Contetn */}
          <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => form.setData('delta' , form.data.delta - 1)}
                        >
                        <Minus />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                        <div className="text-7xl font-bold tracking-tighter">
                            {form.data.delta}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Change (±) quantity
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => form.setData('delta' , form.data.delta + 1)}
                        >
                        <Plus />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-center px-3">
                           <Select value={form.data.type}
                           onValueChange={(val)=>form.setData('type', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectItem value="purchase_in"><ArrowBigRightDashIcon size='sm'/> Purchase In</SelectItem>
                                <SelectItem value="consumption_out"><ArrowBigLeftDashIcon size='sm'/>Consumption Out</SelectItem>
                                <SelectItem value="adjustment"><ArrowLeftRightIcon size={'sm'}/>Adjustment</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                    </div>
                    <div className=" px-3">
                        <Textarea placeholder="Type your raison here." onChange={(e) => form.setData('raison',e.target.value)} />
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={submit}>Submit</Button>
                    <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
      </Drawer>
  )
}
