<?php

namespace App\Exports;

use App\Models\CaseInvoice;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoiceExport implements FromCollection , WithHeadings
{

    protected $filters;

    public function __construct(array $filters)
    {
        $this->filters = $filters;
    }


    public function headings(): array {
        return [
                'Invoice Number',
                'Invoice Date',
                'Total Amount',
                'Status',
                'Payment Status',
        ];
    }


    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = CaseInvoice::query();

        if (!empty($this->filters['doctor_id'])) {
            $query->where('doctor_id', $this->filters['doctor_id']);
        }

        if (!empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['amount_min']) && !empty($this->filters['amount_max'])) {
            $query->whereBetween('total_amount', [
                (float)$this->filters['amount_min'],
                (float)$this->filters['amount_max']
            ]);
        }

        if (!empty($this->filters['date_from']) && !empty($this->filters['date_to'])) {
            $query->whereBetween('invoice_date', [$this->filters['date_from'], $this->filters['date_to']]);
        }


        return $query->get([
            'invoice_number',
            'invoice_date',
            'total_amount',
            'status',
            'payment_status'
        ]);

    }
}
