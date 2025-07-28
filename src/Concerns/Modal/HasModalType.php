<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use Filament\Support\Enums\Width;

trait HasSlideOverModal
{
    protected  bool $isSlideOver = false;

    public function slideOver(bool | Closure $enabled = true): self
    {
        $this->isSlideOver = $enabled;

        return $this;
    }

    public function isSlideOver(): bool
    {
        return $this->isSlideOver;
    }
}
