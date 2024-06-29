<?php

namespace CharrafiMed\GlobalSearchModal;

use CharrafiMed\GlobalSearchModal\Concerns\CanExtractPublicMethods;
use Closure;
use Filament\Panel;
use ReflectionClass;
use ReflectionMethod;
use Filament\Contracts\Plugin;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;
use Filament\Support\Concerns\EvaluatesClosures;

class GlobalSearchModalPlugin implements Plugin
{
    use EvaluatesClosures,CanExtractPublicMethods;
    // use canExportClosures;

    public bool $isSlideOver = false;
    public string $slideOverDirection = 'right';

    public static function make()
    {
        return app(static::class);
    }

    public function slideOver(bool $condition = false, string $side = 'left'): self
    {
        $this->isSlideOver = $condition;
        $this->slideOverDirection = $side;
        return $this;
    }

    public function isSlideOver(): bool
    {
        return $this->evaluate($this->isSlideOver);
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
