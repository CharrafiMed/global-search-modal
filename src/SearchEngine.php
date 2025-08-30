<?php

namespace CharrafiMed\GlobalSearchModal;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Support\Facades\Auth;

#[AllowDynamicProperties]
class SearchEngine
{
    public function getConfigs(): GlobalSearchModalPlugin
    {
        return filament()->getPlugin('global-search-modal');
    }

    public  function search(string $query): ?GlobalSearchResults
    {
        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        $search = trim($query);

        if (empty($search)) {
            return GlobalSearchResults::make();
        }

        $builder = Filament::getGlobalSearchProvider()->getResults($search);

        // here the part that's makes support global search for custom pages 
        if ($this->getConfigs()->isCustomPagesAreSearchable()) {
            foreach (Filament::getPages() as $page) {
                if (is_subclass_of($page, Searchable::class)) {

                    if (method_exists($page, 'canGloballySearch') && (!$page::canGloballySearch())) {
                        continue;
                    }

                    $pageResults = $page::getGlobalSearchResults($query);

                    if (! $pageResults->count()) {
                        continue;
                    }

                    $builder->category(
                        name: $page::getGlobalSearchGroupName(),
                        results: $pageResults
                    );
                };
            }
        }

        if (!$builder || !$this->getConfigs()->isMustHighlightQueryMatches()) {
            return $builder;
        }



        // Apply highlighting to search results
        return $this->highlightResults($builder, $search);
    }

    protected function highlightResults(GlobalSearchResults $builder, string $search): GlobalSearchResults
    {
        $classes = $this->getConfigs()->getHighlightQueryClasses() ?? 'text-primary-500 font-semibold hover:underline';
        $styles = $this->getConfigs()->getHighlightQueryStyles() ?? '';

        foreach ($builder->getCategories() as &$categoryResults) {
            foreach ($categoryResults as &$result) {
                $result->highlightedTitle = Highlighter::make(
                    text: $result->title,
                    pattern: $search,
                    styles: $styles,
                    classes: $classes
                );
            }
        }
        return $builder;
    }
    protected function hasTenantOrIsAuthenticated(): bool
    {
        return Filament::getTenant() || Auth::check();
    }
}
