<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Http\Controllers\Controller;
use App\Models\CaseInvoice;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = CaseInvoice::query()->with(['case.patient' , 'case.doctor' , 'case.technicien' , 'case.CaseItems']);
        // if ($request->filled('search')) {
        //     $search = strtolower($request->search);
        //     $query->where(function ($q) use ($search) {
        //             $q->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
        //             ->orWhereRaw('service_number LIKE ?', ["%{$search}%"]);
        //         });
        // }
        $invoices = $query
            ->paginate(10)
            ->appends($request->only('search'));



        return Inertia::render('Case/Invoices/Invoice' , [
            'invoices'=>$invoices
        ]);
    }


    public function edit(CaseInvoice $prosthesis_invoice){
        $invoice =CaseInvoice::query()->with(['case.patient' , 'case.doctor' , 'case.technicien' , 'case.CaseItems']);

        return Inertia::render('Case/Invoices/details-invoice');
    }


    public function update(Request $request, Service $prosthesisService)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $prosthesisService->update($request->all());

        return redirect()->route('prosthesis-service.index')->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $prosthesisService)
    {
        $prosthesisService->delete();

        return redirect()->route('prosthesis-service.index')->with('success', 'Service deleted successfully.');
    }
}
