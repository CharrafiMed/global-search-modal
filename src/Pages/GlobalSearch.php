<?php

namespace CharrafiMed\GlobalSearchModal\Pages;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;

#[AllowDynamicProperties]
class GlobalSearch
{
    public static function search(&$builder, string $query): ?GlobalSearchResults
    {

        // $builder = GlobalSearchResults::make();

        foreach (Filament::getPages() as $page) {
            if (is_subclass_of($page, Searchable::class)) {

                if (method_exists($page, 'canGloballySearch') && (!$page::canGloballySearch())) {
                    continue;
                }

                $pageResults = $page::getGlobalSearchResults($query);

                if (! $pageResults->count()) {
                    continue;
                }

                $builder->category(
                    name: $page::getGlobalSearchGroupName(),
                    results: $pageResults
                );
            };
        }

        return $builder;
    }
}
