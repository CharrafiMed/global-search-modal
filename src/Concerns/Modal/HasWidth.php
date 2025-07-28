<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Filament\Support\Enums\Width;

trait HasWidth
{
    protected ?Width $maxWidth = null;

    public function width(Width $width): self
    {
        $this->maxWidth = $width;
        return $this;
    }
    public function getWidth(): Width | string | null
    {
        return $this->maxWidth;
    }
}
