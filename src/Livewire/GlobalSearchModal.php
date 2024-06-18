<?php

namespace CharrafiMed\GlobalSearchModal\Livewire;

use Filament\Panel;
use Livewire\Component;
use Filament\Facades\Filament;
use Illuminate\Contracts\View\View;
use Filament\Support\Colors\ColorManager;
use Filament\GlobalSearch\GlobalSearchResults;

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
        $colors = app(Panel::class)->getColors();
        // dd($colors);
        return view('global-search-modal::components.dialog', [
            'results' => $this->getResults(),
        ]);
    }
}
