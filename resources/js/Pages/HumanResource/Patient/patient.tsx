import {useCallback, useEffect, useState} from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import {Sheet, SheetClose,SheetContent,SheetDescription, SheetFooter,SheetHeader,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { Pen, Plus, Trash, User } from "lucide-react";
import { type BreadcrumbItem  , type Patient as PatientType , type Doctor as DoctorType, FalshProps} from "@/Types";

import debounce from 'lodash.debounce';


import { usePage } from "@inertiajs/react"
import {toast} from "sonner";
import CreatePatientForm from "./CreatePatientForm";
import AppLayout from "@/Layouts/AppLayout";

import { type PaginationLink} from "@/Types";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search-inpute";



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'patients Managment',
        href: '/patients',
    },

];



export default function patient({
    patients,
    filters,
    doctors
}: {
    patients: { data: PatientType[]; links: PaginationLink[] };
    filters: { search: string };
    doctors : {data : DoctorType[]}
}) {


    const { data, setData, put, processing, errors, reset } = useForm({
    name: "",
    phone: "",
    address: "",
    doctor_id: "",
    });



    const [editingPatient, setEditingPatient] = useState<PatientType | null>(null);
    const { flash }  =  usePage<FalshProps>().props ;

    const [searchTerm, setSearchTerm] = useState('');


    const performSearch = useCallback((query : string) => {
        // In a real application, you would make an API call here
        if (query.length >= 4 || query.length === 0) {
            router.get("/patients", { search: query }, { preserveState: true, replace: true })
        }
    }, []);

    const debouncedSearch = useCallback(
        debounce((query) => performSearch(query), 500), // 500ms delay
        [performSearch]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedSearch(value); // Call the debounced function
    };

    // Cleanup the debounced function on component unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel(); // Cancel any pending debounced calls
        };
    }, [debouncedSearch]);



    // For sonner Toast mesage Flash
    useEffect(()=>{
        if(flash.success){
            toast.success(flash.success)
        }

        if(flash.error){
            toast.error(flash.error)
        }
    } , [flash])


        const submit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(editingPatient)
        if(!editingPatient) return ;

        put(`/patients/${editingPatient.id}`, {
            preserveScroll: true,
            onSuccess: () => {
            // Show success toast
            toast.success("Patient updated successfully!");
            // Close sheet
            setEditingPatient(null);
            // Optional: reset form (good practice)
            reset();
            },
            onError: () => {
            toast.error("Failed to update patient.");
            },
        });
    };

    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription className="mt-2 text-sm xl:text-base ">
                    Her you can add , remove , update All patient that traite by
                    lab
                </CardDescription>
                <CardAction>
                    {/* Create Patient Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline' className="cursor-pointer" >
                                Create Patient <Plus  />
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 ">
                                    <User /> Create Patient
                                </DialogTitle>
                            </DialogHeader>

                            {/*------------------ Form Her--------- */}
                            <CreatePatientForm  doctors={doctors} onSuccess={()=> console.log("Sucess")} />
                        </DialogContent>
                    </Dialog>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">

                    {/* Header with search + create */}


                    {/* <SearchInput  value={searchTerm} onChange={handleChange} /> */}



                    {/* Table */}
                    <div className="overflow-x-auto">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.data.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.id}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient?.doctor?.name ?? "No doctor"}</TableCell>
                                    <TableCell>{patient.phone}</TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                    <TableCell className="text-right space-x-2">

                                        <Sheet>
                                            <SheetTrigger asChild>
                                                    <Button variant="outline" size="sm" onClick={()=> {
                                                                    setEditingPatient(patient);
                                                                    setData({
                                                                    name: patient.name,
                                                                    phone: patient.phone,
                                                                    address: patient.address,
                                                                    doctor_id: patient.doctor?.id?.toString() || "",
                                                                    });
                                                    }}>
                                                        <Pen />
                                                    </Button>
                                            </SheetTrigger>
                                            <SheetContent  className="w-[400px] sm:w-[540px]">
                                                <SheetHeader>
                                                    <SheetTitle>Edit Patien</SheetTitle>
                                                    <SheetDescription>
                                                        Make changes to Patien here. Click save when you&apos;re done.
                                                    </SheetDescription>
                                                </SheetHeader>

                                                <form onSubmit={submit}>

                                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                                        <div className="grid gap-3">
                                                            <Label htmlFor="name">Name</Label>
                                                            <Input id="name" defaultValue={patient.name}
                                                                required
                                                                onChange={ e => setData("name" , e.target.value) }
                                                            />
                                                             {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                                        </div>


                                                        <div className="grid gap-3">
                                                                <Label htmlFor="address">Address</Label>
                                                                <Input id="address" defaultValue={patient.address}
                                                                    onChange={ e => setData("address" , e.target.value) } />
                                                        </div>

                                                        <div className="grid gap-3">
                                                                <Label htmlFor="phone">PhoneNumber</Label>
                                                                <Input id="phone" defaultValue={patient.phone}
                                                                        onChange={ e => setData("phone" , e.target.value) } />
                                                        </div>



                                                        <div className="grid gap-3">
                                                                <Label htmlFor="doctor">Doctor</Label>
                                                                <Select
                                                                    value={patient.doctor.id?.toString() ?? ""}
                                                                    onValueChange={(value) => setData("doctor_id", value)}
                                                                >
                                                                    <SelectTrigger className="flex-1 w-full">
                                                                        <SelectValue placeholder="Select Doctor" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {doctors.data.map((doctor) => (
                                                                            <SelectItem value={doctor.id.toString()} key={doctor.id}>
                                                                                {doctor.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            </div>

                                                <SheetFooter>
                                                    <SheetClose asChild>
                                                        <Button variant="outline">Close</Button>
                                                    </SheetClose>
                                                    <Button type="submit"  disabled={processing}>
                                                        {processing ? "Saving..." : "Save Changes"}
                                                    </Button>
                                                </SheetFooter>
                                                </form>


                                            </SheetContent>
                                        </Sheet>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                if (confirm("Are you sure?")) {
                                                    router.delete(
                                                        `/patients/${patient.id}`
                                                    );
                                                }
                                            }}
                                        >
                                            <Trash />
                                        </Button>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Pagination  links={patients.links}/>
            </CardFooter>
        </Card>
        </AppLayout>
    );
}
