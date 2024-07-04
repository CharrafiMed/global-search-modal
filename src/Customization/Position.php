<?php
namespace CharrafiMed\GlobalSearchModal\Customization;

use Closure;
use Filament\Support\Concerns\EvaluatesClosures;

class Position
{
    use EvaluatesClosures;

    protected string $right;
    protected string $top;
    protected string $left;
    protected string $bottom;
    protected string $classes = '';

    public function right(string|int|Closure $rightPosition, string $unit = null)
    {
        $this->right = $this->formatPosition($rightPosition, $unit);
        return $this;
    }

    public function top(string|int|Closure $topPosition, string $unit = null)
    {
        $this->top = $this->formatPosition($topPosition, $unit);
        return $this;
    }

    public function left(string|int|Closure $leftPosition, string $unit = null)
    {
        $this->left = $this->formatPosition($leftPosition, $unit);
        return $this;
    }

    public function bottom(string|int|Closure $bottomPosition, string $unit = null)
    {
        $this->bottom = $this->formatPosition($bottomPosition, $unit);
        return $this;
    }

    public function classes(string|Closure $classes)
    {
        $this->classes .= ' ' . $this->formatTailwindClasses($classes);
        return $this;
    }

    protected function formatPosition(string|int|Closure $position, string $unit = null): string
    {
        if ($position instanceof Closure) {
            $position = $this->evaluate($position);
        }

        return is_null($unit) ? (string) $position : (string) $position . $unit;
    }

    protected function formatTailwindClasses(string|Closure $classes): string
    {
        return (string) $this->evaluate($classes);
    }

    public function getRight()
    {
        return $this->right;
    }

    public function getTop()
    {
        return $this->top;
    }

    public function getLeft()
    {
        return $this->left;
    }

    public function getBottom()
    {
        return $this->bottom;
    }

    public function getClasses(): string
    {
        return trim($this->classes);
    }
}
