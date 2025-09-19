<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\DoctorResource;
use App\Http\Controllers\Controller;
use App\Http\Resources\PatientResource;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;
use \Inertia\Inertia;


class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Patient::query();

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }

        $patients = $query->with('doctor')
                            ->orderBy('id', 'desc')
                                ->paginate(10)
                                    ->appends($request->only('search'))
                                        ->through(fn ($patient) => [
                                            'id'     => $patient->id,
                                            'name'   => $patient->name,
                                            'address' => $patient->address,
                                            'phone' => $patient->phone,
                                            'doctor' => $patient->doctor ? [
                                                'id'   => $patient->doctor->id,
                                                'name' => $patient->doctor->name,
                                            ] : null,
                                            'create' => $patient->created_at->format('d/m/Y'),
                                            'update' => $patient->update_at ? $patient->update_at->format('d/m/Y') : null,
                                        ]);



         return Inertia::render('Patient/patient', [
                    'doctors' => DoctorResource::collection(Doctor::all()),
                    'patients' => $patients,
                    'filters'  => $request->only('search'),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'doctor_id' => 'required|integer'
        ]);

        Patient::create($validated);

        return redirect()->route('patients.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'doctor_id' => 'nullable|exists:doctors,id',
        ]);

        $patient->update($validated);

        return redirect()->back()->with('success', 'Patient updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();

        return redirect()->route('patients.index');
    }
}
