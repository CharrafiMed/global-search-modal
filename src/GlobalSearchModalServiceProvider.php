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
                AlpineComponent::make(
                    id: 'global-search-modal',
                    path: __DIR__ . '/../dist/modal.js'
                )
            ],
            package: 'charrafimed/global-search-modal'
        );
        Livewire::component('global-search-modal', GlobalSearchModal::class);
    }
}
