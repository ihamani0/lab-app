<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $prosthesis_case->case_number }}</title>
    <style>
        @page {
            margin: 40px;
        }

        body {
            font-family: helvetica, sans-serif;
            font-size: 12px;
            color: #333;
            background-color: #f9f9fb;
            padding: 20px;
            box-sizing: border-box;
        }

        .invoice-container {
            background: white;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eaeef5;
        }

        .logo-section {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .logo-section img {
            height: 60px;
            margin-bottom: 8px;
        }

        .invoice-title {
            font-size: 24px;
            font-weight: 700;
            color: #2563eb;
            margin: 0;
            letter-spacing: -0.5px;
        }

        .contact-info {
            font-size: 11px;
            line-height: 1.5;
            text-align: right;
            color: #555;
        }

        .contact-info p {
            margin: 2px 0;
        }

        /* Info Table */
        .info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 25px;
        }

        .info-item {
            display: flex;
            flex-direction: column;
        }

        .info-label {
            font-weight: 600;
            color: #4b5563;
            font-size: 11px;
            margin-bottom: 4px;
        }

        .info-value {
            font-size: 12px;
            color: #1f2937;
        }

        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
        }

        .items-table th {
            background-color: #f1f5f9;
            color: #374151;
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
        }

        .items-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e2e8f0;
            color: #4b5563;
        }

        .items-table tr:last-child td {
            border-bottom: none;
        }

        /* Totals */
        .totals {
            max-width: 300px;
            margin-left: auto;
            margin-top: 20px;
        }

        .totals table {
            width: 100%;
            border-collapse: collapse;
        }

        .totals td {
            padding: 8px 12px;
            border: 1px solid #e2e8f0;
        }

        .totals .label {
            font-weight: 600;
            background-color: #f8fafc;
            color: #374151;
            width: 60%;
        }

        .totals .value {
            text-align: right;
            font-weight: 500;
        }

        /* Footer */
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            padding-top: 15px;
            border-top: 1px solid #eaeef5;
        }

        /* Print adjustments */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .invoice-container {
                box-shadow: none;
                padding: 20px;
            }
        }
    </style>
</head>
<body>

<div class="invoice-container">

    <div class="header">
        <div class="logo-section">
            <img src="{{ asset('assets/placeholder.png') }}" alt="Lab Logo">
            <h1 class="invoice-title">INVOICE</h1>
        </div>
        <div class="contact-info">
            <p>Email: lab@example.com</p>
            <p>Phone: +213 XX XX XX XX</p>
            <p>Address: Algiers, Algeria</p>
        </div>
    </div>

    <div class="info-grid">
        <div class="info-item">
            <span class="info-label">Invoice Number</span>
            <span class="info-value">{{ $prosthesis_case->case_number }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Date Received</span>
            <span class="info-value">{{ $prosthesis_case->received_date }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Doctor</span>
            <span class="info-value">{{ $prosthesis_case->doctor->name ?? '-' }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Patient</span>
            <span class="info-value">{{ $prosthesis_case->patient->name ?? '-' }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Technician</span>
            <span class="info-value">{{ $prosthesis_case->technician->name ?? 'N/A' }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Assistant</span>
            <span class="info-value">{{ $prosthesis_case->assistant ?? '-' }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Status</span>
            <span class="info-value">{{ ucfirst($prosthesis_case->status) }}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Payment Status</span>
            <span class="info-value">{{ ucfirst($prosthesis_case->payment_status) }}</span>
        </div>
    </div>

    <table class="items-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Service</th>
                <th>Tooth #</th>
                <th>Shade</th>
                <th>Disk Type</th>
                <th>Qty</th>
                <th>Unit Price (DZD)</th>
                <th>Total (DZD)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($prosthesis_case->caseItems as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item->service->name ?? '-' }}</td>
                    <td>{{ $item->tooth_number ?? '-' }}</td>
                    <td>{{ $item->shade ?? '-' }}</td>
                    <td>{{ $item->disk_type ?? '-' }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($item->unit_price, 2) }}</td>
                    <td>{{ number_format($item->quantity * $item->unit_price, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr>
                <td class="label">Subtotal</td>
                <td class="value">{{ number_format($prosthesis_case->total_cost, 2) }} DZD</td>
            </tr>
            <tr>
                <td class="label">Paid</td>
                <td class="value">{{ number_format($prosthesis_case->paid_amount, 2) }} DZD</td>
            </tr>
            <tr>
                <td class="label">Balance Due</td>
                <td class="value">{{ number_format($prosthesis_case->total_cost - $prosthesis_case->paid_amount, 2) }} DZD</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p>Thank you for your trust! — {{ config('app.name') }} Dental Laboratory</p>
    </div>

</div>

</body>
</html>
