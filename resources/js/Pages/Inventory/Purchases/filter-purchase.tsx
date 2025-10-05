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
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { router } from "@inertiajs/react";

import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import SearchInput from "@/components/search-inpute";
import SelectField from "@/components/select-field";
import { Button } from "@/components/ui/button";
import { FiltersQuery, Purchase as PurchaseType, Suppiler as SuppilerType } from "@/Types";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";


type Props = {
    purchase ?:   PurchaseType[]
    suppliers : SuppilerType[]
    filters : FiltersQuery
}

const statusPurchas = [
  { id: "unpaid", name: "Unpaid", icon: Clock },         // waiting
  { id: "paid", name: "Paid", icon: CheckCircle2 },      // success
  { id: "partial", name: "Partial", icon: AlertCircle }, // warning / partially done
  { id: "darft", name: "Darft", icon: FileText },        // draft document
  { id: "cancelled", name: "Cancelled", icon: XCircle }, // red cancel
  { id: "confirmed", name: "confirmed", icon: CircleCheckBig }, // big green check
  { id: "received", name: "received", icon: CircleCheckBig }, // big green check
];


export default function FilterPurchase({suppliers , filters} : Props) {

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
            route : '/purchases',
    })

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [supplier , setSupplier] = useState<string | undefined>();
    const [status , setStatus] = useState<string | undefined>();



    const submitFilter = ()=>{
        router.get('/purchases' , {
                search : searchTerm ,
                supplier : supplier ,
                status:status,
                date_from : dateRange?.from?.toISOString() ,
                date_to : dateRange?.to?.toISOString() ,
        });
    }



  return (
        <div className="flex items-center gap-2  mb-5 ">
        <div >
            <Select value={filters.supplier_id || supplier || ""}
            onValueChange={(val)=>setSupplier(val)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                    {suppliers.map((sup) => (
                    <SelectItem key={sup.id}  value={sup.id.toString()}>{sup.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>


        <SelectField
            options={statusPurchas}
            onValueChange={(value) =>setStatus(value)}
            value={filters.status || status || ""}
            placeholder="Sort by"
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



        <SearchInput
            placeholder="search by invoice number"
            handleChange={(e) => handleSearchChange(e.target.value)}
            searchTerm={searchTerm}
            defaultValue={filters.search || ""}
        />





        <div className="flex gap-1 items-center">
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => router.get("/purchases")}
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
