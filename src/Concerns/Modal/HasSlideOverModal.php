<?php

namespace CharrafiMed\GlobalSearchModal\Concerns\Modal;

use Closure;
use Filament\Support\Enums\Width;

trait HasSlideOverModal
{
    protected bool $isSlideOver = false;

    public function isSlideOver(): bool
    {
        return $this->isSlideOver;
    }
}
