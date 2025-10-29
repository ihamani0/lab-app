<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Consumption Report</title>
    <style>
        table { width:100%; border-collapse: collapse; }
        th, td { border:1px solid #333; padding:8px; text-align:left; }
        th { background:#f5f5f5; }
    </style>
</head>
<body>
    <h3>Consumption Report</h3>
    <table>
        <thead>
            <tr>
                <th>Material</th>
                <th>Total Quantity</th>
                <th>Total Cost</th>
                <th>Avg Unit Cost</th>
            </tr>
        </thead>
        <tbody>
            @foreach($consumptions as $row)
            <tr>
                <td>{{ $row->material_name }}</td>
                <td>{{ $row->total_qty }}</td>
                <td>{{ number_format($row->total_cost, 2) }}</td>
                <td>{{ number_format($row->avg_cost, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
