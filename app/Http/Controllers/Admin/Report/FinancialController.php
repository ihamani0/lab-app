<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FinancialController extends Controller
{
    public function index(){

        $startMonth = Carbon::now()->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();

        $startYear = Carbon::now()->startOfYear();
        $endYear = Carbon::now()->endOfYear();

        $totalIncomeMonthly =
                DB::table('case_invoices')
                ->whereBetween('invoice_date' , [$startMonth , $endMonth])
                ->sum('total_amount');

        $totalExpensesMonthly =
                DB::table('purchases')
                ->whereBetween('purchase_date' , [$startMonth , $endMonth])
                ->sum('net_amount');

        $NetProfitMonthly = $totalIncomeMonthly - $totalExpensesMonthly;

        $OutstandingInvoices = DB::table('case_invoices')->where('payment_status', '!=', 'paid')->count();


        // ---------- CHART: Monthly Profit Trend (last N months) ----------
        $months = 6;
        $start = Carbon::now()->subMonths($months - 1)->startOfMonth();

        $labels = [];
        $incomeSeries = [];
        $expenseSeries = [];

        for($i=0 ; $i<=$months ; $i++){
            $mStart = $start->copy()->addMonths($i)->startOfMonth();
            $mEnd = $start->copy()->addMonths($i)->endOfMonth();
            $labels[] = $start->copy()->addMonths($i)->format('M Y');

            $incomeMonth = (float) DB::table('case_invoices')->whereBetween('invoice_date' , [$mStart , $mEnd])->sum('total_amount');

            $expenseMonth = (float) DB::table('purchases')->whereBetween('purchase_date' , [$mStart , $mEnd])->sum('net_amount');

            $incomeSeries[] = $incomeMonth;
            $expenseSeries[] = $expenseMonth;
        }
        // ---------- CHART: Income Breakdown by Doctor ----------
        $incomeByDoctor = DB::table('case_invoices')
            ->join('prosthesis_cases' , 'case_invoices.prosthesis_case_id' , '=','prosthesis_cases.id')
            ->join('doctors' , 'prosthesis_cases.doctor_id' , '=' , 'doctors.id')
            ->select('doctors.id as doctor_id' , 'doctors.name as doctor_name' , DB::raw('SUM(case_invoices.net_amount) as total'))
            ->whereBetween('case_invoices.invoice_date' , [$startMonth , $endMonth])
            ->groupBy('doctors.id', 'doctors.name')
            ->get()
            ->map(function($row){
                return [
                    'doctor_id' => $row->doctor_id,
                    'doctor_name' => $row->doctor_name,
                    'total' => (float) $row->total
                ];
            });

        // ---------- CHART: Expense Breakdown by Supplier ----------
        $expenseBySupplier = DB::table('purchases')
            ->join('suppliers' , 'purchases.supplier_id' , '=' , 'suppliers.id')
            ->select('suppliers.id as supplier_id' , 'suppliers.name as supplier_name' , DB::raw('SUM(purchases.net_amount) as total'))
            ->whereBetween('purchases.purchase_date' , [$startMonth , $endMonth])
            ->groupBy('suppliers.id', 'suppliers.name')
            ->orderByDesc('total')
            ->get()
            ->map(function($row){
                return [
                    'supplier_id' => $row->supplier_id,
                    'supplier_name' => $row->supplier_name,
                    'total' => (float) $row->total
                ];
            });

        // ---------- TABLE: Case Payments (recent / paginated) ----------
        // Return recent payments with case number, patient, doctor, amount, status
         $casePayments = DB::table('case_invoices')
            ->join('prosthesis_cases' , 'case_invoices.prosthesis_case_id' , '=','prosthesis_cases.id')
            ->join('doctors' , 'prosthesis_cases.doctor_id' , '=' , 'doctors.id')
            ->join('patients' , 'prosthesis_cases.patient_id' , '=' , 'patients.id')
            ->select(
                'case_invoices.id as invoice_id',
                'prosthesis_cases.id as case_id',
                'prosthesis_cases.case_number',
                'doctors.name as doctor_name',
                'patients.name as patient_name',

                'case_invoices.total_amount as amount',
                'case_invoices.status as status',
                'case_invoices.payment_date as payment_date'
            )
            ->whereBetween('case_invoices.invoice_date' , [$startMonth , $endMonth])
            ->orderByDesc('case_invoices.payment_date')
            ->limit(50)
            ->get();
        // ---------- TABLE: Purchase Payments ----------
        $purchasePayments = DB::table('purchases')
            ->join('suppliers', 'purchases.supplier_id', '=', 'suppliers.id')
            ->select(
                'purchases.id as purchase_id',
                'suppliers.name as supplier_name',
                'purchases.net_amount as amount',
                'purchases.purchase_date as date',
                'purchases.payment_status as payment_status'
            )
            ->whereBetween('purchases.purchase_date', [$startMonth , $endMonth])
            ->orderByDesc('purchases.purchase_date')
            ->limit(50)
            ->get();

        // ---------- TABLE: Profit Summary by Month (for selected year or range)
        $yearMonths = [];
        for($m = 0; $m < 12; $m++){
            $monthStart = $startYear->copy()->addMonths($m)->startOfMonth();
            $monthEnd = $monthStart->copy()->endOfMonth();
            $label = $monthStart->format('Y-m');

            $monthIncome = (float) DB::table('case_invoices')
                ->whereBetween('invoice_date', [$monthStart, $monthEnd])
                ->sum('total_amount');

            $monthExpense = (float) DB::table('purchases')
                ->whereBetween('purchase_date', [$monthStart, $monthEnd])
                ->sum('net_amount');

            $yearMonths[] = [
                'month' => $label,
                'income' => $monthIncome,
                'expense' => $monthExpense,
                'net' => $monthIncome - $monthExpense,
            ];
        }

        // dd(
        //     [
        //         'Tables' => [
        //             'casePayments' => $casePayments,
        //             'purchasePayments' => $purchasePayments,
        //             'profitSummary' => $yearMonths,
        //         ],
        //         'data' =>[
        //             'incomeByDoctor' => $incomeByDoctor,
        //             'expenseBySupplier' => $expenseBySupplier,
        //         ]]
        // );


        return Inertia::render('Report/Financial/Index' , [
                "filters" => [] ,
                'kpis' => [
                    'totalIncome' => $totalIncomeMonthly,
                    'totalExpenses' => $totalExpensesMonthly,
                    'netProfit' => $NetProfitMonthly,
                    'outstandingInvoices' => $OutstandingInvoices,
                ],
                'charts' => [
                    'labels' => $labels,
                    'income' => $incomeSeries,
                    'expense' => $expenseSeries,
                ],
                'tables' => [
                    'casePayments' => $casePayments,
                    'purchasePayments' => $purchasePayments,
                    'profitSummary' => $yearMonths,
                ],
                'data' =>[
                    'incomeByDoctor' => $incomeByDoctor,
                    'expenseBySupplier' => $expenseBySupplier,
                ]
        ]);


    }
}



// 3. FINANCIAL DASHBOARD
// 🔹 KPIs
// Metric	Description
// 💵 Total Income	From payments (prosthesis cases)
// 💳 Total Expenses	From purchase_payments
// 📊 Net Profit	Income − Expenses
// 📅 Outstanding Invoices	case_invoices with payment_status != "paid"

// 🔹 Charts

// Monthly Profit Trend (Line chart)
// Compare monthly totals of income vs expenses.

// Income Breakdown by Doctor (Pie chart)
// Sum of payments per doctor.

// Expense Breakdown by Supplier (Bar chart)
// Sum of purchase payments per supplier.



// Table	Columns
// Case Payments	Case Number, Patient, Doctor, Amount, Status
// Purchase Payments	Supplier, Amount, Date, Method
// Profit Summary	Month, Income, Expense, Net
