import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, LucideSheet, Sheet } from "lucide-react"
import SelectField from "./select-field"
import { useForm } from "@inertiajs/react"




const ExportDefault = [
    {id : 'csv' , name : "CSV" , icon : Sheet},
    {id : 'xlsx' , name : "xlsx" , icon : LucideSheet},
]

function ExportData() {
        const form = useForm({});
        const [format, setFormat] = useState<string>("")

        const handleExport = () => {
        if (!format) {
            alert("Please select an export format first.")
            return
            }
            // Trigger file download
            window.location.href = `/materials/export?format=${format}`
        }

  return (
     <div className="flex items-center gap-3 justify-end w-full">
        {/* Select Format */}
        <SelectField
                options={ExportDefault}
                value={format}
                onValueChange={setFormat}
                placeholder="Select format"

        />
      {/* Export Button */}
      <Button onClick={handleExport} disabled={!format}>
        <Download className="w-4 h-4 mr-2" />
        Export {format ? format.toUpperCase() : ""}
      </Button>
    </div>
  )
}
export default ExportData
