import {  User } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Pen } from "lucide-react";
import FormAccounting from "./form-accounting";
import { route } from "ziggy-js";



function EditAccounting({accounting} : { accounting : User }) {


  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Edit Technicien - {accounting.name}</SheetTitle>
                <SheetDescription>
                    Make changes to accounting here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormAccounting
                    action={route('accounting.update' , { user: accounting.id })}
                    method="put"
                    accounting={accounting}
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
export default EditAccounting;
