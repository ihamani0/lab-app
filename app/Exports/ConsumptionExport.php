<?php

namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Facades\Excel;

class ConsumptionExport implements FromCollection , WithHeadings{


    private $data;

    public function __construct($data)
    {
        $this->data = $data;
    }


    public function collection()
    {
        return collect($this->data);
    }
    public function headings(): array
    {
        return ['Material', 'Total Quantity', 'Total Cost', 'Average Unit Cost'];
    }


    public static function download($filename, $data)
    {
        return Excel::download(new self($data), $filename);
    }
}
