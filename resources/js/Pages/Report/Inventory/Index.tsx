import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { type BreadcrumbItem } from "@/Types";
import KpiCard from "@/components/kpi-card";
import ChartCard from "@/components/chart-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Package, AlertTriangle } from "lucide-react";
import FilterDate from "@/components/filter-date";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/" },
  { title: "Inventory Report", href: "/report/inventory" },
];

type PropsType = {
  kpis: {
    totalMatrilas: number;
    totalLowStockItems: number;
    totalPurchases: number;
    totalStockValue: number;
  };
  charts: {
    incoming: { month: string; incoming_quantity: number }[];
    outgoing: { month: string; outgoing_quantity: number }[];
    stock_value: { category_name: string; total_stock_value: number }[];
  };
  tables: {
    currentStock: {
      id: number;
      material_name: string;
      brand_name: string;
      category_name: string;
      stock_quantity: number;
      min_stock: number;
      status: string;
    }[];
    purchaseHistory: {
      id: number;
      purchase_date: string;
      supplier_name: string;
      total_amount: number;
      status: string;
    }[];
    stockMovements: {
      date: string;
      type: string;
      quantity: number;
      material_name: string;
      raison: string;
    }[];
  };
};

export default function InventoryDashboard() {
  const { kpis, charts, tables } = usePage<PropsType>().props;

  const incomingLabels = charts.incoming.map((i) => i.month);
  const incomingValues = charts.incoming.map((i) => i.incoming_quantity);
  const outgoingLabels = charts.outgoing.map((o) => o.month);
  const outgoingValues = charts.outgoing.map((o) => o.outgoing_quantity);
  const stockLabels = charts.stock_value.map((s) => s.category_name);
  const stockValues = charts.stock_value.map((s) => s.total_stock_value);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Inventory Report" />

      <div className="space-y-6 p-4">
        <FilterDate url="/report/inventory" />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard title="Total Materials" value={kpis.totalMatrilas} Icon={Package} variant="info" />
          <KpiCard title="Low Stock Items" value={kpis.totalLowStockItems} Icon={AlertTriangle} variant="warning" />
          <KpiCard title="Monthly Purchases" value={kpis.totalPurchases} Icon={TrendingUp} variant="success" />
          <KpiCard title="Total Stock Value (DA)" value={kpis.totalStockValue} Icon={TrendingDown}  />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard
            labels={incomingLabels}
            series={incomingValues}
            title="Incoming Materials per Month"
            type="line"
          />
          <ChartCard
            labels={outgoingLabels}
            series={outgoingValues}
            title="Outgoing Materials per Month"
            type="line"
          />
          <ChartCard
            labels={stockLabels}
            series={stockValues}
            title="Stock Value by Category"
            type="bar"
          />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 gap-8">
          {/* Current Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Current Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Min Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.currentStock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.material_name}</TableCell>
                      <TableCell>{item.brand_name}</TableCell>
                      <TableCell>{item.category_name}</TableCell>
                      <TableCell>{item.stock_quantity}</TableCell>
                      <TableCell>{item.min_stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "Low Stock" ? "destructive" : "success"}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Purchase History */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.purchaseHistory.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.purchase_date}</TableCell>
                      <TableCell>{p.supplier_name}</TableCell>
                      <TableCell>{p.total_amount} DA</TableCell>
                      <TableCell>
                        <Badge
                          variant={p.status === "paid" ? "success" : "warning"}
                        >
                          {p.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Stock Movements */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Movements Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.stockMovements.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell>{m.date}</TableCell>
                      <TableCell>{m.type}</TableCell>
                      <TableCell>{m.quantity}</TableCell>
                      <TableCell>{m.material_name}</TableCell>
                      <TableCell>{m.raison}</TableCell>
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
