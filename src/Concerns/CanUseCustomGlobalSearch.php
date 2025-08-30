<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\GlobalSearchResults;
use Closure;

trait CanUseCustomGlobalSearch
{
    public Closure|bool $mergeWithCore = true;
    public ?Closure $searchUsingCallback = null;

    public function searchUsing(Closure $callback, bool $mergeWithCore = true)
    {
        $this->searchUsingCallback = $callback;
        $this->mergeWithCore = $mergeWithCore;
        return $this;
    }

    public function executeSearchCallback(string $query)
    {
        $callback = $this->searchUsingCallback;

        $builder = GlobalSearchResults::make();

        return $callback($query, $builder);
    }

    public function mergesWithCore()
    {
        return $this->evaluate($this->mergeWithCore);
    }

    public function hasCustomSearch(): bool
    {
        return $this->searchUsingCallback !== null;
    }
}
