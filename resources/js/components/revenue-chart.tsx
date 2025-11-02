
import { ChartArea } from 'lucide-react';
import Chart, { Props as ApexChartProps } from 'react-apexcharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// Define prop types
interface RevenueChartProps {
  labels: string[];
  income: number[];
  expenses: number[];
}


function RevenueChart({ labels, income, expenses }: RevenueChartProps) {
  const options: ApexChartProps['options'] = {
    chart: {
      id: 'revenue-expense',
      toolbar: { show: false }
    },
    xaxis: {
      categories: labels
    },
    legend: {
      position: 'top' as const
    },
    stroke: {
      curve: 'smooth' as const
    },
  };

  const series: ApexChartProps['series'] = [
    { name: 'Income', data: income },
    { name: 'Expenses', data: expenses },
  ];

  return (
        <Card>
            <CardHeader className='flex items-center gap-x-3'>
                <ChartArea size={35} />
                <h3 className="text-sm font-medium text-muted-foreground">{"Revenue vs Expenses (Last 6 Months)"}</h3>
            </CardHeader>
            <CardContent>
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    // height={320}
                />
            </CardContent>
        </Card>
  );
}

export default RevenueChart
