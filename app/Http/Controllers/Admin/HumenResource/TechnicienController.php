<?php

namespace App\Http\Controllers\Admin\HumenResource;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class TechnicienController extends Controller
{
    public function index(Request $request)
    {

        $query = User::query();

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }

        //
        $techniciens  = $query->whereHas('roles' , function ($query) {
                            $query->where('name', 'technician');
                        })
                            ->orderBy('id', 'desc')
                                ->paginate(10)
                                    ->appends($request->only('search'));

        return Inertia::render('HumanResource/Technicien/technicien' , [ "techniciens" => $techniciens ]);
    }



    public function store(Request $request)
    {
        // dd($request->all());
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'is_active' => 'sometimes|boolean',
        ]);

        $password  = "12345678";

        $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($password),
        'is_active' => $data['is_active'] ?? true,
    ]);

        $user->assignRole('technician');

        //// Send credentials (you may prefer sending a password reset link instead)


        // return redirect()->route('admin.technicians.index')->with('success', 'Technician created');
        return redirect()->route('techniciens.index')->with('success', 'Technician created');

    }

        /**
     * Update the specified resource in storage.
     */
    public function update(Request $request , User $user)
    {
        $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => [
                                'required',
                                'email',
                                Rule::unique('users', 'email')->ignore($user->id),
                            ],
            ]);

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            ]);



        //// Send credentials (you may prefer sending a password reset link instead)


        return redirect()->back()->with('success', 'Technician Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('techniciens.index')->with('success', 'Technician created');
    }


    /*
    * Toggle active status of a user
    */
    public function toggleActive(string $id)
    {
            $technician = User::findOrFail($id);

            if (! $technician->hasRole('technician')) {
                abort(403);
            }

            $technician->is_active = ! $technician->is_active;
            $technician->suspended_at = $technician->is_active ? null : now();
            $technician->save();

            return redirect()->back()->with('success', 'Technician status updated');
    }

}


