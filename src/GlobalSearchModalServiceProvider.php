<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
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
        // FilamentAsset::register();
    }
}
