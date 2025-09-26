
import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"

import { PlusCircle } from "lucide-react"
import FormSuppliers from "./form-supplier"



function CreateSuppliers() {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Supplier <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>Add New Supplier</SheetTitle>
            <SheetDescription>
                Fill in the Category details and save.
            </SheetDescription>
        </SheetHeader>

            <FormSuppliers
                action="/suppliers"
                method="post"
            />

        <SheetFooter>
            <SheetClose asChild>
                <Button variant="outline">Close</Button>
            </SheetClose>
        </SheetFooter>
    </SheetContent>

    </Sheet>
  )
}
export default CreateSuppliers
