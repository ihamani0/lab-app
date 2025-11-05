<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CaseController extends Controller
{
    public function index(){

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
