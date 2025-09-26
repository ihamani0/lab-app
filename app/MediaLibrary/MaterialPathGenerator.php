<?php

namespace App\MediaLibrary;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\DefaultPathGenerator;

class MaterialPathGenerator extends DefaultPathGenerator
{
    public function getPath(Media $media): string
    {
        // Each collection in its own subfolder under "material"
        return match ($media->collection_name) {
            'images'   => "material/images/{$media->id}/",
            'barcodes' => "material/barcodes/{$media->id}/",
            'qrcodes'  => "material/qrcodes/{$media->id}/",
            default    => "material/other/{$media->id}/",
        };
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media) . 'conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media) . 'responsive/';
    }
}
