import { Category } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Form, useForm } from "@inertiajs/react";
import { Pen } from "lucide-react";
import FormCategory from "./form-category";


function EditCategory({category}:{ category : Category }) {
  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Edit Category - {category.name}</SheetTitle>
                <SheetDescription>
                    Make changes to category here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormCategory
                    action={'/categories/' + category.id }
                    method="put"
                    category={category}
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
export default EditCategory
