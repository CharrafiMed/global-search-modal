<?php

namespace CharrafiMed\GlobalSearchModal\Resources;

use CharrafiMed\GlobalSearchModal\GlobalSearchResults;
use Filament\Facades\Filament;

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
