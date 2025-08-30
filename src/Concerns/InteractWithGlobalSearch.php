<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait InteractWithGlobalSearch {
        public static function getGlobalSearchResultTitle(): string;
    public static function getGlobalSearchResultUrl(?Model $record = null): string;
    public static function getGloballySearchableAttributes(): array;
    public static function getGlobalSearchResultDetails(?Model $record = null): array;
    public static function getGlobalSearchResultActions(Model $record): array;
}
