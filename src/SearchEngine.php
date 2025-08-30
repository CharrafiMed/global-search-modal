<?php

namespace CharrafiMed\GlobalSearchModal;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Support\Facades\Auth;

#[AllowDynamicProperties]
class SearchEngine
{
    public function getConfigs(): GlobalSearchModalPlugin
    {
        return filament()->getPlugin('global-search-modal');
    }

    public function search(string $query): ?GlobalSearchResults
    {
        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        $search = trim($query);

        if (empty($search)) {
            return GlobalSearchResults::make();
        }

        $builder = Filament::getGlobalSearchProvider()->getResults($search);

        // Add custom pages search results
        $this->addCustomPagesResults($builder, $query);

        if (!$builder || !$this->getConfigs()->isMustHighlightQueryMatches()) {
            return $builder;
        }

        // Apply highlighting to search results
        return $this->highlightResults($builder, $search);
    }

    protected function addCustomPagesResults(GlobalSearchResults $builder, string $query): void
    {
        if (!$this->getConfigs()->isCustomPagesAreSearchable()) {
            return;
        }

        foreach (Filament::getPages() as $page) {
            $this->processSearchableItem($builder, $page, $query);
        }
    }

    protected function processSearchableItem(GlobalSearchResults $builder, string $item, string $query): void
    {
        if (!$this->isSearchable($item)) {
            return;
        }

        if (!$this->canGloballySearch($item)) {
            return;
        }

        $results = $this->getSearchResults($item, $query);

        if (!$results->count()) {
            return;
        }

        $builder->category(
            name: $this->getGroupName($item),
            results: $results
        );
    }

    protected function isSearchable(string $item): bool
    {
        return is_subclass_of($item, Searchable::class);
    }

    protected function canGloballySearch(string $item): bool
    {
        if (!method_exists($item, 'canGloballySearch')) {
            return true;
        }

        return $item::canGloballySearch();
    }

    protected function getSearchResults(string $item, string $query)
    {
        return $item::getGlobalSearchResults($query);
    }

    protected function getGroupName(string $item): string
    {
        return $item::getGlobalSearchGroupName();
    }

    protected function highlightResults(GlobalSearchResults $builder, string $search): GlobalSearchResults
    {
        $classes = $this->getConfigs()->getHighlightQueryClasses() ?? 'text-primary-500 font-semibold hover:underline';
        $styles = $this->getConfigs()->getHighlightQueryStyles() ?? '';

        foreach ($builder->getCategories() as &$categoryResults) {
            foreach ($categoryResults as &$result) {
                $result->highlightedTitle = Highlighter::make(
                    text: $result->title,
                    pattern: $search,
                    styles: $styles,
                    classes: $classes
                );
            }
        }
        return $builder;
    }

    protected function hasTenantOrIsAuthenticated(): bool
    {
        return Filament::getTenant() || Auth::check();
    }
}