<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Http\Controllers\Controller;
use App\Models\Consumption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsumptionController extends Controller{



    public function index(Request $request)
    {
        $query = Consumption::query()->with('material');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('service_number LIKE ?', ["%{$search}%"]);
                });
        }

        $consumption = $query
            ->paginate(10)
            ->appends($request->only('search'));


        // dd($consumption);

        return Inertia::render('Case/Consumption/ConsumptionIndex' , [
            'consumptions' => $consumption ,
        ]);
    }
}
