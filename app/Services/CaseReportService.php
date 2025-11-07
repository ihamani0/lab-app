<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CaseReportService {



    public function getRangeDate($request){

        $from = $request->input('date_from')
            ? Carbon::parse($request->input('date_from'))->startOfDay()
            : Carbon::now()->startOfYear();


        $to = $request->input('date_to')
            ? Carbon::parse($request->input('date_to'))->endOfDay()
            : Carbon::now()->endOfDay();


        return [$from , $to] ;
    }

    public function getKpis(){
        // ---------- KPIs ----------
        $totalCases = DB::table('prosthesis_cases')->count();

        $activeCases = DB::table('prosthesis_cases')
            ->where('status', '!=', 'delivered')
            ->count();

        $averageCaseValue = (float) DB::table('prosthesis_cases')
            ->selectRaw('AVG(total_cost) as avg_cost')
            ->value('avg_cost') ?? 0;

        // Distinct technicians participating in open cases (join case_items)
        $techniciansActive = DB::table('prosthesis_cases')
            ->where('status', '!=', 'delivered')
            ->whereNotNull('technician_id')
            ->distinct()
            ->count('technician_id');

        return [
                'totalCases' => $totalCases,
                'activeCases' => $activeCases,
                'averageCaseValue' => round($averageCaseValue, 2),
                'techniciansActive' => $techniciansActive,
        ] ;
    }


    public function getCasesByDoctors($from, $to){
        return DB::table('prosthesis_cases')
            ->join('doctors', 'prosthesis_cases.doctor_id', '=', 'doctors.id')
            ->select('doctors.id as doctor_id', 'doctors.name as doctor_name', DB::raw('COUNT(prosthesis_cases.id) as total'))
            ->whereBetween('prosthesis_cases.received_date', [$from, $to])
            ->groupBy('doctors.id', 'doctors.name')
            ->orderByDesc('total')
            ->get()
            ->map(fn($r) => [
                'doctor_id' => $r->doctor_id,
                'doctor_name' => $r->doctor_name,
                'total' => (int) $r->total,
            ]);
    }


    public function getCompletedRate($from, $to){
        $totalInRange = DB::table('prosthesis_cases')
            ->whereBetween('received_date', [$from, $to])
            ->count();

        $deliveredInRange = DB::table('prosthesis_cases')
            ->whereBetween('received_date', [$from, $to])
            ->where('status', 'delivered')
            ->count();
        $deliveredInRange = DB::table('prosthesis_cases')
            ->whereBetween('received_date', [$from, $to])
            ->where('status', 'delivered')
            ->count();

        return  [
            'delivered' => $deliveredInRange,
            'remaining' => max(0, $totalInRange - $deliveredInRange),
        ];
    }


    public function getServiceUsage($from , $to){
        return DB::table('case_items')
            ->join('services', 'case_items.service_id', '=', 'services.id')
            ->select('services.id as service_id', 'services.name as service_name', DB::raw('SUM(case_items.quantity) as total_used'))
            ->whereBetween('case_items.created_at', [$from, $to])
            ->groupBy('services.id', 'services.name')
            ->orderByDesc('total_used')
            ->limit(20)
            ->get()
            ->map(fn($r) => [
                'service_id' => $r->service_id,
                'service_name' => $r->service_name,
                'total_used' => (int) $r->total_used,
            ]);
    }

    public function getCurrentCases($from,$to){
        return DB::table('prosthesis_cases')
            ->join('doctors', 'prosthesis_cases.doctor_id', '=', 'doctors.id')
            ->join('patients', 'prosthesis_cases.patient_id', '=', 'patients.id')
            ->select(
                'prosthesis_cases.id',
                'prosthesis_cases.case_number',
                'doctors.name as doctor_name',
                'patients.name as patient_name',
                'prosthesis_cases.status',
                'prosthesis_cases.total_cost',
                'prosthesis_cases.received_date',
                'prosthesis_cases.delivered_date'
            )
            ->whereBetween('prosthesis_cases.created_at', [$from, $to])
            ->orderByDesc('prosthesis_cases.created_at')
            ->limit(100)
            ->get();
    }


    public function getMaterialConsumptions($from, $to){
        return DB::table('consumptions')
            ->join('materials', 'consumptions.material_id', '=', 'materials.id')
            ->select(
                'materials.name as material_name',
                'consumptions.quantity_used',
                DB::raw('(consumptions.quantity_used * COALESCE(materials.price,0)) as cost'),
                'consumptions.created_at as date'
            )
            ->whereBetween('consumptions.created_at', [$from, $to])
            ->orderByDesc('consumptions.created_at')
            ->limit(200)
            ->get();
    }
}
