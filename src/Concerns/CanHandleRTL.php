<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;

trait CanHandleRTL
{
    public bool $isRTL = false;

    public function RTL(bool | Closure | null $condition)
    {
        $this->isRTL = $condition;
        return $this;
    }

    public function getRTL(): bool
    {
        return $this->isRTL;
    }
}
