import { Brands, Category, Product } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"

import { Pen } from "lucide-react";
import FormMaterial from "./form-material";


type Props = {
    Product : Product ,
    categories : Category[]
}


function EditMaterials({Product , categories}:Props) {
  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
                <SheetTitle>Edit Product  - {Product.name}</SheetTitle>
                <SheetDescription>
                    Make changes to Products here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormMaterial
                    categoroies={categories}
                    action={'/materials/' + Product.id }
                    method="put"
                    product={Product}
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
export default EditMaterials;
