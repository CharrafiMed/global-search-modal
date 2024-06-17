<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Js;
use Spatie\LaravelPackageTools\Package;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class GlobalSearchModalServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name("global-search-modal")
            ->hasViews();
    }

    public function packageBooted()
    {
        FilamentAsset::register(
            assets: [
                AlpineComponent::make(id: 'global-search-modal', path: __DIR__ . '/../resources/js/modal.js')->loadedOnRequest(),
            ],
            package: 'charrafimed/global-search-modal'
        );
    }
}
