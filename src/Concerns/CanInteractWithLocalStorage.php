<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;


trait CanInteractWithLocalStorage

{
    public  ?int $maxItemsAllowed = null;


    public function localStorageMaxItemsAllowed(int $max): self
    {
        $this->maxItemsAllowed = $max;
        return $this;
    }

    public  function getMaxItemsAllowed(): ?int
    {
        return $this->maxItemsAllowed;
    }
}
