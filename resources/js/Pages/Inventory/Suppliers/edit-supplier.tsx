import { Suppiler } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"

import { Pen } from "lucide-react";
import FormSuppliers from "./form-supplier";


type Props = {
    Suppiler : Suppiler ,

}


function EditSuppliers({Suppiler }:Props) {
  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
                <SheetTitle>Edit Product  - {Suppiler.name}</SheetTitle>
                <SheetDescription>
                    Make changes to Products here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormSuppliers
                    action={'/suppliers/' + Suppiler.id }
                    method="put"
                    supplier={Suppiler}
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
export default EditSuppliers;
