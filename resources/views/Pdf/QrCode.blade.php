<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
          @page {
            margin: 0;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            font-size: 10px;
            text-align: center;
        }
        .label {
            display :flex ;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0px;
        }
    </style>
</head>
<body>
    <div class="label">
        <strong>{{ $material->name }}</strong><br>
        SKU: {{ $material->sku }}<br>
        @if($material->price)
            Price: {{ $material->price }} DA<br>
        @endif
        <img src="{{ $qrcode }}" width="100" height="100" >
    </div>
</body>
</html>
