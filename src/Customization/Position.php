<?php

namespace CharrafiMed\GlobalSearchModal\Customization;

use Closure;
use Filament\Support\Concerns\EvaluatesClosures;

class Position
{
    use EvaluatesClosures;

    protected ?string $right = null;
    protected ?string $top = null;
    protected ?string $left = null ;
    protected ?string $bottom = null;
    protected ?string $classes = '';

    public function right(string|int|Closure $rightPosition, ?string $unit = null)
    {
        $this->right = $this->formatPosition($rightPosition, $unit);
        return $this;
    }

    public function top(string|int|Closure $topPosition, ?string $unit = null)
    {
        $this->top = $this->formatPosition($topPosition, $unit);
        return $this;
    }

    public function left(string|int|Closure $leftPosition, ?string $unit = null)
    {
        $this->left = $this->formatPosition($leftPosition, $unit);
        return $this;
    }

    public function bottom(string|int|Closure $bottomPosition, ?string $unit = null)
    {
        $this->bottom = $this->formatPosition($bottomPosition, $unit);
        return $this;
    }

    public function classes(string|Closure $classes)
    {
        $this->classes = $this->formatTailwindClasses($classes);
        return $this;
    }

    protected function formatPosition(string|int|Closure $position, ?string $unit = null): string
    {
        $position = $this->evaluate($position);

        if (is_null($unit)) {
            return (string) $position;
        }

        return is_int($position) ? (string) $position . $unit : $position;
    }

    protected function formatTailwindClasses(string|Closure $classes): string
    {
        return (string) $this->evaluate($classes);
    }

    public function getRight()
    {
        return (string)$this->right;
    }

    public function getTop()
    {
        return (string)$this->top;
    }

    public function getLeft()
    {
        return (string)$this->left;
    }

    public function getBottom()
    {
        return (string)$this->bottom;
    }

    public function getClasses(): string
    {
        return (string)$this->classes;
    }
}
