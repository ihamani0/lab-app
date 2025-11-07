
import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"

import FormDoctor from "./form-doctor"
import { PlusCircle } from "lucide-react"


function CreateDoctor() {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Doctor <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>Add New Doctor</SheetTitle>
            <SheetDescription>
                Fill in the doctor’s details and save.
            </SheetDescription>
        </SheetHeader>

        <FormDoctor
            action="/doctors"
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
export default CreateDoctor
