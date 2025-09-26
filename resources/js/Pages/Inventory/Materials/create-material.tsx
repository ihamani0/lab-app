

import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"

import { PlusCircle } from "lucide-react"

import { Category } from "@/Types"
import FormMaterial from "./form-material"

type Props = {
    categories : Category[];
}


function CreateMaterial({ categories} : Props) {

    return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Prodcut <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[1400px]">
            <SheetHeader>
            <SheetTitle>Add New Prodcut</SheetTitle>
            <SheetDescription>
                Fill in the Prodcut details and save.
            </SheetDescription>
        </SheetHeader>

        <FormMaterial
            action="/materials"
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
export default CreateMaterial;
