import { Product } from "@/Types"
import { useForm } from "@inertiajs/react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"





function ConfirmDecrement({ material }: {material : Product}) {

    const form = useForm({})

    const handleConfirm = () => {
        form.post(`/materials/${material.id}/decrement`)
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Confirm Stock Update</CardTitle>
          <CardDescription className="text-center">
            Please confirm the stock update for this material.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="mt-4 text-center">
          <p className="mb-2 text-gray-700">
            Do you want to decrement stock for:
          </p>
          <p className="text-lg font-semibold text-blue-600">{material.name}</p>
          <p className="text-sm text-gray-600">
            Current stock:{" "}
            <span className="font-medium">
              {material.stock_quantity} {material.unit}
            </span>
          </p>

          <div className="flex gap-4 justify-center mt-6">
            <Button
              onClick={handleConfirm}
              disabled={form.processing}
              className="bg-green-600 hover:bg-green-700"
            >
              {form.processing ? "Updating..." : "Confirm"}
            </Button>

            <Button variant="outline" asChild>
              <a href="/">Cancel</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default ConfirmDecrement
