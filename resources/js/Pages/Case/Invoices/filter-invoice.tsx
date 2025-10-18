
import {XCircle,CalendarIcon,Send,Recycle, CheckCheck,} from "lucide-react";
import {Tooltip,TooltipContent,TooltipTrigger,} from "@/components/ui/tooltip"
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import SearchInput from "@/components/search-inpute";
import SelectField from "@/components/select-field";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Doctor, FiltersQuery} from "@/Types";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SelectContent, SelectTrigger, SelectValue , SelectItem , Select } from "@/components/ui/select";


type Props = {
    filters : FiltersQuery,
    doctors : Doctor[]
}

const paymentStatusCase = [
  { id: "paid", name: "PAID", icon: CheckCheck },
  { id: "unpaid", name: "UNPAID", icon: XCircle },
]

export default function FilterInvoice({filters , doctors } : Props) {

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
            route : '/prosthesis-invoice',
    });


    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [status , setStatus] = useState<string | undefined>(filters.status);
    const [doctor , setDoctor] = useState<string | undefined>();

    const [amount, setAmount] = useState<{ min?: number | null; max?: number | null }>({
    min: null,
    max: null,
    });


    const submitFilter = ()=>{

        if((amount?.min && amount?.max) &&  amount?.min > amount?.max) return toast.error("min in grater then max")

        router.get('/prosthesis-invoice' , {
                    search : searchTerm || undefined,
                    status:status || undefined,
                    date_from : dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
                    date_to   : dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
                    amount_min : amount.min ?? undefined,
                    amount_max : amount.max ?? undefined,
        });

    }



    return (
        <div className="flex items-center gap-4 mb-5  ">


            <SearchInput
                placeholder="search by invoice/case number"
                handleChange={(e) => handleSearchChange(e.target.value)}
                searchTerm={searchTerm}
                defaultValue={filters.search || ""}
            />



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

            <SelectField
                    options={paymentStatusCase}
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
                modifiersClassNames={{today: "bg-blue-400 text-white rounded-lg"}}
                className="rounded-md border"
                />
                </PopoverContent>
            </Popover>
            </div>



            <div className="flex items-center gap-2 w-full">
                <Input
                type="number"
                name="amount_min"
                placeholder="Min"
                min={0}
                value={filters.amount_min || amount.min || ''}
                onChange={(e) =>
                    setAmount((prev) => ({
                    ...prev,
                    min: e.target.value ? Number(e.target.value) : null,
                    }))
                }
                />
                <span>—</span>
                <Input
                    type="number"
                    name="amount_max"
                    placeholder="Max"
                    min={0}
                    value={filters.amount_min || amount.max  || ''}
                    onChange={(e) =>
                        setAmount((prev) => ({
                        ...prev,
                        max: e.target.value ? Number(e.target.value) : null,
                        }))
                    }
                    />
            </div>




            <div className="flex justify-end gap-2 col-span-1 w-full">
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className="cursor-pointer"
                            variant="destructive"
                            onClick={() => router.get("/prosthesis-invoice")}
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
