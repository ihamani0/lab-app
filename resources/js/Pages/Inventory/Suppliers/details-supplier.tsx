import { Suppiler } from "@/Types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Earth, Eye, Facebook, Instagram, PhoneCall } from "lucide-react";

export default function DetailsSupplier({supplier} : {supplier : Suppiler}) {
  return (
    <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="sm"
                    className="cursor-pointer">
                        <Eye />
                </Button>
            </DialogTrigger>
            <DialogContent >
                 <DialogHeader>
                    <DialogTitle>Details supplier</DialogTitle>
                 </DialogHeader>
                 <div className="flex flex-col gap-y-2">

                    <div className="flex items-center gap-x-3">
                        <img
                            src={supplier.logoUrl || '/assets/placeholder.png'}
                            alt="supplier"
                            className="h-16 w-16 object-cover rounded"
                        />
                        <Separator className="w-full" orientation="vertical" />
                        <div className="flex flex-col gap-y-1 text-sm">
                            <h1>{supplier.name}</h1>
                            <p>{supplier.email}</p>
                            <p>{supplier.phone}</p>
                        </div>
                        <Separator className="w-full" orientation="vertical" />
                        <div className="text-xs flex flex-col space-y-1.5">
                            <div className="flex justify-start items-center gap-x-2">
                                <Facebook size={14}  />
                                <a href={supplier.facebook} target="_blank" rel="noreferrer ">
                                    facebook
                                </a>
                            </div>

                            <div className="flex justify-start items-center gap-x-2">
                                <Instagram size={14}  />
                                <a href={supplier.instagram} target="_blank" rel="noreferrer ">
                                    facebook
                                </a>
                            </div>

                            <div className="flex justify-start items-center gap-x-2">
                                <PhoneCall size={14}  />
                                <a href={supplier.whatsapp} target="_blank" rel="noreferrer ">
                                    Whatsapp
                                </a>
                            </div>

                            <div className="flex justify-start items-center gap-x-2">
                                <Earth size={14}  />
                                <a href={supplier.website} target="_blank" rel="noreferrer ">
                                    Website
                                </a>
                            </div>
                        </div>
                    </div>



                    <div className="mt-4">
                        <p className="text-sm ">{supplier.description}</p>
                    </div>



                 </div>
                {/* <img
                src={fullImageUrl || '/assets/placeholder.png'}
                alt="Product Full"
                className="max-h-[80vh] rounded"
                /> */}
            </DialogContent>
    </Dialog>
  )
}
