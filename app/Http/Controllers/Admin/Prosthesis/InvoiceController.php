<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Http\Controllers\Controller;
use App\Http\Resources\CaseInvoiceResource;
use App\Models\CaseInvoice;
use App\Models\Service;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = CaseInvoice::query()->with(['case']);
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
            $prosthesis_invoice->load([
                'case.patient',
                'case.doctor',
                'case.technician',
                'case.CaseItems.service'
            ]);



        //  dd((new CaseInvoiceResource($prosthesis_invoice))->toArray(request()));

        return Inertia::render('Case/Invoices/details-invoice' , [
            'invoice' => (new CaseInvoiceResource($prosthesis_invoice))->resolve(),
        ]);
    }


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

    public function destroy(Service $prosthesisService)
    {
        $prosthesisService->delete();

        return redirect()->route('prosthesis-service.index')->with('success', 'Service deleted successfully.');
    }


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
}
