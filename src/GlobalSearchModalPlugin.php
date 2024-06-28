<?php

namespace CharrafiMed\GlobalSearchModal;

use Closure;
use Reflection;
use Filament\Panel;
use ReflectionClass;
use ReflectionMethod;
use Filament\Contracts\Plugin;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;
use Filament\Support\Components\Component;

class GlobalSearchModalPlugin implements Plugin
{
    public bool $isSlideOver = false;
    public string $slideOverDirection = 'right';
    public static function make()
    {
        return app(static::class);
    }

    public function slideOver(bool $condition = false, string $side = 'left')
    {
        $this->isSlideOver = $condition;
        return $this;
    }
    public function getSlideOver()
    {
        return (new Component)->evaluate($this->isSlideOver);
        // return $this->evaluate($this->isSlideOver);
    }
    public function evaluate($value)
    {
        if ($value instanceof \Closure) {
            return app()->call($value);
        }

        return $value;
    }

    public function extractPublicMethods(): array
    {
        $reflection = new ReflectionClass($this);

        $methods = [];

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $methods[$method->getName()] = Closure::fromCallable([$this, $method->getName()]);
        }
        return $methods;
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
