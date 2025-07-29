<?php

namespace CharrafiMed\GlobalSearchModal\Concerns\Modal;

use Filament\Support\Enums\Width;

trait HasWidth
{
    protected ?Width $width = null;

    public function getWidth(): Width | string | null
    {
        return $this->width;
    }
}
