<?php

namespace CharrafiMed\GlobalSearchModal;

use CharrafiMed\GlobalSearchModal\Livewire\GlobalSearchModal;
use Filament\Support\Assets\AlpineComponent;
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
            ->hasViews();
    }

    public function packageBooted()
    {
        FilamentAsset::register(
            assets: [
                AlpineComponent::make(id: 'global-search-modal', path: __DIR__.'/../resources/js/modal.js'),
            ],
            package: 'charrafimed/global-search-modal'
        );
        Livewire::component('gloab-search-modal', GlobalSearchModal::class);
    }
}
