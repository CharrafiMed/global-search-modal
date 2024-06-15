<?php

namespace CharrafiMed\GlobalSearch;

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
}
