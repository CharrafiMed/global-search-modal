<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;

trait HasInputLength
{
    public  int | Closure | null $maxlength = null;


    public  function searchInputMaxLength(int| Closure | null $length ): self
    {
        $this->maxlength = $length;
        return $this;
    }

    public  function getSearchInputMaxLength(): ?int
    {
        return $this->evaluate($this->maxlength);
    }
}
