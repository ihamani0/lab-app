
import Chart , { Props as ApexChartProps } from 'react-apexcharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';



type Props = {
    title : string ,
    value : number ,
    data : number[] ,
    color ?: string
    Icon?: LucideIcon
}

export default function MetricCard({ title, value, data, color = '#cbd5e1' , Icon } : Props) {

    const options: ApexChartProps['options'] = {

        chart: {
        type: 'area',
        sparkline: { enabled: true },
        toolbar: { show: false },
        animations: { enabled: true },
        },

        stroke: {
        curve: 'smooth',
        width: 2,
        },

        fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0.4,
            opacityFrom: 0.5,
            opacityTo: 0.1,
        },
        },

        colors: [color],

        tooltip: {
        enabled: true,
        x: { show: false },
        y: {
            formatter: (val) => val.toLocaleString(),
        },
        },


        xaxis: {
        type: 'datetime',
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        },

        yaxis: {
        show: false,
        min: 0,
        },

        grid: { show: false },
  }

  const series = [{ name: title, data }]

    return (

    <Card>
        <CardHeader className='flex items-center gap-x-3'>
            {Icon && <Icon size={35} />}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-semibold">{new Intl.NumberFormat().format(value)}</div>
            <div className='mt-2'>
                <Chart  options={options}
                    series={series}
                    type="area"
                    height={80}
                />
            </div>

        </CardContent>
    </Card>
  )
}
