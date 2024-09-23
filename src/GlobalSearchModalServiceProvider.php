<?php

namespace CharrafiMed\GlobalSearchModal;

use CharrafiMed\GlobalSearchModal\Livewire\GlobalSearchModal;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Livewire\Livewire;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class GlobalSearchModalServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('global-search-modal')
            ->hasTranslations()
            ->hasViews();
    }

    public function packageBooted()
    {
        FilamentAsset::register(
            assets: [
                Js::make(
                    id: 'modalStore',
                    path: __DIR__.'/../dist/modalStore.js'
                ),
                Css::make(
                    id: 'global-search-modal',
                    path: __DIR__.'/../dist/css/global-search-modal.css'
                ),
                AlpineComponent::make(
                    id: 'global-search-modal-observer',
                    path: __DIR__.'/../dist/observer.js'
                ),
                AlpineComponent::make(
                    id: 'global-search-modal-swappable',
                    path: __DIR__.'/../dist/swappable.js'
                ),
                AlpineComponent::make(
                    id: 'global-search-modal-search',
                    path: __DIR__.'/../dist/search.js'
                ),
            ],
            package: 'charrafimed/global-search-modal'
        );
        
        Livewire::component(
            name: 'global-search-modal',
            class: GlobalSearchModal::class
        );
    }
}
