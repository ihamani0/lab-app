<?php

namespace App\Http\Controllers\Admin\HumenResource;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Doctor::query()->with('user');

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }

        $doctors = $query->orderBy('id', 'desc')
                    ->paginate($request->get('per_page', 15))
                    ->appends($request->only('search'))
                    ->through(fn ($doctor) => [
                    'id'     => $doctor->id,
                    'name'   => $doctor->name,
                    'address' => $doctor->address,
                    'phone' => $doctor->phone,
                    'email' => $doctor->email,
                    'cabine' => $doctor->cabine,

                    'user' => [
                        'id' => $doctor->user->id,
                        'email' => $doctor->user->email,
                        'is_active' => $doctor->user->is_active,
                    ],
                    'specialty' => $doctor->specialty,
                    'in_clinic' => $doctor->in_clinic,

                    'create' => $doctor->created_at->format('d/m/Y'),
                    'update' => $doctor->updated_at ? $doctor->updated_at->format('d/m/Y') : null,
                ]);

         return Inertia::render('HumanResource/Doctor/doctor' ,
         [
            "doctors" => $doctors ,
            'filters' => $request->only(['search' , 'per_page'])
        ]);
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
            'email' => 'required|email|max:255',
            'address' => 'nullable|string|max:255',
            'cabine' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'in_clinic' => 'required|boolean',
        ]);


        // 2. Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('ChangeMe123@'),
            'is_active' => false,
        ]);


         $user->assignRole('doctor');

        Doctor::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'cabine' => $validated['cabine'] ?? null,
            'in_clinic' => $validated['in_clinic'],
            'specialty' => $validated['specialty'],

        ]);

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
            Rule::unique('doctors', 'name')->ignore($doctor->id),
            Rule::unique('users', 'name')->ignore($doctor->user->id), // ✅ Ignore current doctor
        ],
        'phone' => 'nullable|string|max:255',
        'email' => ['required','email','max:255' , Rule::unique('users', 'email')->ignore($doctor->user->id),],
        'address' => 'nullable|string|max:255',
        'cabine' => 'nullable|string|max:255',
        'specialty' => 'nullable|string|max:255',
        'in_clinic' => 'required|boolean',


    ]);

    $doctor->user->update([
        'name' => $validated['name'],
        'email' => $validated['email'],
    ]);

    $doctor->update([
        'name' => $validated['name'],
        'phone' => $validated['phone'] ?? null,
        'address' => $validated['address'] ?? null,
        'cabine' => $validated['cabine'] ?? null,
        'in_clinic' => $validated['in_clinic'] === true,
        'specialty' => $validated['specialty'],
    ]);

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


        /*
    * Toggle active status of a user
    */
    public function toggleActive(string $id)
    {
            $doctor = Doctor::findOrFail($id)->user;


            if (! $doctor->hasRole('doctor')) {
                abort(403);
            }

            $doctor->is_active = ! $doctor->is_active;
            $doctor->suspended_at = $doctor->is_active ? null : now();
            $doctor->save();

            return redirect()->back()->with('success', 'Doctor status updated');
    }
}
