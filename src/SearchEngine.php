<?php

namespace CharrafiMed\GlobalSearchModal;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Support\Facades\Auth;
use CharrafiMed\GlobalSearchModal\Pages;
use CharrafiMed\GlobalSearchModal\Resources;
use Illuminate\Support\Collection;

#[AllowDynamicProperties]
class SearchEngine
{
    private ?GlobalSearchModalPlugin $plugin = null;

    public function __construct()
    {
        $this->plugin = filament()->getPlugin('global-search-modal');
    }


    public function search(string $query): ?GlobalSearchResults
    {

        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        $query = trim($query);

        if (empty($query)) {
            return GlobalSearchResults::make();
        }

        // Handle custom search that doesn't merge with core
        if ($this->plugin->hasCustomSearch() && !$this->plugin->mergesWithCore()) {

            $customResults = $this->plugin->executeSearchCallback($query);

            return $this->applyHighlightingIfNeeded($customResults, $query);
        }

        // Build merged results
        $builder = GlobalSearchResults::make();

        // Add custom search results if merging with core
        if ($this->plugin->hasCustomSearch() && $this->plugin->mergesWithCore()) {
            $builder->merge($this->plugin->executeSearchCallback($query));
        }

        // Add core resource results
        $builder->merge(Resources\GlobalSearch::search($query));

        // Add custom pages results
        if ($this->plugin->isCustomPagesAreSearchable()) {
            $builder->merge(Pages\GlobalSearch::search($query));
        }
        
        if($this->plugin->isSortable()){
            $builder->sort($this->plugin->getSort());
        }

        return $this->applyHighlightingIfNeeded($builder, $query);
    }

    protected function applyHighlightingIfNeeded(GlobalSearchResults $results, string $query): GlobalSearchResults
    {
        if (!$this->plugin->isMustHighlightQueryMatches()) {
            return $results;
        }

        return $this->highlightResults($results, $query);
    }

    protected function highlightResults(GlobalSearchResults $builder, string $query): GlobalSearchResults
    {
        $classes = $this->plugin->getHighlightQueryClasses() ?? 'text-primary-500 font-semibold hover:underline';
        $styles = $this->plugin->getHighlightQueryStyles() ?? '';

        foreach ($builder->getCategories() as $categoryName => $categoryResults) {
            $highlightedResults = collect($categoryResults)->map(function ($result) use ($query, $classes, $styles) {
                $result->highlightedTitle = Highlighter::make(
                    text: $result->title,
                    pattern: $query,
                    styles: $styles,
                    classes: $classes
                );

                return $result;
            });

            $builder->category(name: $categoryName, results: $highlightedResults);
        }

        return $builder;
    }

    protected function hasTenantOrIsAuthenticated(): bool
    {
        return Filament::getTenant() || Auth::check();
    }
}
