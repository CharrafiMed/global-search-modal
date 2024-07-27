<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;


trait CanHighlightQueryMatches

{
    public  bool $highlightQueryMatches = true;


    public  function highlightQueryMatches(bool $enabled = true): self
    {
        $this->highlightQueryMatches = $enabled;
        return $this;
    }

    public  function isMustHighlightQueryMatches(): bool
    {
        return $this->highlightQueryMatches;
    }
}
