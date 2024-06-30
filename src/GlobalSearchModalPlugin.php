<?php

namespace CharrafiMed\GlobalSearchModal;

use Closure;
use Filament\Panel;
use ReflectionClass;
use ReflectionMethod;
use Filament\Contracts\Plugin;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;
use Filament\Support\Concerns\EvaluatesClosures;
use CharrafiMed\GlobalSearchModal\Concerns\CanCustomizeModal;
use CharrafiMed\GlobalSearchModal\Concerns\CanExtractPublicMethods;

class GlobalSearchModalPlugin implements Plugin
{
    use EvaluatesClosures, CanCustomizeModal;



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
            fn (): string => Blade::render('@livewire("global-search-modal")'),
        );
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
