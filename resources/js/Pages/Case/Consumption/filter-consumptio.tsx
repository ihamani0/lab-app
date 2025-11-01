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
    filters : FiltersQuery
}



export default function FilterConsumption({filters} : Props) {


    const { searchTerm , handleSearchChange } = useDebouncedSearch({
            route : '/prosthesis-consumption',
    })

    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const submitFilter = ()=>{
        router.get('/prosthesis-consumption' , {
                search : searchTerm ,
                date_from : dateRange?.from?.toISOString() ,
                date_to : dateRange?.to?.toISOString() ,
        });
    }

  return (
        <div className="flex items-center gap-4 mb-5  ">

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
                placeholder="search by name or sku"
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
                            onClick={() => router.get("/prosthesis-consumption")}
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
