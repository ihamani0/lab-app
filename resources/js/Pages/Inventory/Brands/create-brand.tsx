

import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"

import { PlusCircle } from "lucide-react"
import FormBrand from "./form-brand"
import { Category } from "@/Types"


function CreateBrand({categories} : { categories : Category[] }) {

    return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Brand <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>Add New Brand</SheetTitle>
            <SheetDescription>
                Fill in the Brands details and save.
            </SheetDescription>
        </SheetHeader>

        <FormBrand
            action="/brands"
            method="post"
            categoroies={categories}
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
export default CreateBrand
