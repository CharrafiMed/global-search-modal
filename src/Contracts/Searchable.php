<?php

namespace CharrafiMed\GlobalSearchModal\Contracts;

use CharrafiMed\GlobalSearchModal\GlobalSearchQuery;

interface Searchable
{
    public static function getGlobalSearchResults(GlobalSearchQuery $query): array;
    public static function getGlobalSearchResultUrl(): string;
    // public static function getGloballySearchableAttributes(): array;
    // public static function getGlobalSearchResultDetails(): array;
    // public static function getGlobalSearchResultActions(Model $record): array;
}
