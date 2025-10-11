import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { PlusCircle } from "lucide-react"
import FormCase from "./form-case"
import {  Doctor, Patient, User } from "@/Types"


type Props = {
    doctors : Doctor[];
    technicians : User[];
    patients : Patient[];
}

export default function CreateCase({doctors , technicians , patients}:Props) {
  return (
        <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Case <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>Add New Case</SheetTitle>
            <SheetDescription>
                Fill in the case details and save.
            </SheetDescription>
        </SheetHeader>

            <FormCase
                 doctors={doctors}
                 technicians={technicians}
                 patients={patients}
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
