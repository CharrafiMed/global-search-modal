<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Contracts\Plugin;
use Filament\Panel;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;

class GlobalSearchModalPlugin implements Plugin
{
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
            fn (): string => Blade::render("@livewire(CharrafiMed\GlobalSearchModal\Livewire\GlobalSearchModal::class)"),
        );
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
