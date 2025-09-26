import SearchInput from "@/components/search-inpute";
import SelectField from "@/components/select-field";
import { Button } from "@/components/ui/button";
import { useDebouncedSearch } from "@/hooks/use-debouncedSearch";
import { FiltersQuery, type Category as CategoryType} from "@/Types"
import { router } from "@inertiajs/react";
import { ArrowDown, ArrowDown10, ArrowUp, ArrowUp10, Clock, Currency, Disc, Droplet, Package, Scale } from "lucide-react";

type Props = {
    categories :   CategoryType[]
    filters : FiltersQuery
}

const sortby = [
    { id: "stock_desc", name: "Stock Quantity Desc", icon: ArrowDown10 },
    { id: "stock_asc", name: "Stock Quantity Asc", icon: ArrowUp10 },
    { id: "latest", name: "Latest Added", icon: Clock },
    {id : 'oldest' , name : "Oldest Added" , icon : Clock},
    {id : 'price_desc' , name : "Price Desc" , icon : ArrowUp},
    {id : 'price_asc'  , name : "Price Asc" , icon : ArrowDown},
]
const unitBy = [
    { id: "disk", name: "Disk"  , icon : Disc},
    { id: "gram", name: "Gram" , icon : Scale },
    { id: "ml", name: "ml" , icon : Droplet },
    { id: "piece", name: "piece" , icon : Package},
]

function FilterMaterial({categories , filters} : Props) {

    const { searchTerm , handleSearchChange } = useDebouncedSearch({
            route : '/materials',
    })





  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
        <SearchInput
            handleChange={(e) => handleSearchChange(e.target.value)}
            searchTerm={searchTerm}
            defaultValue={filters.search || ""}
        />

        <SelectField
            options={categories}
            onValueChange={(value)=>{
                router.get("/materials", {
                        search: searchTerm,
                        category_id: value === "all" ? undefined : value, // Handle 'all' case if you use it
                        })
            }}
            value={filters.category_id || ""}
            placeholder="Category"
            groupLabel="Category"
            />

            <SelectField
                options={sortby}
                onValueChange={(value) =>
                    router.get("/materials", {
                    search: searchTerm,
                    sort_by: value,
                    })
                }
                value={filters.sort_by || ""}
                placeholder="Sort by"
            />


            <SelectField
                options={unitBy}
                value={filters.unit || ""}
                onValueChange={(value) => {
                    router.get("/materials", { ...filters, unit: value })
                }}
                placeholder="Filter by unit"
                />


            <Button
                variant="outline"
                onClick={() => router.get("/materials")}
                >
                Reset
            </Button>


    </div>
  )
}
export default FilterMaterial;
