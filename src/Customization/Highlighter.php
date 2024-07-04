<?php

namespace CharrafiMed\GlobalSearchModal\Customization;

use Closure;


class highlighter
{

    protected string | array | Closure $classes;
    protected string | array | Closure  $styles;

    public function classes(string|array|Closure $classes): self
    {
        $this->classes = $classes;
        return $this;
    }
    public function styles(string|array|Closure $styles): self
    {
        $this->styles = $styles;
        return $this;
    }
    public function getClasses(): mixed
    {
        return $this->classes;
    }
    public function getStyles() 
    {
        return $this->styles;
    }
}
