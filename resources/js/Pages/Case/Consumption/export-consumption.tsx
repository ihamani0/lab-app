import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, File, LucideSheet, Sheet } from "lucide-react"
import { useForm } from "@inertiajs/react"
import SelectField from "@/components/select-field"
import { FiltersQuery } from "@/Types"




const ExportDefault = [
    {id : 'pdf' , name : "Pdf" , icon : File},
    {id : 'xlsx' , name : "xlsx" , icon : LucideSheet},
]

function ExportConsumption({filter} : {filter : FiltersQuery}) {

        const [format, setFormat] = useState<string>("")

        const handleExport = () => {
            if (!format) {
                alert("Please select an export format first.")
                return
            }

            const params = new URLSearchParams();
            if (filter.date_from) params.append('start_date', filter.date_from);
            if (filter.date_to) params.append('end_date', filter.date_to);
            if (filter.search) params.append('q', filter.search);


            // ✅ Add format to query
            params.append('format', format);

            // Trigger file download
            window.location.href = `/prosthesis-consumption/export/?${params.toString()}`
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
export default ExportConsumption;
