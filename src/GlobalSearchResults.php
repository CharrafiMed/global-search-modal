<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\GlobalSearch\GlobalSearchResults as BaseGlobalSearchResults;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;

class GlobalSearchResults extends BaseGlobalSearchResults
{
    public function merge(Collection $categories)
    {
        $this->categories->merge($categories);
    }
}
