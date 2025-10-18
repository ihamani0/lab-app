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

//"pending" |"delivered" |"in_progress" | "completed" | "on_hold" | "cancelled"
export function getBadgeVariantForCases(status : string)  {
    switch (status) {

    case 'cancelled':
      return 'destructive';

    case 'on_hold':
      return 'secondary';

    case 'completed':
      return 'success';

    case 'delivered' :
        return 'success';

    case 'pending' :
        return 'warning';

    case 'in_progress' :
        return 'thirdy';


    default:
      return 'secondary'; // fallback for unknown statuses
  }
}


/**
 * Convert a Date object to "YYYY-MM-DD" format
 * Example: 2025-10-14
 */

export function formatDateToYMD(date: Date | string | null | undefined) {

    if (!date) return "";

    const d = typeof date === "string" ? new Date(date) : date;

    return d.toISOString().split("T")[0];
}
