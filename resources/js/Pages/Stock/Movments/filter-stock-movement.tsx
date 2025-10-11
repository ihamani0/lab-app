
import {
  XCircle,
  CheckCircle2,
  Clock,
  FileText,

  CircleCheckBig,
  AlertCircle,
  CalendarIcon,
  Send,
  Recycle,
  ArrowBigRightDash,
  ArrowBigLeftDash,
  ArrowLeftRight,
} from "lucide-react";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import SearchInput from "@/components/search-inpute";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FiltersQuery } from "@/Types";
import SelectField from "@/components/select-field";
import ReuseToolTipe from "@/components/reuse-tooltipe";


type Props = {
    filters : FiltersQuery
}



const typeStockMovement = [
  { id: "purchase_in", name: "Purchase In", icon: ArrowBigRightDash },         // waiting
  { id: "consumption_out", name: "Consumption Out", icon: ArrowBigLeftDash },      // success
  { id: "adjustment", name: "Adjustment", icon: ArrowLeftRight }, // warning / partially done
];


export default function FilterStockMovement({filters}:Props) {
    const { searchTerm , handleSearchChange } = useDebouncedSearch({
                route : '/movement-stock',
        });


    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [type , setType] = useState<string>("");


    const submitFilter = () => {
        router.get('/movement-stock' , {
                search : searchTerm ,
                type : type ,
                date_from : dateRange?.from?.toISOString() ,
                date_to : dateRange?.to?.toISOString() ,
                });
    }

  return (
    <div className="flex items-center gap-2  mb-5 ">

        <div className=" w-full">
        <Popover>
        {/* I avoid asChild here to avoid ref-forwarding issues */}
            <PopoverTrigger >
                <Button
                    type="button"
                    variant="outline"
                    data-empty={!dateRange}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
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
                        "Pick a date range"
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

        <SelectField
            options={typeStockMovement}
            onValueChange={(value) =>setType(value)}
            value={filters.type || type || ""}
            placeholder="Serach by"
        />

        <SearchInput
            placeholder="Search by Sku ...  , Ref ..."
            handleChange={(e) => handleSearchChange(e.target.value)}
            searchTerm={searchTerm}
            defaultValue={filters.search || ""}
            />

        <div className="flex gap-1 items-center">
            <ReuseToolTipe title="Reset Filter">
                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => router.get("/stock-movement")}
                        >
                        <Recycle />
                    </Button>
            </ReuseToolTipe>
            <ReuseToolTipe title="Submit Filter">
                    <Button
                        className="cursor-pointer"
                        variant="secondary"
                        onClick={submitFilter}
                    >
                        <Send />
                    </Button>
            </ReuseToolTipe>
        </div>

    </div>


  )
}
