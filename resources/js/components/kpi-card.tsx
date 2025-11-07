import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp } from 'lucide-react';


type Props = {
    title : string ;
    value : number;
    Icon?: LucideIcon;
     variant?: 'success' | 'danger' | 'info' | 'warning';
}

const colorMap = {
  success: {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/30",
    border: "border-l-4 border-green-500",
  },
  danger: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/30",
    border: "border-l-4 border-red-500",
  },
  info: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/30",
    border: "border-l-4 border-blue-500",
  },
  warning: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/30",
    border: "border-l-4 border-yellow-500",
  },
};


function KpiCard({ title, value , Icon , variant = 'info' } : Props) {
     const colors = colorMap[variant];


  return (
    <Card
      className={`p-3 transition-colors ${colors.bg} ${colors.border} hover:shadow-md`}
    >
      <CardHeader className="flex items-center gap-x-3 p-0 mb-2">
        {Icon && (
          <Icon
            className={`${colors.text} bg-transparent rounded p-1`}
            size={28}
          />
        )}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`text-2xl font-semibold ${colors.text}`}>
          {new Intl.NumberFormat().format(value)}
        </div>
      </CardContent>
    </Card>
  )
}
export default KpiCard
