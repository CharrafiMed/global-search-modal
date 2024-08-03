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
        if (is_null($max)) {
            throw new InvalidArgumentException("max items allowed must be not null, {$max} given");
        }
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
