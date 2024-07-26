<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\Customization\Position;
use Closure;

trait hasCloseButton

{
    public  bool $hasCloseButton = true;


    public  function closeButton(bool $enabled = true): self
    {
        $this->hasCloseButton = $enabled;
        return $this;
    }

    public  function hasCloseButton(): bool
    {
        return $this->hasCloseButton;
    }
}
