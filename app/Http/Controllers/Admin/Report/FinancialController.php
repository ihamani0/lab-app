<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Services\FinancialReportService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FinancialController extends Controller
{
    public function index(Request $request , FinancialReportService $service){

        [$from , $to] = $service->getDateRange($request);


        return Inertia::render('Report/Financial/Index' , [
                "filters" => [] ,
                'kpis' => $service->getKpis($from , $to),
                'charts' => $service->getMonthlyTrends(12),
                'tables' => [
                    'casePayments' => $service->getRecentCasePayments($from , $to),
                    'purchasePayments' => $service->getRecentPurchasePayments($from , $to),

                ],
                'data' =>[
                    'incomeByDoctor' => $service->getIncomeByDoctor($from , $to),
                    'expenseBySupplier' => $service->getExpenseBySupplier($from , $to),
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



// ---------- TABLE: Profit Summary by Month (for selected year or range)
        // $yearMonths = [];
        // for($m = 0; $m < 12; $m++){
        //     $monthStart = $startYear->copy()->addMonths($m)->startOfMonth();
        //     $monthEnd = $monthStart->copy()->endOfMonth();
        //     $label = $monthStart->format('Y-m');

        //     $monthIncome = (float) DB::table('case_invoices')
        //         ->whereBetween('invoice_date', [$monthStart, $monthEnd])
        //         ->sum('total_amount');

        //     $monthExpense = (float) DB::table('purchases')
        //         ->whereBetween('purchase_date', [$monthStart, $monthEnd])
        //         ->sum('net_amount');

        //     $yearMonths[] = [
        //         'month' => $label,
        //         'income' => $monthIncome,
        //         'expense' => $monthExpense,
        //         'net' => $monthIncome - $monthExpense,
        //     ];
        // }

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

