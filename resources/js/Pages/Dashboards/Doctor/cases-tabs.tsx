import { Doctor, Patient, User } from '@/Types';
import CreateCaseDoctor from './create-case';
import DataCaseDoctor from './data-cases';
import { Card, CardContent } from '@/components/ui/card';


type props ={
    patients: Patient[];
    doctor : Doctor
}
export default function CasesTabe({ patients = [] , doctor }: props ) {

console.log(doctor.cases);


return (
<div className="flex flex-col space-y-4 ">
    <h2 className="text-xl font-semibold">Patient Cases</h2>

    <div className='self-end'>
        <CreateCaseDoctor doctor={doctor} patients={patients}  />

    </div>

    <DataCaseDoctor cases={doctor.cases ?? []} />
{/*
    <Card>
        <CardContent className='flex flex-col '>

        </CardContent>
    </Card> */}


</div>
  )
}






