import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react"

type Props = {
    url : string ;
    defaultPerPage ?:string;
}




function PerPage({url , defaultPerPage = '15'} : Props  ) {



    const handleSubmitPage = (value : string )=>{
        router.get(url,
            { per_page: value },
            { preserveScroll: true, preserveState: true }
        );
    }



  return (
    <Select value={defaultPerPage} onValueChange={handleSubmitPage} >
    <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="page" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="15">15</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="50">50</SelectItem>
    </SelectContent>
    </Select>
  )
}
export default PerPage
