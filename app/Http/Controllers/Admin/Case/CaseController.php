<?php

namespace App\Http\Controllers\Admin\Case;

use App\Http\Controllers\Controller;
use App\Http\Requests\CaseRequest;
use App\Models\CaseInvoice;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\ProsthesisCase;
use App\Models\Service;
use App\Models\User;
use App\Services\CaseCalculator;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CaseController extends Controller
{
    public function index(Request $request)  {

        $query = ProsthesisCase::query()->with(['doctor' , 'technician' , 'patient' , "caseItems.service"]);


            if ($request->filled('search')) {
                $search = $request->search;
                $query = $query->where(function ($q) use ($search){
                        $q->where('case_number', 'LIKE', "%CA-{$search}%")
                            ->orWhere('case_number', 'LIKE', "%{$search}%");
                        $q->orWhereHas('patient' , function($patientQuery) use($search){
                            $patientQuery->whereRaw('LOWER(name) LIKE ?' , ["%{$search}%"]);
                         });
                });

            }
            //---------------------------------------------------------------------
            if ($request->filled('doctor')) {
                $query->where('doctor_id', $request->doctor);
            }
            //---------------------------------------------------------------------
            if ($request->filled('technician')) {
                $query->where('technician_id', $request->technician);
            }
            //---------------------------------------------------------------------
            if ($request->filled('status')) {
                switch ($request->status) {
                    case 'pending':
                        $query->where('status' , 'pending');
                        break;
                    case 'completed':
                        $query->where('status' , 'completed');
                        break;
                    case 'delivered':
                        $query->where('status' , 'delivered');
                        break;
                    case 'in_progress':
                        $query->where('status', 'in_progress');
                        break;
                    case 'on_hold':
                        $query->where('status', 'on_hold');
                        break;
                    case 'canceled':
                        $query->where('status', 'canceled');
                        break;
                    default:
                }
            }
            //---------------------------------------------------------------------
            if($request->filled('date_from') && $request->filled('date_to')){

                $query->whereBetween('received_date', [ Carbon::parse($request->date_from)->toDateString(),Carbon::parse($request->date_to)->toDateString()]);

            }else if($request->filled('date_from') && !$request->filled('date_to')){

                $query->where('received_date', $request->date_from);
            }else if ($request->filled('date_to')) {
                $query->whereDate('received_date', $request->date_to);
            }

            //---------------------------------------------------------------------
            $cases  = $query
                ->orderByDesc("id")
                ->paginate(20)
                ->appends($request->all())
                ->through(fn ($case) => [
                'id'                => $case->id,
                'case_number'       => $case->case_number,
                'description'       => $case?->description,
                'received_date'     => $case->received_date ,
                'delivered_date'    => $case->delivered_date ,
                'total_cost'        => $case->total_cost,
                'status'            => $case->status,
                'patient'           => $case->patient ? [
                        'id'               => $case->patient->id,
                        'name'              => $case->patient->name,
                ] : null ,  // Handle null price
                'doctor'            => $case->doctor ? [
                    'id'               => $case->doctor->id,
                    'name'              => $case->doctor->name,
                ] : null ,
                'technician'        => $case->technician ? [
                        'id'               => $case->technician->id,
                        'name'              => $case->technician->name,
                ] : null , // Handle null price
                "case_items" => $case->caseItems
            ]);

            //dd($cases);

            $doctors = Doctor::all();
            $technicians = User::role('technician')->get();
            $patients = Patient::all();



        return Inertia::render('Case/Case' , [
            "cases" => $cases ,
            "doctors" => $doctors ,
            "technicians" => $technicians ,
            "patients" => $patients ,
            "filters" => $request->only(['search' , 'doctor' , 'technician' , 'status' ])
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'technician_id' => 'required|exists:users,id',
            'assistant' => 'required|string',
            'received_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        try{

            DB::transaction(function() use ($validated){
                // dd($validated);
                ProsthesisCase::create($validated);
            });

            return redirect()->route('prosthesis-case.index')->with('success', 'Case created successfully.');

        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Please try again.');
        }

    }


    public function edit(ProsthesisCase $prosthesis_case){
        $prosthesis_case->load(['doctor' , 'technician' , 'patient' , 'CaseItems' , "CaseItems.service"]);

        return Inertia::render('Case/edit-case' , [
            "prosthesis_case" => $prosthesis_case ,
            "doctors" => Doctor::all() ,
            "technicians" => User::role('technician')->get() ,
            "patients" => Patient::all() ,
            "service" => Service::all(),
        ]);
    }




    public function update(CaseRequest $request , ProsthesisCase $prosthesis_case ,    CaseCalculator $case_calculator){


        $validated = $request->validated();
        // dd($validated);
        try{
            DB::transaction(function() use ($request , $prosthesis_case , $case_calculator){
                $prosthesis_case->update([
                    'patient_id'            => $request->patient_id,
                    'doctor_id'             => $request->doctor_id,
                    'technician_id'         => $request->technician_id,
                    'assistant'             => $request->assistant,
                    'delivered_date'        => $request->delivered_date
                    ? \Carbon\Carbon::parse($request->delivered_date)->toDateString()
                    : $prosthesis_case->delivered_date, // keep old if not provided
                    "status"                => $request->status,
                    "description"           => $request->description,
                ]);


                // If feature we Add THe stl file finish for our products
                $prosthesis_case->CaseItems()->delete(); // remove old
                foreach ($request->case_items as $itemData) {
                    $prosthesis_case->CaseItems()->create($itemData);
                }

                //calculate total case amount based on the item case
                $case_calculator->recalculate($prosthesis_case);
            });

            return redirect()->route('prosthesis-case.edit' , ["prosthesis_case"=>$prosthesis_case->id])->with('success', 'Case updated successfully.');

        }catch(\Exception $e){
            dd($e->getMessage());
            Log::error('Error updating purchase: ' . $e->getMessage());

            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Something went wrong while updating the purchase.']);
            }
        }



        public function destroy(string $id){
            $prosthesis_case = ProsthesisCase::findOrFail($id);
            $prosthesis_case->delete();

            return redirect()->route('prosthesis-case.index')->with("success", "Case deleted successfully.");
        }



        public function generateInvoice(ProsthesisCase $prosthesis_case)
        {
            // Eager load the necessary relationships
            $prosthesis_case->load(['doctor', 'patient', 'technician', 'caseItems.service']);

            // Create or find the invoice record
            $invoice = CaseInvoice::firstOrCreate(
                ['prosthesis_case_id' => $prosthesis_case->id], // Condition to find the invoice
                [ // Data to use only when creating a new invoice
                    'invoice_number' => 'INV-' . now()->format('Ymd') . "-" . $prosthesis_case->id, // A more unique number
                    'total_amount' => $prosthesis_case->total_cost,
                    'tva_amount' => $prosthesis_case->total_cost * (CaseInvoice::$TVA / 100),
                    'discount_amount' => $prosthesis_case->total_cost * (CaseInvoice::$DISCOUNT / 100),
                    'net_amount' => $prosthesis_case->total_cost
                        - ($prosthesis_case->total_cost * (CaseInvoice::$DISCOUNT / 100))
                        - ($prosthesis_case->total_cost * (CaseInvoice::$TVA / 100)),
                    'invoice_date' => now()->toDateString(),
                    'status' => 'draft',
                    'payment_status' => 'unpaid',
                ]
            );

            // Pass both the case and the invoice data to the view
            $pdf = Pdf::loadView('Pdf.InvoiceCase', [
                'prosthesis_case' => $prosthesis_case,
                'invoice' => $invoice, // ✅ Uncommented this line
            ]);

            $fileName = $invoice->invoice_number . '.pdf';

            // Let Spatie Media Library handle the file directly from the PDF stream
            // This avoids creating and then deleting a temporary file, which is safer and cleaner.
                // ✅ CLEAR THE COLLECTION FIRST
            // This deletes any old invoice PDFs associated with this record.
            $invoice->clearMediaCollection('invoice');


            $invoice->addMediaFromString($pdf->output())
                    ->usingFileName($invoice->invoice_number . '.pdf')
                    ->toMediaCollection('invoice', 'public'); // Specify the disk if needed

            // Redirect with a success message
            return redirect()->route('invoices.index')->with(['success' => 'Invoice generated successfully.']);
        }



        public function downloadInvoice($case_invoice){
            $invoice = CaseInvoice::findOrFail($case_invoice);
            // dd($invoice);
            $media = $invoice->getFirstMedia('invoice');
            if (! $media) abort(404);
            return response()->download($media->getPath(), $media->file_name);
        }






    }


// array:9 [▼ // app/Http/Controllers/Admin/Case/CaseController.php:164
//   "id" => 6
//   "patient_id" => "1"
//   "doctor_id" => "1"
//   "technician_id" => "2"
//   "assistant" => "RaY"
//   "description" => "Gouttier BLM HAut Bas"
//   "status" => "pending"
//   "delivered_date" => null
//   "case_items" => array:1 [▼
//     0 => array:7 [▼
//       "service_id" => "1"
//       "tooth_number" => null
//       "shade" => "2m2"
//       "disk_type" => null
//       "quantity" => "1"
//       "unit_price" => "10000.00"
//       "status" => "pending"
//     ]
//   ]
// ]
