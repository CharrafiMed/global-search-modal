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
        $plugin = $this->getConfigs();

        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        $search = trim($query);

        if (empty($search)) {
            return GlobalSearchResults::make();
        }

        

        if ($plugin->hasCustomSearch() && !$plugin->mergesWithCore()) {
            return $plugin->executeSearchCallback($search);
        }

        if ($plugin->hasCustomSearch() && $plugin->mergesWithCore()) {
            $builder = $plugin->executeSearchCallback($search);
        }

        $builder = Filament::getGlobalSearchProvider()->getResults($search);

        // Add custom pages search results
        if ($plugin->isCustomPagesAreSearchable()) {
            $this->addCustomPagesResults($builder, $query);
        }

        if (!$builder || !$plugin->isMustHighlightQueryMatches()) {
            return $builder;
        }

        // Apply highlighting to search results
        return $this->highlightResults($builder, $search);
    }

    protected function addCustomPagesResults(GlobalSearchResults $builder, string $query): void
    {
        foreach (Filament::getPages() as $page) {
            $this->processSearchableItem($builder, $page, $query);
        }
    }

    protected function processSearchableItem(GlobalSearchResults $builder, string $page, string $query): void
    {
        if (!$this->isSearchable($page)) {
            return;
        }

        if (!$this->canGloballySearch($page)) {
            return;
        }

        $results = $this->getSearchResults($page, $query);

        if (!$results->count()) {
            return;
        }

        $builder->category(
            name: $this->getGroupName($page),
            results: $results
        );
    }

    protected function isSearchable(string $page): bool
    {
        return is_subclass_of($page, Searchable::class);
    }

    protected function canGloballySearch(string $page): bool
    {
        if (!method_exists($page, 'canGloballySearch')) {
            return true;
        }

        return $page::canGloballySearch();
    }

    protected function getSearchResults(string $page, string $query)
    {
        return $page::getGlobalSearchResults($query);
    }

    protected function getGroupName(string $page): string
    {
        return $page::getGlobalSearchGroupName();
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
