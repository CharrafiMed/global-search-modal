<?php

namespace CharrafiMed\GlobalSearchModal;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Computed;

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

        dd(Filament::getPages());

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
