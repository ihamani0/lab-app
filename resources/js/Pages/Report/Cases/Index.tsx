import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { type BreadcrumbItem } from '@/Types';
import KpiCard from '@/components/kpi-card';
import ChartCard from '@/components/chart-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import FilterDate from '@/components/filter-date';
import { Users, Activity, Box, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Production / Cases', href: '/report/production' },
];

type PropsType = {
  kpis: {
    totalCases: number;
    activeCases: number;
    averageCaseValue: number;
    techniciansActive: number;
  };
  charts: {
    casesByDoctor: { doctor_id: number; doctor_name: string; total: number }[];
    completionRate: { delivered: number; remaining: number };
    // technicianProductivity: { technician_id: number; technician_name: string; total_completed: number }[];
    serviceUsage: { service_id: number; service_name: string; total_used: number }[];
  };
  tables: {
    currentCases: {
      id: number;
      case_number: string;
      doctor_name: string;
      patient_name: string;
      status: string;
      total_cost: number;
      received_date: string | null;
      delivered_date: string | null;
    }[];

    materialConsumptions: {
      id: number;
      case_number: string;
      material_name: string;
      quantity_used: number;
      cost: number;
      date: string;
    }[];
  };
};

export default function Dashboard() {
  const { kpis, charts, tables } = usePage<PropsType>().props;

  // Chart data transforms
  const doctorLabels = charts.casesByDoctor.map(d => d.doctor_name);
  const doctorSeries = charts.casesByDoctor.map(d => d.total);

//   const techLabels = charts.technicianProductivity.map(t => t.technician_name);
//   const techSeries = charts.technicianProductivity.map(t => t.total_completed);

  const serviceLabels = charts.serviceUsage.map(s => s.service_name);
  const serviceSeries = charts.serviceUsage.map(s => s.total_used);

  const donutLabels = ['Delivered', 'Remaining'];
  const donutSeries = [charts.completionRate.delivered, charts.completionRate.remaining];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Production / Case Dashboard" />

      <div className="space-y-6 p-4">
        
        <FilterDate url="/report/production" />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard title="Total Cases" value={kpis.totalCases} Icon={Box} variant="info" />
          <KpiCard title="Active Cases" value={kpis.activeCases} Icon={Activity} variant="warning" />
          <KpiCard title="Avg Case Value" value={kpis.averageCaseValue} Icon={Zap}  />
          <KpiCard title="Technicians Active" value={kpis.techniciansActive} Icon={Users} variant="success" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard labels={doctorLabels} series={doctorSeries} title="Cases by Doctor" type="bar" />
          <ChartCard labels={donutLabels} series={donutSeries} title="Case Completion Rate" type="donut" />
          {/* <ChartCard labels={techLabels} series={techSeries} title="Technician Productivity" type="bar" /> */}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ChartCard labels={serviceLabels} series={serviceSeries} title="Service Usage Frequency" type="bar" />
          {/* placeholder or small KPI chart could go here */}
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 gap-8">
          {/* Current Cases */}
          <Card>
            <CardHeader><CardTitle>Current Cases</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case #</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Received / Delivered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.currentCases.map(c => (
                    <TableRow key={c.id}>
                      <TableCell>{c.case_number}</TableCell>
                      <TableCell>{c.doctor_name}</TableCell>
                      <TableCell>{c.patient_name}</TableCell>
                      <TableCell>
                        <Badge variant={c.status === 'delivered' ? 'success' : 'warning'}>{c.status}</Badge>
                      </TableCell>
                      <TableCell>{c.total_cost} DA</TableCell>
                      <TableCell>{c.received_date ?? '-'} / {c.delivered_date ?? '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>


          {/* Material Consumptions */}
          <Card>
            <CardHeader><CardTitle>Material Consumptions</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.materialConsumptions.map((m , i) => (
                    <TableRow key={i}>
                      <TableCell>{m.date}</TableCell>
                      <TableCell>{m.material_name}</TableCell>
                      <TableCell>{m.quantity_used}</TableCell>
                      <TableCell>{m.cost} DA</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
