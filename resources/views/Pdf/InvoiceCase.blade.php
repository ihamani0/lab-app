<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice #{{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family:  sans-serif;
            background-color: #f7f8fa;
            color: #1a202c;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .invoice-container {
            max-width: 800px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 40px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
        }

        .logo-section img {
            height: 50px;
        }

        .invoice-details {
            text-align: right;
        }

        .invoice-details h1 {
            font-size: 2.25rem;
            font-weight: 700;
            color: #1a202c;
            margin: 0;
        }

        .invoice-details p {
            font-size: 0.875rem;
            color: #718096;
            margin: 4px 0 0;
        }

        .billing-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .billing-info .from,
        .billing-info .to {
            width: 48%;
        }

        .billing-info h2 {
            font-size: 0.875rem;
            font-weight: 600;
            color: #718096;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
            margin-bottom: 16px;
        }

        .billing-info p {
            margin: 0 0 4px;
            font-size: 0.875rem;
            color: #4a5568;
        }

        .invoice-items table {
            width: 100%;
            border-collapse: collapse;
        }

        .invoice-items th,
        .invoice-items td {
            padding: 12px 0;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .invoice-items th {
            font-size: 0.75rem;
            font-weight: 600;
            color: #718096;
            text-transform: uppercase;
        }

        .invoice-items td {
            font-size: 0.875rem;
            color: #4a5568;
        }

        .invoice-items .text-right {
            text-align: right;
        }

        .totals {
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
        }

        .totals table {
            width: 40%;
        }

        .totals td {
            padding: 8px;
            font-size: 0.875rem;
        }

        .totals .label {
            font-weight: 600;
            color: #4a5568;
        }

        .totals .amount {
            font-weight: 700;
            color: #1a202c;
            text-align: right;
        }

        .grand-total {
            background-color: #edf2f7;
        }

        .grand-total .label,
        .grand-total .amount {
            font-size: 1rem;
            color: #1a202c;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 0.75rem;
            color: #a0aec0;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo-section">
                <img src="{{ asset('assets/your-logo.png') }}" alt="Your Company Logo">
            </div>
            <div class="invoice-details">
                <h1>Invoice</h1>
                <p>Invoice #: {{ $invoice->invoice_number }}</p>
                <p>Date Issued: {{ $invoice->created_at->format('F j, Y') }}</p>
                <p>Date Due: {{ $invoice?->due_date?->format('F j, Y') }}</p>
            </div>
        </div>

        <div class="billing-info">
            <div class="from">
                <h2>From</h2>
                <p><strong>{{ config('app.name', 'Laravel') }}</strong></p>
                <p>123 Main Street</p>
                <p>Anytown, USA 12345</p>
                <p>contact@yourcompany.com</p>
            </div>
            <div class="to">
                <h2>To</h2>
                <p><strong>{{ $invoice->case->doctor->name ?? '-' }}</strong></p>
                {{-- <p>{{ $invoice->case->doctor->clinic_address ?? '-' }}</p> --}}
                <p>{{ $invoice->case->doctor->email ?? '-' }}</p>
            </div>
        </div>

        <div class="invoice-items">
            <table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th class="text-right">Quantity</th>
                        <th class="text-right">Unit Price</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($invoice->case->caseItems as $item)
                        <tr>
                            <td>{{ $item->service->name ?? '-' }}</td>
                            <td class="text-right">{{ $item->quantity }}</td>
                            <td class="text-right">{{ number_format($item->unit_price, 2) }} DZD</td>
                            <td class="text-right">{{ number_format($item->quantity * $item->unit_price, 2) }} DZD</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="totals">
            <table>
                <tr>
                    <td class="label">Subtotal</td>
                    <td class="amount">{{ number_format($invoice->total_amount, 2) }} DZD</td>
                </tr>
                <tr>
                    <td class="label">Tax (0%)</td>
                    <td class="amount">0.00 DZD</td>
                </tr>
                <tr class="grand-total">
                    <td class="label">Total</td>
                    <td class="amount">{{ number_format($invoice->total_amount, 2) }} DZD</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>Thank you for your business.</p>
            <p>Please contact us with any questions regarding this invoice.</p>
        </div>
    </div>
</body>
</html>
