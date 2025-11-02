
import Chart from 'react-apexcharts'
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChartColumn, Donut } from 'lucide-react';
type DonutChartProps = {
  title: string
  labels: string[]
  series: number[]
  colors?: string[]
}


export default function DonutChart(
    {
  title,
  labels,
  series,
  colors = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6'],
}: DonutChartProps
) {

    const options: ApexCharts.ApexOptions = {
        chart: {
        type: 'donut',
        width: '100%',
        height: 380,
        },
        labels,
        colors,
        dataLabels: { enabled: false },
        plotOptions: {
        pie: {
            customScale: 0.9,
            donut: { size: '70%' },
        },
        },
        legend: {
        position: 'right',
        offsetY: 0,
        markers: { radius: 12 },
        },
        tooltip: {
        y: { formatter: (val) => `${val} cases` },
        },
  }


  return (
        <Card>
        <CardHeader className='flex items-center gap-x-3'>
             <ChartColumn size={35} />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </CardHeader>
        <CardContent>
                <Chart  options={options} series={series} type="donut" height={360} />
        </CardContent>
    </Card>
  )
}
