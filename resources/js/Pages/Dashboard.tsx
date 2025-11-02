import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity,  Coins,  ListCollapse, Package2, TrendingDown, TrendingUp } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout";
import { Case, InvoiceCase, type BreadcrumbItem } from "@/Types";
import KpiCard from "@/components/kpi-card";
import RevenueChart from "@/components/revenue-chart";
import { FORMAT_DATE } from "@/constants";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MetricCard from "@/components/ui/metric-card";
import DonutChart from "@/components/donut-chart";
import { Badge } from "@/components/ui/badge";

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
    ];

type  PropsType = {
        kpis : {
            totalIncome : number;
            totalExpenses : number;
            lowStockCount : number;
            activeCases : number;
        } ,
        charts : {
            labels : string[] ,
            income : number[] ,
            expenses : number[] ,
        } ,
        recentCases : Case[] ,
        recentPayments : InvoiceCase[] ,
        daily : {
            income : number[]
            expenses : number[]
        },
        donut : {
            labels : string[]
            series : number[]
        }

}

function Dashboard() {

    const { kpis, charts, recentPayments, recentCases , daily , donut } = usePage<PropsType>().props;


  return (
        <AppLayout  breadcrumbs={breadcrumbs}>

        <div className="space-y-3">
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <MetricCard
                        title="Income"
                        value ={kpis.totalIncome }
                        data={daily.income}
                        Icon={TrendingUp}
                    />

                    <MetricCard
                        title="Expenses"
                        value ={kpis.totalExpenses }
                        data={daily.expenses}
                        Icon={TrendingDown}
                    />

                    <KpiCard title="Low Stock Items" value={kpis.lowStockCount}
                        Icon={Package2}  />
                    <KpiCard title="Active Cases" value={kpis.activeCases} Icon={Activity} />
                </div>


            </div>


            <div className="flex-1 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2   ">

                    <RevenueChart
                    labels={charts.labels}
                    income={charts.income}
                    expenses={charts.expenses}

                    />

                    <DonutChart
                        title="Top 5 Services (This Month)"
                        labels={donut.labels}
                        series={donut.series}
                        />
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl p-4">
            <Card className="">
                <CardHeader className='flex items-center gap-x-3'>
                <ListCollapse size={35} />
                <h3 className="text-lg font-medium text-foreground">{"Recent Cases (30 days)"}</h3>
                </CardHeader>
                <CardContent className="overflow-auto">
                    <Table className="w-full text-sm">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="text-left">Case Number</TableHead>
                            <TableHead className="text-left">Doctor</TableHead>
                            <TableHead className="text-left">Patient</TableHead>
                            <TableHead className="text-left">received_date</TableHead>
                            </TableRow>
                        </TableHeader>
                            <TableBody>
                            {recentCases.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>
                                <Link href={`/prosthesis-case/${item.id}/edit`}>
                                <Badge variant={"outline"}>
                                    {item.case_number}
                                </Badge>
                                </Link>
                            </TableCell>
                            <TableCell>{item.doctor.name}</TableCell>
                            <TableCell>{item.patient.name}</TableCell>
                            <TableCell>{item.received_date && format(item.received_date , FORMAT_DATE)}</TableCell>
                            </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </div>


            <div className="overflow-x-auto rounded-xl p-4">
            <Card className="">
                <CardHeader className='flex items-center gap-x-3'>
                <Coins size={35} />
                <h3 className="text-lg font-medium text-foreground">{"Recent Payments (30 days)"}</h3>
                </CardHeader>
                <CardContent className="overflow-auto">
                    <Table className="w-full text-sm">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="text-left"># Invocie</TableHead>
                            <TableHead className="text-left">Case Number</TableHead>
                            <TableHead className="text-left">Doctor</TableHead>
                            <TableHead className="text-left">Net Amount</TableHead>
                            <TableHead className="text-left">received_date</TableHead>
                            </TableRow>
                        </TableHeader>
                            <TableBody>
                            {recentPayments.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>
                                <Link href={`prosthesis-invoice/${item.id}/edit`}>
                                <Badge variant={"outline"}>
                                    {item.invoice_number}
                                </Badge>
                                </Link></TableCell>
                            <TableCell>
                                <Link href={`/prosthesis-case/${item.case.id}/edit`}>
                                <Badge variant={"outline"}>
                                    {item.case.case_number}
                                </Badge>
                                </Link>
                            </TableCell>
                            <TableCell>{item.case.doctor.name}</TableCell>
                            <TableCell>{item.net_amount}</TableCell>
                            <TableCell>{item.invoice_date && format(item.invoice_date , FORMAT_DATE)}</TableCell>
                            </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </div>

        </div>
    </AppLayout>

  )
}

export default Dashboard;

                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                */}
