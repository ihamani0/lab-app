<?php

namespace App\Http\Controllers\Admin\HumenResource;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class AccountingController extends Controller
{
    public function index(Request $request)
    {

        $query = User::query();

        if($request->filled('search')){
            $search = strtolower($request->search);
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
        }

        //
        $accounting  = $query->whereHas('roles' , function ($query) {
                            $query->where('name', 'accounting');
                        })
                            ->orderBy('id', 'desc')
                                ->paginate(10)
                                    ->appends($request->only('search'));

        return Inertia::render('HumanResource/Accounting/accounting' , [ "accountings" => $accounting  ,
    'filters' => $request->only('search') ]);
    }



    public function store(Request $request)
    {
        // dd($request->all());
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'is_active' => 'sometimes|boolean',
        ]);

        $password  = "ChangeMe123@";

        $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($password),
        'is_active' => $data['is_active'] ?? true,
    ]);

        $user->assignRole('accounting');

        //// Send credentials (you may prefer sending a password reset link instead)


        // return redirect()->route('admin.technicians.index')->with('success', 'Technician created');
        return redirect()->route('accounting.index')->with('success', 'Accounting created');

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


        return redirect()->back()->with('success', 'Accounting Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('accounting.index')->with('success', 'Accounting created');
    }


    /*
    * Toggle active status of a user
    */
    public function toggleActive(string $id)
    {
            $accounting = User::findOrFail($id);

            if (! $accounting->hasRole('accounting')) {
                abort(403);
            }

            $accounting->is_active = ! $accounting->is_active;
            $accounting->suspended_at = $accounting->is_active ? null : now();
            $accounting->save();

            return redirect()->back()->with('success', 'Accounting status updated');
    }

}


