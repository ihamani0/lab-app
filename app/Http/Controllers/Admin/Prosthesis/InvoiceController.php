<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Exports\InvoiceExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\CaseInvoiceResource;
use App\Models\CaseInvoice;
use App\Models\Doctor;
use App\Models\Service;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class InvoiceController extends Controller
{
    //
    public function index(Request $request)
    {
        // dd($request->all());
        $query = CaseInvoice::query()->with(['case']);

        //---------------------------------------------------------------------

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                    $q->where('invoice_number', 'LIKE', "%INV-{$search}%")
                    ->OrWhere('invoice_number', 'LIKE', "%{$search}%")
                    ->orWhereHas('case' , function($q2) use($search){
                        $q2->where('case_number' , 'LIKE', "%CAS-{$search}%")
                            ->orWhere('case_number' , 'LIKE', "%{$search}%");
                    });
                });
        }


        $invoices = $this->applyInvoiceFilters($query , $request)
            ->paginate(20)
            ->appends($request->all());

        // dd(Doctor::pluck('name', 'id'));
        // dd($invoices->all());

        return Inertia::render('Case/Invoices/Invoice' , [
            'invoices'=>$invoices ,
            'doctors' => Doctor::select('name', 'id')->get() ,
            'filters' => $request->only(['doctor_id' , 'search' , 'status' , 'date_from' , "date_to" , 'amount_min' , 'amount_max'])
        ]);
    }


        //---------------------------------------------------------------------

    public function edit(CaseInvoice $prosthesis_invoice){
            $prosthesis_invoice->load([
                'case.patient',
                'case.doctor',
                'case.technician',
                'case.CaseItems.service'
            ]);

        return Inertia::render('Case/Invoices/details-invoice' , [
            'invoice' => (new CaseInvoiceResource($prosthesis_invoice))->resolve(),
        ]);
    }


    //---------------------------------------------------------------------

    public function update(Request $request, CaseInvoice $prosthesis_invoice)
    {

        // dd($request->all());

        $validated = $request->validate([
            'status' => 'required|string|max:255|in:draft,final',
            'payment_status' => 'required|string|max:255',
            'payment_date' => 'nullable|string',
        ]);


        if (!empty($validated['payment_date'])) {
            $validated['payment_date'] = Carbon::parse($validated['payment_date']);
        }


        //  dd($validated);

        $prosthesis_invoice->update($validated);

        return redirect()->route('prosthesis-invoice.edit' , [$prosthesis_invoice->id])->with('success', 'Service updated successfully.');
    }



    //---------------------------------------------------------------------

    public function destroy(Service $prosthesisService)
    {
        $prosthesisService->delete();

        return redirect()->route('prosthesis-service.index')->with('success', 'Service deleted successfully.');
    }
    //---------------------------------------------------------------------


        public function downloadInvoice(CaseInvoice $case_invoice){

            $case_invoice->load(['case.doctor' , 'case.patient' , 'case.technician' , 'case.caseItems.service' ]);
            // dd($invoice);

            // Pass both the case and the invoice data to the view
            $pdf = Pdf::loadView('Pdf.InvoiceCase', [
                'invoice' => $case_invoice, // ✅ Uncommented this line
            ]);

            $fileName = $case_invoice->invoice_number . '.pdf';

            // Let Spatie Media Library handle the file directly from the PDF stream
            // This avoids creating and then deleting a temporary file, which is safer and cleaner.
                // ✅ CLEAR THE COLLECTION FIRST
            // This deletes any old invoice PDFs associated with this record.
            $case_invoice->clearMediaCollection('invoice');

            $case_invoice
                ->addMediaFromString($pdf->output())
                ->usingFileName($case_invoice->invoice_number . '.pdf')
                ->toMediaCollection('invoice', 'public'); // Specify the disk if needed

            $media = $case_invoice->getFirstMedia('invoice');
            if (! $media) abort(404);
            return response()->download($media->getPath(), $media->file_name);
        }



        //---------------------------------------------------------------------


        public function export(Request $request , string $format)
        {
            // dd($request->all());

            if (!in_array($format, ['csv', 'xlsx'])) {
                    abort(400, 'Unsupported format');
            }

            $filters = $request->only(['doctor_id', 'status', 'amount_min', 'amount_max', 'date_from', 'date_to']);

            return Excel::download(new InvoiceExport($filters), "invoices-{$format}-export.{$format}");
        }


    private function applyInvoiceFilters($query, $request){


        if ($request->filled('date_from') && $request->filled('date_to')) {

                $query->whereBetween('invoice_date', [Carbon::parse($request->date_from)->format("Y-m-d"), Carbon::parse($request->date_to)->format("Y-m-d")]);

            } elseif ($request->filled('date_from')) {

                $query->whereDate('invoice_date', '>=', $request->date_from);

            } elseif ($request->filled('date_to')) {

                $query->whereDate('invoice_date', '<=', $request->date_to);

            }



        if ($request->filled('status')) {
            $query->where('payment_status', $request->status);
        }


        if($request->filled('amount_min') && $request->filled('amount_max')){

            $query->whereBetween('total_amount', [
                            (float) $request->amount_min,
                            (float) $request->amount_max,
                        ]);

        }else if($request->filled('amount_min') && !$request->filled('amount_max')){

            $query->where('total_amount', '>=' , (float) $request->amount_min);
        }else if ($request->filled('amount_max')) {
                $query->where('total_amount', '<=' , (float) $request->amount_max);

        }

        return $query;
    }

    }
