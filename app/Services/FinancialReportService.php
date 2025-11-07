<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class FinancialReportService {



    public function getDateRange($request){

        $startMonth = Carbon::now()->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();


        $from = $request->input('date_from')
            ? Carbon::parse($request->input('date_from'))->setTimezone(config('app.timezone'))->toDateString()
            : $startMonth;

        $to = $request->input('date_to')
            ? Carbon::parse($request->input('date_to'))->setTimezone(config('app.timezone'))->toDateString()
            :$endMonth;

        return [$from, $to];
    }


    public function getKpis($from , $to){

            $totalIncomeMonthly =
                DB::table('case_invoices')
                ->whereBetween('invoice_date' , [$from , $to])
                ->sum('total_amount');

            $totalExpensesMonthly =
                DB::table('purchases')
                ->whereBetween('purchase_date' , [$from , $to])
                ->sum('net_amount');

            $NetProfitMonthly = $totalIncomeMonthly - $totalExpensesMonthly;

            $OutstandingInvoices =
                    DB::table('case_invoices')
                    ->where('payment_status', '!=', 'paid')
                    ->count();

            return [
                'totalIncome' => $totalIncomeMonthly,
                'totalExpenses' => $totalExpensesMonthly,
                'netProfit' => $NetProfitMonthly,
                'outstandingInvoices' => $OutstandingInvoices,
            ];
    }


    public function getMonthlyTrends($months){

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

        return [
            'labels' => $labels,
            'income' => $incomeSeries,
            'expense' => $expenseSeries,
        ] ;

    }


    public function getIncomeByDoctor($from, $to){

        return DB::table('case_invoices')
            ->join('prosthesis_cases' , 'case_invoices.prosthesis_case_id' , '=','prosthesis_cases.id')
            ->join('doctors' , 'prosthesis_cases.doctor_id' , '=' , 'doctors.id')
            ->select('doctors.id as doctor_id' , 'doctors.name as doctor_name' , DB::raw('SUM(case_invoices.net_amount) as total'))
            ->whereBetween('case_invoices.invoice_date' , [$from, $to])
            ->groupBy('doctors.id', 'doctors.name')
            ->get()
            ->map(function($row){
                return [
                    'doctor_id' => $row->doctor_id,
                    'doctor_name' => $row->doctor_name,
                    'total' => (float) $row->total
                ];
            });

    }

    public function getExpenseBySupplier($from, $to){

        return DB::table('purchases')
            ->join('suppliers' , 'purchases.supplier_id' , '=' , 'suppliers.id')
            ->select('suppliers.id as supplier_id' , 'suppliers.name as supplier_name' , DB::raw('SUM(purchases.net_amount) as total'))
            ->whereBetween('purchases.purchase_date' , [$from , $to])
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
    }

    public function getRecentCasePayments($from , $to){
        return DB::table('case_invoices')
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
            ->whereBetween('case_invoices.invoice_date' , [$from , $to])
            ->orderByDesc('case_invoices.payment_date')
            ->limit(50)
            ->get();
    }

    public function getRecentPurchasePayments($from , $to){
        return DB::table('purchases')
            ->join('suppliers', 'purchases.supplier_id', '=', 'suppliers.id')
            ->select(
                'purchases.id as purchase_id',
                'suppliers.name as supplier_name',
                'purchases.net_amount as amount',
                'purchases.purchase_date as date',
                'purchases.payment_status as payment_status'
            )
            ->whereBetween('purchases.purchase_date', [$from , $to])
            ->orderByDesc('purchases.purchase_date')
            ->limit(50)
            ->get();
    }

}
