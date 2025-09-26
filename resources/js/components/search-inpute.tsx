import { Separator } from "@radix-ui/react-separator"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

type Props = {
    defaultValue : string ,
    handleChange : (e : React.ChangeEvent<HTMLInputElement>) => void
    searchTerm : string
}


function SearchInput({searchTerm , handleChange , defaultValue} : Props) {
  return (
        <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <Input
            defaultValue={defaultValue}
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            aria-label="Search patients"
            className="w-full sm:w-64 md:w-80 py-5 pl-10 pr-4" // ← pl-10 = left padding for icon
        />
        </div>
  )
}
export default SearchInput
