<?php

namespace CharrafiMed\GlobalSearchModal\Contracts;

use Illuminate\Database\Eloquent\Model;

interface Searchable
{
    public static function getGlobalSearchResultTitle(): string;
    public static function getGlobalSearchResultUrl(): string;
    // public static function getGloballySearchableAttributes(): array;
    // public static function getGlobalSearchResultDetails(): array;
    // public static function getGlobalSearchResultActions(Model $record): array;
}
