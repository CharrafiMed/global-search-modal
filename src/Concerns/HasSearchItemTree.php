<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\Customization\Position;
use Closure;

trait HasSearchItemTree

{
    public  bool $searchItemTree = true;


    public  function searchItemTree(bool $enabled = true): self
    {
        $this->searchItemTree = $enabled;
        return $this;
    }

    public  function hasSearchItemTree(): bool
    {
        return $this->searchItemTree;
    }
}
