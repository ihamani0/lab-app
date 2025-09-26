import {  User } from "@/Types"
import { Button } from "@/components/ui/button";
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Pen } from "lucide-react";
import FormTechnicien from "./form-technicien";


function EditTechnicien({technicien} : { technicien : User }) {


  return (
    <Sheet>
        <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
        </SheetTrigger>
        <SheetContent  className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Edit Technicien - {technicien.name}</SheetTitle>
                <SheetDescription>
                    Make changes to Technicien here. Click save when you&apos;re done.
                </SheetDescription>
            </SheetHeader>


                {/* Set FormDoctor Her for update */}
                <FormTechnicien
                    action={'/techniciens/' + technicien.id }
                    method="put"
                    technicien={technicien}
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
export default EditTechnicien;
