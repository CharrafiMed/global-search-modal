<?php

namespace CharrafiMed\GlobalSearchModal\Livewire;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use CharrafiMed\GlobalSearchModal\SearchManager;
use Livewire\Component;
use Filament\Facades\Filament;
use Livewire\Attributes\Computed;
use Illuminate\Contracts\View\View;
use Filament\GlobalSearch\GlobalSearchResults;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Illuminate\Support\Facades\Auth;

class GlobalSearchModal extends Component
{
    public ?string $search = '';

    #[Computed()]
    public function getConfigs(): GlobalSearchModalPlugin
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
        return app(SearchManager::class)->search($this->search);
    }



    public function render(): View
    {
        return view('global-search-modal::components.global-search-modal', [
            'results' => $this->getResults(),
        ]);
    }
}
