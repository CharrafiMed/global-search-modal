<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use InvalidArgumentException;


trait CanInteractWithLocalStorage

{
    public  ?int $maxItemsAllowed = null;
    public ?bool $isRetainRecentIfFavorite = false;
    public ?bool $shouldAssociateGroups = false;


    public function localStorageMaxItemsAllowed(int | Closure  $max): self
    {
        $this->maxItemsAllowed = $max;
        return $this;
    }
    public function RetainRecentIfFavorite($enabled = false)
    {
        $this->isRetainRecentIfFavorite = $enabled;
        return $this;
    }
    public function shouldAssociateGroups()
    {
        $this->shouldAssociateGroups;
    }
    public function isRetainRecentIfFavorite()
    {
        return $this->isRetainRecentIfFavorite;
    }
    public function associateItemsWithTheirGroups()
    {
        $this->shouldAssociateGroups = true;
        return $this;
    }   
    public  function getMaxItemsAllowed(): ?int
    {
        return $this->maxItemsAllowed;
    }
}
