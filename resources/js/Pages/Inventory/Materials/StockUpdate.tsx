import { CheckCircle, Package, Barcode, Layers, Scale } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Product = {
  id: number
  sku: string
  name: string
  unit: string
  stock_quantity: number
  min_stock: number
  price: number
}

type Props = {
  message: string
  material: Product
}

function StockUpdate({ message, material }: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl shadow-lg border-green-200">
        <CardHeader className="flex flex-row items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div>
            <CardTitle className="text-green-700">Stock Update Successful</CardTitle>
            <CardDescription className="text-gray-600">{message}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Name:</span> {material.name}
            </div>

            <div className="flex items-center gap-2">
              <Barcode className="w-5 h-5 text-gray-500" />
              <span className="font-medium">SKU:</span> {material.sku}
            </div>

            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Stock:</span>{" "}
              <Badge
                variant={
                  material.stock_quantity <= material.min_stock
                    ? "destructive"
                    : "default"
                }
              >
                {material.stock_quantity}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Unit:</span> {material.unit}
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <span className="font-medium">Price:</span>{" "}
              <span className="text-green-700 font-semibold">${material.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StockUpdate
