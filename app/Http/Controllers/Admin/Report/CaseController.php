<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Services\CaseReportService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CaseController extends Controller
{
    public function index(Request $request , CaseReportService $service){


        [$from , $to] = $service->getRangeDate($request);

            // ---------- RETURN ----------
        return Inertia::render('Report/Cases/Index', [

            'kpis' => $service->getKpis(),

            'charts' => [
                'casesByDoctor' => $service->getCasesByDoctors($from , $to),
                'completionRate' => $service->getCompletedRate($from ,$to),
                // 'technicianProductivity' => $technicianProductivity,
                'serviceUsage' => $service->getServiceUsage($from,$to),
            ],
            'tables' => [
                'currentCases' => $service->getCurrentCases($from,$to),
                'materialConsumptions' => $service->getMaterialConsumptions($from,$to),
            ],
            // echo back filters if needed on the frontend
            'filters' => [
                'date_from' => $from->toDateString(),
                'date_to' => $to->toDateString(),
            ],
        ]);

    }
}



// 🦷 4. PRODUCTION / CASE DASHBOARD
// 🔹 KPIs
// Metric	Description
// 🦷 Total Cases	Total prosthesis cases
// 🕓 Active Cases	Cases with status ≠ delivered
// 💰 Average Case Value	avg(total_cost)
// 👨‍🔧 Technicians Active	Distinct technicians in open cases


// 🔹 Charts

// Cases by Doctor (Bar chart)
// Count cases grouped by doctor.

// Case Completion Rate (Donut chart)
// Ratio of delivered vs total.

// Technician Productivity (Bar chart)
// Count of cases or items completed per technician.

// Service Usage Frequency (Bar chart)
// From case_items → count per service.



// Current Cases	            Case Number, Doctor, Patient, Status, Total, Received/Delivered dates
// Case Items	                Service, Technician, Unit Price, Quantity, Status
// Material Consumptions	    Case, Material, Quantity Used, Cost
