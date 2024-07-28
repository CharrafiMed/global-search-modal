<?php

namespace CharrafiMed\GlobalSearchModal\Livewire;

use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class GlobalSearchModal extends Component
{
    public ?string $search = '';



    public function getConfigs()
    {
        return filament('global-search-modal');
    }

    public function highlightMatchingLetter($result, $query, $classes = "text-primary-300", $styles = "")
    {
        if (blank($query)) return $result;

        $highlighted = '<span class="' . $classes . '" style="' . $styles . '">$0</span>';
        $pattern = '/' . preg_quote($query, '/') . '/i';

        return preg_replace($pattern, $highlighted, $result);
        if (blank($query)) return $result;
        // $query = strtolower($query);
        $queryLength = strlen($query);
        $highlightedTitle = "";
        $remainingResult = $result;
        $index = stripos($remainingResult, $query);
        while ($index !== false) {
            $highlightedTitle .= substr($remainingResult, 0, $index);
            $highlightedTitle .= '<span class="' . $classes . '" style="' . $styles . '">' . substr($remainingResult, $index, $queryLength) . '</span>';
            $remainingResult = substr($remainingResult, $index + $queryLength);
            $index = stripos($remainingResult, $query);
        }

        $highlightedTitle .= $remainingResult;
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
                $result->highlitedTitle = $this->highlightMatchingLetter($this->search, $result->title);
                dump($result);
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
        // dd(GlobalSearchModalPlugin::make()->extractPublicMethods());
        return view('global-search-modal::components.dialog', [
            'results' => $this->getResults(),
        ]);
    }
}
