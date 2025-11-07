import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CalendarIcon, Recycle, Send } from "lucide-react";
import { router } from "@inertiajs/react";


export default function FilterDate({url} : {url : string}) {

    const [dateRange, setDateRange] = useState<DateRange | undefined>();

   const submitFilter = ()=>{
        router.get(url , {
                date_from : dateRange?.from?.toISOString() ,
                date_to : dateRange?.to?.toISOString() ,
        });
    }

  return (
    <div className="flex items-center gap-x-4">
    <Label>Filter by Date</Label>
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

            <div className="flex gap-1 items-center">
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => router.get("/report/financial")}
                        >
                        <Recycle/>
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
