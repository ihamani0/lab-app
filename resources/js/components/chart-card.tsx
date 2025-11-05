import { Card , CardHeader , CardTitle , CardContent} from "./ui/card";
import Chart, { Props as ApexChartProps } from "react-apexcharts";
import { ApexOptions } from 'apexcharts';


type ChartType = "bar" | "pie" | "donut" | "line"; // Add other types as needed

type Props = {
    title: string;
    labels: string[];
    series: number[];
    type: ChartType;
}


export default function ChartCard({title , labels , series , type = "pie"} : Props) {

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            }
        },
        // For Pie/Donut charts, labels are configured here
        labels: labels,
        // For Bar/Line charts, labels are configured in the xaxis
        xaxis: {
            categories: labels
        }
    };

    const chartSeries = type === 'bar' || type === 'line' ? [{ data: series }] : series;
  return (
        <Card>
            <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
            <CardContent>
                <Chart
                    options={options}
                    series={chartSeries}
                    type={type}
                    height={300}
                />
            </CardContent>
        </Card>
  )
}
