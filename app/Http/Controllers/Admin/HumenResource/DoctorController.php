<?php

namespace App\Http\Controllers\Admin\HumenResource;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Doctor::query();

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }

        $doctors = $query->orderBy('id', 'desc')
                                ->paginate(10)
                                    ->appends($request->only('search'))
                                        ->through(fn ($doctor) => [
                                            'id'     => $doctor->id,
                                            'name'   => $doctor->name,
                                            'address' => $doctor->address,
                                            'phone' => $doctor->phone,
                                            'email' => $doctor->email,
                                            'cabine' => $doctor->cabine,
                                            'create' => $doctor->created_at->format('d/m/Y'),
                                            'update' => $doctor->updated_at ? $doctor->updated_at->format('d/m/Y') : null,
                                        ]);

         return Inertia::render('Doctor/doctor' , [ "doctors" => $doctors ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('doctors', 'name'),
             ],
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'cabine' => 'nullable|string|max:255',
]);

        Doctor::create($validated);

        return redirect()->route('doctors.index')->with('success', 'Doctors created successfully.');
    }




    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctor $doctor)
    {
        $validated = $request->validate([
        'name' => [
            'required',
            'string',
            'max:255',
            Rule::unique('doctors', 'name')->ignore($doctor->id), // ✅ Ignore current doctor
        ],
        'phone' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'address' => 'nullable|string|max:255',
        'cabine' => 'nullable|string|max:255',
    ]);

    $doctor->update($validated);

    return redirect()->back()->with('success', 'Doctors updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();

        return redirect()->route('doctors.index')->with("success", "Doctor deleted successfully.");
    }
}
