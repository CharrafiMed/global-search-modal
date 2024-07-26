<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Panel;
use Filament\Contracts\Plugin;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;
use CharrafiMed\GlobalSearchModal\Concerns\CanBeNative;
use CharrafiMed\GlobalSearchModal\Concerns\CanCustomizeModalBehaviors;
use CharrafiMed\GlobalSearchModal\Concerns\HasBackGroundColor;
use CharrafiMed\GlobalSearchModal\Concerns\HasMaxWidth;
use CharrafiMed\GlobalSearchModal\Concerns\HasAccessibilityElements;
use CharrafiMed\GlobalSearchModal\Concerns\hasCloseButton;

class GlobalSearchModalPlugin implements Plugin
{
    use CanCustomizeModalBehaviors;
    use CanBeNative;
    use HasMaxWidth;
    use HasBackGroundColor;
    use HasAccessibilityElements;


 
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
            fn (): string => Blade::render('@livewire("global-search-modal",[\' lazy\' => true])'),
        );
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
