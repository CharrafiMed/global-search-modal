<?php

namespace CharrafiMed\GlobalSearchModal;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Exception;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Computed;
use ReflectionClass;

#[AllowDynamicProperties]
class SearchManager
{
    #[Computed()]
    public function getConfigs(): GlobalSearchModalPlugin
    {
        return filament('global-search-modal');
    }

    public  function search(string $query): ?GlobalSearchResults
    {
        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        // Early return if the search is empty
        $search = trim($query);

        if (empty($search)) {
            return GlobalSearchResults::make();
        }

        $results = Filament::getGlobalSearchProvider()->getResults($search);

        // make custom pages searchable
        foreach (Filament::getPages() as $page) {
            if (is_subclass_of($page, Searchable::class)) {

                $instance = app($page);

                $pageResults = $instance->getGlobalSearchResults($query);

                if (! $pageResults->count()) {
                    continue;
                }

                $results->category(
                    name: $instance->getGlobalSearchGroupName(),
                    results: $pageResults
                );
            };
        }

        if (!$results || !$this->getConfigs()->isMustHighlightQueryMatches()) {
            return $results;
        }

        $classes = $this->getConfigs()->getHighlightQueryClasses() ?? 'text-primary-500 font-semibold hover:underline';
        $styles = $this->getConfigs()->getHighlightQueryStyles() ?? '';

        // Apply highlighting to search results
        foreach ($results->getCategories() as &$categoryResults) {
            foreach ($categoryResults as &$result) {
                $result->highlightedTitle = Highlighter::make(
                    text: $result->title,
                    pattern: $search,
                    styles: $styles,
                    classes: $classes
                );
            }
        }
        return $results;
    }

    protected function hasTenantOrIsAuthenticated(): bool
    {
        return Filament::getTenant() || Auth::check();
    }
}
