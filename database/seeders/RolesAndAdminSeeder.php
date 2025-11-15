<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // --- CREATE PERMISSIONS ---

        Permission::create(['name' => 'view admin dashboard']);
        Permission::create(['name' => 'view doctor dashboard']);
        Permission::create(['name' => 'view accounting dashboard']);
        Permission::create(['name' => 'view patient dashboard']);

        // User Management Permissions
        Permission::create(['name' => 'manage users']);

        Permission::create(['name' => 'manage cases']);
        Permission::create(['name' => 'view cases']);

        Permission::create(['name' => 'manage inventory']);
        Permission::create(['name' => 'view inventory']);


        Permission::create(['name' => 'manage report']);
        Permission::create(['name' => 'view report']);

        Permission::create(['name' => 'manage patient']); // for tech and doctor

        Permission::create(['name' => 'manage appointments']);

        // For creating/editing/deleting users
        // Role Management Permission (ONLY for Super Admin)
        Permission::create(['name' => 'manage roles']);

        $techRole = Role::firstOrCreate(['name' => 'technician']);
        $techRole->givePermissionTo([
            'view admin dashboard',
            'manage patient',
            'manage cases',
            'manage users',
            'manage inventory' ,
            'manage report' ,
        ]);

        // Role: Doctor
        $doctorRole = Role::create(['name' => 'doctor']);
        $doctorRole->givePermissionTo([
            'view doctor dashboard',
            'manage patient',
            'manage cases',
            'manage appointments'
        ]);


        // Role: Accounting
        $accountingRole = Role::create(['name' => 'accounting']);
        $accountingRole->givePermissionTo([
            'view accounting dashboard'
            ,'view inventory'
            ,'view report'
        ]);

        // Role: Patient
        $patientRole = Role::create(['name' => 'patient']);
        $patientRole->givePermissionTo([
            'view patient dashboard' ,
            'manage appointments'
        ]);



        Role::firstOrCreate(['name' => 'super-admin']);
        // Role::firstOrCreate(['name' => 'comptabliy']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('ChangeMe123!'),
                'is_active' => true,
            ]
        );

        $admin->assignRole('super-admin');
        $admin->givePermissionTo(Permission::all());
        $adminBackUp = User::firstOrCreate(
            ['email' => 'admin-backup@lab.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('ChangeMe123!'),
                'is_active' => true,
            ]
        );
        $adminBackUp->assignRole('super-admin');
        $adminBackUp->givePermissionTo(Permission::all());


    }
}
