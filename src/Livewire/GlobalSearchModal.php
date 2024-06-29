<?php

namespace CharrafiMed\GlobalSearchModal\Livewire;

use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Filament\Panel;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class GlobalSearchModal extends Component
{
    public ?string $search = '';

    public function getResults(): ?GlobalSearchResults
    {
        $search = trim($this->search);

        if (blank($search)) {
            return null;
        }

        $results = Filament::getGlobalSearchProvider()->getResults($this->search);

        if ($results === null) {
            return $results;
        }

        return $results;
    }

    public function render(): View
    {
        // dd(GlobalSearchModalPlugin::make()->extractPublicMethods());
        return view('global-search-modal::components.dialog', [
            'results' => $this->getResults(),
        ]);
    }
}
