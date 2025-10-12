import {XCircle,Clock,FileText,CircleCheckBig,AlertCircle,CalendarIcon,Send,Recycle, Truck, Timer, CheckCheck, PauseCircle,
} from "lucide-react";
import {Tooltip,TooltipContent,TooltipTrigger,} from "@/components/ui/tooltip"
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import SearchInput from "@/components/search-inpute";
import SelectField from "@/components/select-field";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Doctor, FiltersQuery, Patient, User as techniciansType } from "@/Types";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";


type Props = {
    doctors : Doctor[];
    technicians : techniciansType[];
    filters : FiltersQuery
}


const statusCase = [
  { id: "pending", name: "Pending", icon: Clock },
  { id: "completed", name: "Completed", icon: CheckCheck },
  { id: "delivered", name: "Delivered", icon: Truck },
  { id: "in_progress", name: "In Progress", icon: Timer },
  { id: "canceled", name: "Cancelled", icon: XCircle },
  { id: "on_hold", name: "On Hold", icon: PauseCircle },
]


export default function FilterCase({doctors , technicians , filters} : Props) {


    const { searchTerm , handleSearchChange } = useDebouncedSearch({
            route : '/prosthesis-case',
    })

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [doctor , setDoctor] = useState<string | undefined>();
    const [technician , setTechnician] = useState<string | undefined>();
    const [status , setStatus] = useState<string | undefined>();

    const submitFilter = ()=>{
        router.get('/prosthesis-case' , {
                search : searchTerm ,
                doctor : doctor ,
                technician : technician ,
                status:status,
                date_from : dateRange?.from?.toISOString() ,
                date_to : dateRange?.to?.toISOString() ,
        });
    }

  return (
        <div className="flex items-center gap-4 mb-5  ">

            <div >
                <Select value={filters.doctor_id || doctor || ""}
                onValueChange={(val)=>setDoctor(val)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        {doctors.map((d) => (
                        <SelectItem key={d.id}  value={d.id.toString()}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select value={filters.technician_id || technician || ""}
                onValueChange={(val)=>setTechnician(val)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Technician" />
                    </SelectTrigger>
                    <SelectContent>
                        {technicians.map((t) => (
                        <SelectItem key={t.id}  value={t.id.toString()}>{t.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <SelectField
                options={statusCase}
                onValueChange={(value) =>setStatus(value)}
                value={filters.status || status || ""}
                placeholder="Sort by"
                className="max-w-[140px]"
            />

            {/* Filter with Day */}
            <div className=" w-full">
                <Popover>
                {/* I avoid asChild here to avoid ref-forwarding issues */}
                <PopoverTrigger >
                <Button
                 type="button"
                    variant="outline"
                    data-empty={!dateRange}
                    className="data-[empty=true]:text-muted-foreground w-[250px] justify-start text-left font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                        {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                            {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d , yyyy")}
                            </>
                        ) : (
                            format(dateRange.from, "MMM d, yyyy")
                        )
                        ) : (
                        "Pick a date Recived Date"
                        )}
                    </span>
                </Button>
                </PopoverTrigger>

                <PopoverContent
                className="w-auto p-0 z-50 "
                align="start"
                sideOffset={8}
                >
                <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range)} // range can be undefined
                modifiers={{ today: new Date() }}
                modifiersClassNames={{today: "bg-blue-500 text-white rounded-lg"}}
                className="rounded-md border"
                />
                </PopoverContent>
            </Popover>
            </div>



            <SearchInput
                placeholder="search by invoice number"
                handleChange={(e) => handleSearchChange(e.target.value)}
                searchTerm={searchTerm}
                defaultValue={filters.search || ""}
            />


            <div className="flex justify-end gap-2 col-span-1 w-full">
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className="cursor-pointer"
                            variant="destructive"
                            onClick={() => router.get("/prosthesis-case")}
                            >
                            <Recycle />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Reset Filter</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className="cursor-pointer"
                            variant="secondary"
                            onClick={submitFilter}
                        >
                            <Send />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Submit Filter</p>
                    </TooltipContent>
                </Tooltip>
            </div>

        </div>
  )
}
