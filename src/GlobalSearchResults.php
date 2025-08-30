<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\GlobalSearch\GlobalSearchResults as BaseGlobalSearchResults;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;

class GlobalSearchResults extends BaseGlobalSearchResults
{
    public function sort(array $sortOrder): static
    {
        if (empty($sortOrder)) {
            return $this;
        }

        $sortedCategories = Collection::make();

        foreach ($sortOrder as $name) {
            if ($this->categories->has($name)) {
                $sortedCategories[$name] = $this->categories[$name];
            }
        }

        foreach ($this->categories as $name => $results) {
            if (!$sortedCategories->has($name)) {
                $sortedCategories[$name] = $results;
            }
        }

        $this->categories = $sortedCategories;

        return $this;
    }

    public function merge(GlobalSearchResults $results): static
    {
        // I intentionally use array instead of collection for performence concerns (at least here dude)
        $incomingCategories = $results->getCategories();

        if ($incomingCategories->isEmpty()) {
            return $this;
        }

        foreach ($incomingCategories as $name => $results) {
            if (empty($results)) {
                continue;
            }

            if ($this->categories->has($name)) {

                $existingResults = $this->categories[$name];

                if (is_array($existingResults) && is_array($results)) {
                    $this->categories[$name] = array_merge($existingResults, $results);
                } else {
                    // Fallback to collection merge for mixed types
                    $this->categories[$name] = collect($existingResults)->merge($results)->all();
                }
            } else {
                $this->categories[$name] = $results;
            }
        }

        return $this;
    }

    public function count()
    {
        return $this->categories->sum(function ($categoryResults) {
            return $categoryResults->count();
        });
    }
}
