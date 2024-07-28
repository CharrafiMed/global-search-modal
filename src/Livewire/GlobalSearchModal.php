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

        // Escape special HTML characters in the result to avoid XSS vulnerabilities
        $result = htmlspecialchars($result, ENT_QUOTES, 'UTF-8');

        // Lowercase both result and query to make the search case-insensitive
      

        // Get all match positions using the KMP algorithm
        $matchPositions = KMP::search($lowerQuery, $lowerResult);

        if (empty($matchPositions)) {
            return $result;
        }

        $highlightedTitle = "";
        $lastIndex = 0;
        $queryLength = strlen($query);

        foreach ($matchPositions as $index) {
            $highlightedTitle .= substr($result, $lastIndex, $index - $lastIndex);
            $highlightedTitle .= '<span class="' . $classes . '" style="' . $styles . '">' . substr($result, $index, $queryLength) . '</span>';
            $lastIndex = $index + $queryLength;
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

        if (is_null($results)) {
            return null;
        }

        foreach ($results->getCategories() as &$categoryResults) {
            foreach ($categoryResults as &$result) {
                $result->highlightedTitle = $this->highlightMatchingLetter($result->title, $this->search);
            }
        }

        return $results;
    }


    public function render(): View
    {
        return view('global-search-modal::components.dialog', [
            'results' => $this->getResults(),
        ]);
    }
}
