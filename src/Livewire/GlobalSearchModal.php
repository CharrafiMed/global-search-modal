<?php

namespace CharrafiMed\GlobalSearchModal\Livewire;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use CharrafiMed\GlobalSearchModal\SearchEngine;
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
        return filament()->getPlugin('global-search-modal');
    }

    #[Computed()]
    public function getPanelId(): string
    {
        return filament()->getCurrentPanel()->getId();
    }


    public function getResults(): ?GlobalSearchResults
    {
        return app(SearchEngine::class)->search($this->search);
    }



    public function render(): View
    {
        return view('global-search-modal::components.global-search-modal', [
            'results' => $this->getResults(),
        ]);
    }
}
