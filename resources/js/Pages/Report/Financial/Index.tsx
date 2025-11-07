
import { Head,  usePage } from '@inertiajs/react';
import {   CalendarIcon, DollarSign, File, FileText, TrendingDown, TrendingUp } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout";
import {  type BreadcrumbItem } from "@/Types";
import KpiCard from "@/components/kpi-card";
import RevenueChart from "@/components/revenue-chart";

import ChartCard from "@/components/chart-card";
import { Card , CardHeader , CardTitle , CardContent} from '@/components/ui/card';
import { Table ,TableBody , TableCell , TableHead , TableHeader , TableRow} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import FilterDate from '@/components/filter-date';


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Financial Report',
            href: '/',
        },
    ];

type  PropsType = {
        kpis : {
            totalIncome : number;
            totalExpenses : number;
            netProfit : number;
            outstandingInvoices: number;
        } ,
        charts : {
            labels : string[] ,
            income : number[] ,
            expense : number[] ,
        } ,
        data : {
            incomeByDoctor : {
                doctor_id : string ,
                doctor_name : string ,
                total : number
            }[] ,
            expenseBySupplier : {
                supplier_id : string ,
                supplier_name : string ,
                total : number
            }[]

        } ,
        tables : {
            casePayments : {
                invoice_id : string,
                case_number:string
                patient_name : string,
                doctor_name : string,
                amount : number,
                status : string,
                payment_date : string ,
            }[],
            purchasePayments :{
                purchase_id:string
                supplier_name : string,
                amount : number,
                date : string,
                payment_status : string
            }[] ,

        }

}

function Dashboard() {

    const { kpis, charts , data ,  tables : {casePayments , purchasePayments }} = usePage<PropsType>().props;

    const doctorNames = data.incomeByDoctor.map(item => item.doctor_name);
    const doctorValues = data.incomeByDoctor.map(item => item.total);


    const supplierNames = data.expenseBySupplier.map(item => item.supplier_name);
    const supplierValues = data.expenseBySupplier.map(item => item.total);

  return (
        <AppLayout  breadcrumbs={breadcrumbs}>

        <div className="space-y-3">
            <Head title="Inventory Report" />

            <div className='flex-1 space-y-2 p-4'>

                <FilterDate url='/report/financial' />

            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <KpiCard title="Income Monthly" value={kpis.totalIncome}
                        Icon={TrendingUp} variant='success'  />
                    <KpiCard title="Expenses Monthly" value={kpis.totalExpenses}
                        Icon={TrendingDown} variant='danger' />
                    <KpiCard title="net Profit Monthly" value={kpis.netProfit}
                        Icon={DollarSign}  variant='info' />
                    <KpiCard title="out standing Invoices" value={kpis.outstandingInvoices}
                        Icon={FileText}  variant='warning' />
                </div>
            </div>


            <div className="flex-1 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-1">

                    <RevenueChart
                        labels={charts.labels}
                        income={charts.income}
                        expenses={charts.expense}
                    />

                </div>
            </div>


            <div className="grid grid-cols-2 gap-6 p-4">
                <ChartCard
                    labels={doctorNames}
                    series={doctorValues}
                    title={"Income by Doctor"}
                    type={"bar"}
                    //type="pie"
                />

                <ChartCard
                    labels={supplierNames}
                    series={supplierValues}
                    title={"Expense by Supplier"}
                    type={"bar"}
                    //type="pie"
                />
            </div>

            <div className="grid grid-cols-1 gap-y-6 p-4">
            <Card>
                <CardHeader><CardTitle>Case Payments</CardTitle></CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Case #</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Date</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {casePayments.map((c) => (
                        <TableRow key={c.invoice_id}>
                        <TableCell>{c.case_number}</TableCell>
                        <TableCell>{c.doctor_name}</TableCell>
                        <TableCell>{c.patient_name}</TableCell>
                        <TableCell>{c.amount}DA</TableCell>
                        <TableCell>{c.status} </TableCell>
                        <TableCell>{c.payment_date}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Purchase Payments</CardTitle></CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {purchasePayments.map((p, index) => (
                        <TableRow key={p.purchase_id}>
                        <TableCell>{p.supplier_name}</TableCell>
                        <TableCell>{p.amount} DA</TableCell>
                        <TableCell>{p.date}</TableCell>
                        <TableCell>
                            <Badge variant={p.payment_status === 'paid' ? 'success' : 'destructive'}>
                                {p.payment_status}
                            </Badge>
                        </TableCell>
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

