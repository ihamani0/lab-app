<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorDashboardController extends Controller
{

    public function index(){

        $doctor = Auth::user()->doctor->load(['patients:id,name,doctor_id' , 'cases.patient' , 'cases.technician' , 'cases.CaseItems'
        ]);



        // dd($doctor);

        return Inertia::render('Dashboards/Doctor/doctor-dashboard' ,[
            'doctor'=>$doctor,
        ]);
    }


    public function edit(){
        return Inertia::render('Dashboards/Doctor/doctor-edit');
    }



}
