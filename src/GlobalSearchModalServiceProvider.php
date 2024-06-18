<?php

namespace CharrafiMed\GlobalSearchModal;

use Livewire\Livewire;
use Filament\Support\Assets\Js;
use Spatie\LaravelPackageTools\Package;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Assets\AlpineComponent;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use CharrafiMed\GlobalSearchModal\Livewire\GlobalSearchModal;

class GlobalSearchModalServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('global-search-modal')
            ->hasViews();
    }

    public function packageBooted()
    {
        FilamentAsset::register(
            assets: [
                Js::make(
                    id: 'modalStore',
                    path: __DIR__ . '/../dist/modalStore.js'
                ),
                AlpineComponent::make(
                    id: 'global-search-modal-observer',
                    path: __DIR__ . '/../dist/observer.js'
                )
            ],
            package: 'charrafimed/global-search-modal'
        );
        Livewire::component(
            name: 'global-search-modal',
            class: GlobalSearchModal::class
        );
    }
}
