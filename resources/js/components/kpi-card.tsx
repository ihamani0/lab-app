import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp } from 'lucide-react';


type Props = {
    title : string ;
    value : number;
    Icon?: LucideIcon
}
function KpiCard({ title, value , Icon } : Props) {
  return (
    <Card>
        <CardHeader className='flex items-center gap-x-3'>
            {Icon && <Icon size={35} />}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-semibold">{new Intl.NumberFormat().format(value)}</div>
        </CardContent>
    </Card>
  )
}
export default KpiCard
