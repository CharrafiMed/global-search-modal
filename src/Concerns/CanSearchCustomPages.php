<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use InvalidArgumentException;


trait CanSearchCustomPages

{
    public bool $searchCustomPages = false;

    public function searchCustomPages()
    {
        $this->searchCustomPages = true;
        return $this;
    }

    public function isCustomPagesAreSearchable(): bool
    {
        return $this->searchCustomPages;
    }
}
