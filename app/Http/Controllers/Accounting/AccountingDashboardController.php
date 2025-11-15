<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AccountingDashboardController extends Controller {


    public function index(){
        return Inertia::render('Dashboards/Accounting/accounting-dashboard');

    }
}
