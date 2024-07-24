<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Filament\Support\Enums\MaxWidth;

trait HasMaxWidth
{
    protected ?MaxWidth $maxWidth = null;
    public function maxWidth(MaxWidth $width): self
    {
        $this->maxWidth = $width;
        return $this;
    }
    public function getMaxWidth(): MaxWidth | string | null
    {
        return $this->maxWidth;
    }
}
