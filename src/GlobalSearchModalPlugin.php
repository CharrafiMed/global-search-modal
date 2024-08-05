<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Panel;
use Filament\Contracts\Plugin;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;
use CharrafiMed\GlobalSearchModal\Concerns\CanBeSwappableOnMobile;
use CharrafiMed\GlobalSearchModal\Concerns\HasMaxWidth;
use CharrafiMed\GlobalSearchModal\Concerns\HasSearchItemTree;
use CharrafiMed\GlobalSearchModal\Concerns\HasPlaceHolder;
use CharrafiMed\GlobalSearchModal\Concerns\HasAccessibilityElements;
use CharrafiMed\GlobalSearchModal\Concerns\CanCustomizeModalBehaviors;
use CharrafiMed\GlobalSearchModal\Concerns\CanHighlightQueryMatches;
use CharrafiMed\GlobalSearchModal\Concerns\CanInteractWithLocalStorage;
use CharrafiMed\GlobalSearchModal\Concerns\CanUseCustomViews;

class GlobalSearchModalPlugin implements Plugin
{
    use CanCustomizeModalBehaviors;
    use CanInteractWithLocalStorage;
    use CanBeSwappableOnMobile;
    use HasMaxWidth;
    use CanUseCustomViews;
    use HasSearchItemTree;
    use CanHighlightQueryMatches;
    use HasAccessibilityElements;
    use HasPlaceHolder;


 
    public static function make()
    {
        return app(static::class);
    }


    public function getId(): string
    {
        return 'global-search-modal';
    }

    public function register(Panel $panel): void
    {
        $panel->renderHook(
            PanelsRenderHook::BODY_START,
            fn (): string => Blade::render('@livewire("global-search-modal" )'),
        );
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
