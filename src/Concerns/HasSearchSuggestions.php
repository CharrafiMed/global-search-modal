<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
//  w
trait HasSearchSuggestions

{
    public  array $suggestions = [];


    public  function suggestions(array|Closure|null $items = []): self
    {
        $this->suggestions = $items;
        return $this;
    }

    public  function getSearchSuggestions(): array
    {
        return $this->suggestions;
    }
}
