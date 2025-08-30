<?php

namespace CharrafiMed\GlobalSearchModal\Pages;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;

#[AllowDynamicProperties]
class GlobalSearch
{
    public static function search(string $query): ?GlobalSearchResults
    {
        $builder = GlobalSearchResults::make();

        foreach (Filament::getResources() as $resource) {
            if (! $resource::canGloballySearch()) {
                continue;
            }

            $resourceResults = $resource::getGlobalSearchResults($query);

            if (! $resourceResults->count()) {
                continue;
            }

            $builder->category($resource::getPluralModelLabel(), $resourceResults);
        }

        return $builder;
    }
}
