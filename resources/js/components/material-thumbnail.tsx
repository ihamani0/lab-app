

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props ={
    thumbnailUrl ?: string | null,
    fullImageUrl : string | null ,
}

function MaterialThumbnail({thumbnailUrl , fullImageUrl} : Props) {
    console.log(fullImageUrl);
   return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={fullImageUrl || '/assets/placeholder.png'}
          alt="Product"
          className="h-8 w-8 object-cover rounded cursor-pointer hover:opacity-80"
        />
      </DialogTrigger>
      <DialogContent className="flex justify-center">
        <img
          src={fullImageUrl || '/assets/placeholder.png'}
          alt="Product Full"
          className="max-h-[80vh] rounded"
        />
      </DialogContent>
    </Dialog>
  )
}
export default MaterialThumbnail;
