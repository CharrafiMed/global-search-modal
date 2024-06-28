<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Contracts\Plugin;
use Filament\Panel;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;

class GlobalSearchModalPlugin implements Plugin
{
    public bool $slideOver = false;
    public string $slideOverDirection = 'r';
    public static function make()
    {
        return app(static::class);
    }

    public function slideOver(bool $condition = true, string $side = 'l')
    {
        // $this->evaluate();
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
