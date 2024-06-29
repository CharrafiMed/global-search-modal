<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use ReflectionClass;
use ReflectionMethod;

trait CanExtractPublicMethods
{
    private ?array $cachedMethod = [];
    public function extractPublicMethods(): array
    {
        $reflection = new ReflectionClass($this);

        return collect($reflection->getMethods(ReflectionMethod::IS_PUBLIC))
            ->mapWithKeys(function ($method) {
                return [$method->getName() => Closure::fromCallable([$this, $method->getName()])];
            })
            ->except(['evaluate', 'extractPublicMethods', 'boot', 'getId', 'register'])
            ->filter(fn ($func) => (str($func)->startWith('get') || str($func)->startWith('has') || str($func)->startWith('is')))
            ->toArray();
    }
}
