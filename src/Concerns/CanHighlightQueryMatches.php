<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

// use function CharrafiMed\GlobalSearchModal\format_styles;

trait CanHighlightQueryMatches

{
    public  bool $highlightQueryMatches = true;
    public  ?string $highlightQueryClasses = null;
    public  ?string $highlightQueryStyles = null;


    public  function highlightQueryStyles(string | array |  null $styles): self
    {
        $this->highlightQueryStyles = $this->format_styles($styles);
        return $this;
    }
    protected function format_styles(array | string | null $styles)
    {
        if (is_null($styles)) {
            return;
        }

        if (is_array($styles)) {
            $styleString = '';
            foreach ($styles as $key => $value) {
                $styleString .= $key . ':' . $value . ';';
            }
            return $styleString;
        }
        return $styles;
    }
    // public  function highlightQueryClasses(?string $classes): self
    // {
    //     $this->highlightQueryClasses = $classes;
    //     return $this;
    // }
    public  function highlighter(bool $enabled = true): self
    {
        $this->highlightQueryMatches = $enabled;
        return $this;
    }

    public function gethighlightQueryStyles()
    {
        return $this->highlightQueryStyles;
    }

    public function gethighlightQueryClasses()
    {
        return $this->highlightQueryClasses;
    }

    public  function isMustHighlightQueryMatches(): bool
    {
        return $this->highlightQueryMatches;
    }
}
