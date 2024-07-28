<?php
namespace CharrafiMed\GlobalSearchModal\Livewire;

use Livewire\Component;
use Filament\Facades\Filament;
use Illuminate\Contracts\View\View;
use CharrafiMed\GlobalSearchModal\Utils\KMP;
use Filament\GlobalSearch\GlobalSearchResults;
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

class GlobalSearchModal extends Component
{
    public ?string $search = '';

    public function getConfigs()
    {
        return filament('global-search-modal');
    }

    public function highlightMatchingLetter($result, $query, $classes = "text-primary-600", $styles = "")
    {
        if (blank($query)) return $result;

        $matches = KMP::search($result, $query);

        $highlightedTitle = "";
        $lastIndex = 0;
        $queryLength = strlen($query);

        foreach ($matches as $matchIndex) {
            $highlightedTitle .= substr($result, $lastIndex, $matchIndex - $lastIndex);
            $highlightedTitle .= '<span class="' . $classes . '" style="' . $styles . '">' . substr($result, $matchIndex, $queryLength) . '</span>';
            $lastIndex = $matchIndex + $queryLength;
        }

        $highlightedTitle .= substr($result, $lastIndex);
        return $highlightedTitle;
    }

    public function getResults(): ?GlobalSearchResults
    {
        $search = trim($this->search);

        if (blank($search)) {
            return null;
        }

        $results = Filament::getGlobalSearchProvider()->getResults($this->search);
        foreach ($results->getCategories() as &$categoryResults) {
            foreach ($categoryResults as &$result) {
                $result->highlightedTitle = $this->highlightMatchingLetter($result->title, $this->search);
            }
        }

        if (is_null($results)) {
            return null;
        }

        return $results;
    }

    public function getTopPosition()
    {
        return $this->topPosition;
    }

    public function render(): View
    {
        return view('global-search-modal::components.dialog', [
            'results' => $this->getResults(),
        ]);
    }
}
