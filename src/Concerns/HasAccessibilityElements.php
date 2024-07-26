<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait HasAccessibilityElements
{
    public  ?string $ariaLabel = null;


    public  function ariaLabel(?string $label = null): self
    {
        $this->ariaLabel = $label;
        return $this;
    }

    public  function getAriaLabel(): string
    {
        return $this->ariaLabel;
    }
}
