import { Brands, Category } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Form, useForm } from "@inertiajs/react";
import { Pen } from "lucide-react";
import FormBrand from "./form-brand";

type Props = {
    brand : Brands ,
    categories : Category[]
}


function EditBrand({brand , categories}:Props) {
  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Edit Brand - {brand.name}</SheetTitle>
                <SheetDescription>
                    Make changes to brand here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormBrand
                    categoroies={categories}
                    action={'/brands/' + brand.id }
                    method="put"
                    brand={brand}
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
export default EditBrand
