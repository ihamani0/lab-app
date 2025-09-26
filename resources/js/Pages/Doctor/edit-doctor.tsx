import { Doctor } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Form, useForm } from "@inertiajs/react";
import { Pen } from "lucide-react";
import FormDoctor from "./form-doctor";


function EditDoctor({doctor} : { doctor : Doctor }) {




  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Edit Doctor - {doctor.name}</SheetTitle>
                <SheetDescription>
                    Make changes to Doctor here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormDoctor
                    action={'/doctors/' + doctor.id }
                    method="put"
                    doctor={doctor}
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
export default EditDoctor
