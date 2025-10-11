<?php

namespace App\Http\Controllers\Admin\Prosthesis;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    //
    public function index()
    {
        $services = Service::query()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Services/ServiceIndex', [
            'services' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        $validated["service_number"] = 'SRV-' . strtoupper(uniqid());
        Service::create($validated);

        return redirect()->route('prosthesis-service.index')->with('success', 'Service created successfully.');
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
