import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Chart from "react-apexcharts";
import { useTheme } from "next-themes";
import { ApexOptions } from "apexcharts";

type Props = {
  title: string;
  labels: string[];
  series: any;
  type?: "pie" | "donut" | "bar" | "line";
};

export default function ChartCard({
  title,
  labels,
  series,
  type = "pie",
}: Props) {
  const { theme } = useTheme(); // detects system theme
  const isDark = theme === "dark";

  const textColor = isDark ? "#e2e8f0" : "#1e293b"; // slate-200 vs slate-800
  const gridColor = isDark ? "#334155" : "#e2e8f0"; // subtle grid contrast

  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      foreColor: textColor, // affects legends & axis
      background: "transparent",
    },
    labels: labels,
    xaxis: {
      categories: labels,
      labels: {
        style: { colors: textColor },
      },
      axisBorder: { color: gridColor },
      axisTicks: { color: gridColor },
    },
    yaxis: {
      labels: {
        style: { colors: textColor },
      },
    },
    legend: {
      labels: {
        colors: textColor,
      },
    },
    grid: {
      borderColor: gridColor,
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
  };

  const chartSeries =
    type === "bar" || type === "line" ? [{ data: series }] : series;

  return (
    <Card className="transition-colors duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={chartSeries} type={type} height={300} />
      </CardContent>
    </Card>
  );
}
