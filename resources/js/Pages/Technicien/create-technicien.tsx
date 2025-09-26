
import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"


import { PlusCircle } from "lucide-react"
import FormTechnicien from "./form-technicien";


function CreateTechnicien() {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Technicien <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>Add New Technicien</SheetTitle>
            <SheetDescription>
                Fill in the Technicien’s details and save.
            </SheetDescription>
        </SheetHeader>

        <FormTechnicien
            action="/techniciens"
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
export default CreateTechnicien;
