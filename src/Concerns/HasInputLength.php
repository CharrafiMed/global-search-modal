<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait HasInputLength
{
    public  ?int $maxlength = null;


    public  function searchInputMaxLength(?int $length ): self
    {
        $this->maxlength = $length;
        return $this;
    }

    public  function getSearchInputMaxLength(): ?int
    {
        return $this->maxlength;
    }
}
