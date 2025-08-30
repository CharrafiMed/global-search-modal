<?php

namespace CharrafiMed\GlobalSearchModal;

use AllowDynamicProperties;
use CharrafiMed\GlobalSearchModal\Contracts\Searchable;
use CharrafiMed\GlobalSearchModal\Utils\Highlighter;
use Filament\Facades\Filament;
use Filament\GlobalSearch\GlobalSearchResults;
use Illuminate\Support\Facades\Auth;
use CharrafiMed\GlobalSearchModal\Pages;
use CharrafiMed\GlobalSearchModal\Resources;

#[AllowDynamicProperties]
class SearchEngine
{
    public function getConfigs(): GlobalSearchModalPlugin
    {
        return filament()->getPlugin('global-search-modal');
    }

    public function search(string $query): ?GlobalSearchResults
    {
        $plugin = $this->getConfigs();

        $builder = GlobalSearchResults::make();

        if (!$this->hasTenantOrIsAuthenticated()) {
            return null;
        }

        $query = trim($query);

        if (empty($query)) {
            return $builder;
        }


        if ($plugin->hasCustomSearch() && !$plugin->mergesWithCore()) {
            return $plugin->executeSearchCallback($query);
        }

        if ($plugin->hasCustomSearch() && $plugin->mergesWithCore()) {
            $builder->merge($plugin->executeSearchCallback($query));
        }


        $builder->merge(Resources\GlobalSearch::search($query));


        if ($plugin->isCustomPagesAreSearchable()) {
            $builder->merge(Pages\GlobalSearch::search($query));
        }

        if (!$builder || !$plugin->isMustHighlightQueryMatches()) {
            return $builder;
        }

        return $this->highlightResults($builder, $query);
    }



    protected function highlightResults(GlobalSearchResults $builder, string $query): GlobalSearchResults
    {
        $classes = $this->getConfigs()->getHighlightQueryClasses() ?? 'text-primary-500 font-semibold hover:underline';
        $styles = $this->getConfigs()->getHighlightQueryStyles() ?? '';

        foreach ($builder->getCategories() as &$categoryResults) {
            foreach ($categoryResults as &$result) {
                $result->highlightedTitle = Highlighter::make(
                    text: $result->title,
                    pattern: $query,
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
