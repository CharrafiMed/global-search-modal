<?php

namespace CharrafiMed\GlobalSearchModal\Contracts;

use CharrafiMed\GlobalSearchModal\GlobalSearchQuery;
use Illuminate\Support\Collection;

interface Searchable
{
    public static function getGlobalSearchResults(string $query): Collection|array;
    public static function getGlobalSearchResultUrl(): string;
    // public static function getGloballySearchableAttributes(): array;
    // public static function getGlobalSearchResultDetails(): array;
    // public static function getGlobalSearchResultActions(Model $record): array;
}
