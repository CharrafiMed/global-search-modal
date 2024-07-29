<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use InvalidArgumentException;


trait CanInteractWithLocalStorage

{
    public  ?int $maxItemsAllowed = null;


    public function localStorageMaxItemsAllowed(int | Closure  $max): self
    {
        if (is_null($max)) {
            throw new InvalidArgumentException("max items allowed must be not null, {$max} given");
        }
        $this->maxItemsAllowed = $max;
        return $this;
    }

    public  function getMaxItemsAllowed(): ?int
    {
        return $this->maxItemsAllowed;
    }
}
