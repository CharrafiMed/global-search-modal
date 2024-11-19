<?php

namespace CharrafiMed\GlobalSearchModal\Livewire;

use Livewire\Component;
use Filament\Facades\Filament;
use Livewire\Attributes\Computed;
use Illuminate\Support\Collection;
use Illuminate\Contracts\View\View;
use Filament\GlobalSearch\GlobalSearchResult;
use Filament\GlobalSearch\GlobalSearchResults;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;

class GlobalSearchModal extends Component
{
    public ?string $search = '';

    #[Computed()]
    public function getConfigs()
    {
        return filament('global-search-modal');
    }

    #[Computed()]
    public function getPanelId()
    {
        return filament()->getCurrentPanel()->getId();
    }


    public function getResults(): ?GlobalSearchResults
    {
        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        // Early return if the search is empty
        $search = trim($this->search);
        if (empty($search)) {
            return GlobalSearchResults::make();
        }

        $results = Filament::getGlobalSearchProvider()->getResults($search);

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
        return Filament::getTenant() || auth()->check();
    }

    public function render(): View
    {
        return view('global-search-modal::components.dialog', [
            'results' => $this->getResults(),
        ]);
    }
}
