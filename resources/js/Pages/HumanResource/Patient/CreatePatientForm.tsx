
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {type Patient as PatientType  , type Doctor as DoctorType} from "@/Types";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"

type Props = {
    doctors : {data : DoctorType[]} ,
    onSuccess : () => void
}


function CreatePatientForm({doctors  , onSuccess} : Props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        address: "",
        doctor_id: ""
    });


    const submit =  (e: React.FormEvent) => {
        e.preventDefault();

        post("/patients", {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };


  return (
    <form onSubmit={submit} className="space-y-8 ">
        <div className="space-y-3">
            <Label htmlFor="name">Name *</Label>
            <Input
                placeholder="Name"
                value={data.name}
                onChange={(e) => {
                    setData("name", e.target.value);
                }}
                className="w-full sm:w-64 md:w-80"
            />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.name}
                    </p>
                )}
        </div>
        <div className="space-y-3">
            <Label htmlFor="name">Phone number</Label>

            <Input
                type="text"
                placeholder="Phone number"
                value={data.phone}
                onChange={(e) =>
                    setData("phone", e.target.value)
                }
                className="w-full sm:w-64 md:w-80"
            />
            {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                    {errors.phone}
                </p>
            )}
        </div>
        <div className="space-y-3">
            <Label htmlFor="name">Address</Label>
            <Input
                type="text"
                placeholder="Address"
                value={data.address}
                onChange={(e) =>
                    setData("address", e.target.value)
                }
                className="w-full sm:w-64 md:w-80"
            />
            {errors.address && (
                <p className="text-xs text-red-500 mt-1">
                    {errors.address}
                </p>
            )}
        </div>


        {/* ---------------------POPOver --------------------*/}


        <Select
            value={data.doctor_id?.toString() ?? ""}
            onValueChange={(value) => setData("doctor_id", value)}
            >
            <SelectTrigger className="w-full sm:w-64 md:w-80">
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
        {/* ---------------------POPOver --------------------*/}

        <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={processing}>
                Save
            </Button>
        </div>
    </form>
  )
}
export default CreatePatientForm
