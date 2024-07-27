<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;


trait CanHighlightQueryMatches

{
    public  bool $highlightQueryMatches = true;
    public  ?string $highlightQueryClasses;
    public  ?string $highlightQueryStyles;


    public  function highlightQueryStyles(?string $styles): self
    {
        $this->highlightQueryStyles = $styles;
        return $this;
    }
    public  function highlightQueryClasses(?string $classes): self
    {
        $this->highlightQueryClasses = $classes;
        return $this;
    }
    public  function highlightQueryMatches(bool $enabled = true): self
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
