
import { Button } from "@/components/ui/button"

import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"


import { PlusCircle } from "lucide-react"
import FormAccounting from "./form-accounting"
import { route } from "ziggy-js"



export default function CreateAccounting() {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='outline' className="cursor-pointer">
                Create Accounting <PlusCircle />
                </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>Add New Accounting</SheetTitle>
            <SheetDescription>
                Fill in the Accounting’s details and save.
            </SheetDescription>
        </SheetHeader>

        <FormAccounting
            action={route('accounting.store')}
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

