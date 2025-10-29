<?php


namespace App\Exports;

use Barryvdh\DomPDF\Facade\Pdf;

class PdfExporter {


    public static function Download($view , $filename, $data){
        $pdf = Pdf::loadView($view , ['consumptions' => $data]);
        return $pdf->download($filename);
    }
}
