import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



export function getBadgeVariantForPurchase(status : string)  {
    switch (status) {
    case 'unpaid':
      return 'destructive';

    case 'Partial':
      return 'outline';

    case 'paid':
      return 'success';

    case 'purchase_in' :
        return 'success';

    case 'adjustment' :
        return 'warning';

    case 'consumption_out' :
        return 'destructive';


    default:
      return 'secondary'; // fallback for unknown statuses
  }
}
