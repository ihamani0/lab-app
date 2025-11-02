<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CaseInvoice;
use App\Models\ProsthesisCase;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request){

        // Optional: read date range from query string
        $from = $request->query('from', Carbon::now()->startOfMonth()->toDateString());
        $to = $request->query('to', Carbon::now()->endOfMonth()->toDateString());


        //KPI Incoming
        //for now am going to use Prothises Case for sum all total incoming payment
        $totalIncome =
        DB::table('case_invoices')
        ->whereBetween('invoice_date' , [$from , $to])
        ->sum('total_amount');

        // KPI: total expenses this month
        $totalExpenses = DB::table('purchases')
        ->whereBetween('purchase_date' , [$from , $to])
        ->sum('net_amount');


        // KPI: total expenses this month
        $lowStockCount = DB::table('materials')
            ->whereColumn('stock_quantity', '<=', 'min_stock')
            ->count();


        // KPI: active cases
        $activeCases = DB::table('prosthesis_cases')->where('status', '!=', 'delivered')->count();

        // Chart data: revenue vs expense by month (last 6 months)
        $start = Carbon::now()->subMonths(5)->startOfMonth();
        $labels = []; // her we set the months
        $incomeSeries = []; // her we set the income Total for each month
        $expenseSeries = []; // her we set the expense Total for each month


        for ($i = 0; $i < 6; $i++) {
            $mFrom = $start->copy()->addMonths($i)->startOfMonth()->toDateString();
            $mTo = $start->copy()->addMonths($i)->endOfMonth()->toDateString();
            $labels[] = $start->copy()->addMonths($i)->format('M Y');

            $incomeSeries[]=DB::table('case_invoices')->whereBetween('invoice_date' , [$mFrom , $mTo])->sum('total_amount');

            $expenseSeries[] = DB::table('purchases')->whereBetween('purchase_date' , [$mFrom , $mTo])->sum('net_amount');
        }


        $recentPayments = CaseInvoice::with('case.doctor')->latest('payment_date')->limit(10)->get();
        $recentCases = ProsthesisCase::with('patient','doctor')->latest('created_at')->limit(10)->get();



        //Add Daily Incomine and expense

        $startMonth = Carbon::now()->startOfMonth();
        $endMonth = Carbon::now()->endOfMonth();

        $incomingDaily = DB::table('case_invoices')
                ->selectRaw('DATE(invoice_date) as day , SUM(total_amount) as total')
                ->whereBetween('invoice_date' , [$startMonth , $endMonth])
                ->groupBy('day')
                ->orderBy('day')
                ->pluck('total', 'day');

        $expenseDaily = DB::table('purchases')
            ->selectRaw('DATE(purchase_date) as day , SUM(net_amount) as total')
            ->whereBetween('purchase_date' , [$startMonth , $endMonth])
            ->groupBy('day')
            ->orderBy('day')
            ->pluck('total', 'day');

         $daysInMonth = $startMonth->daysInMonth;
         $dailyIncomeSeries = [];
         $dailyExpenseSeries = [];

         for($i = 1 ; $i <=$daysInMonth ; $i++){
            $date = $startMonth->copy()->day($i)->toDateString();
            $dailyIncomeSeries[] = (float) ($incomingDaily[$date] ?? 0) ;
            $dailyExpenseSeries[] = (float) ($expenseDaily[$date] ?? 0) ;
         }


         //Add Top % services for this Month
        $topServices = DB::table('case_items')
            ->join('services', 'case_items.service_id', '=', 'services.id')
            ->select('services.name', DB::raw('COUNT(*) as total'))
            ->whereBetween('case_items.created_at', [$startMonth->subMonth(), $endMonth])
            ->groupBy('services.name')
            ->limit(5)
            ->orderBy('total', 'desc')
            ->get();


            // dd($topServices);

            $serviceLabels = $topServices->pluck('name');
            $serviceSeries = $topServices->pluck('total');


        return \Inertia\Inertia::render('Dashboard' , [
            'kpis' => [
                'totalIncome' => (float) $totalIncome,
                'totalExpenses' => (float) $totalExpenses,
                'lowStockCount' => (int) $lowStockCount,
                'activeCases' => (int) $activeCases,
            ],
            'charts' => [
                'labels' => $labels,
                'income' => $incomeSeries,
                'expenses' => $expenseSeries,
            ],

            'daily' => [
                'income' => $dailyIncomeSeries,
                'expenses' => $dailyExpenseSeries,
            ],

            'donut' => [
                'labels' => $serviceLabels,
                'series' => $serviceSeries,
            ],

            'recentPayments' => $recentPayments,
            'recentCases' => $recentCases,

        ]);
    }
}
