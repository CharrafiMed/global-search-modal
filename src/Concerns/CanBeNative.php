<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\Customization\Position;
use Closure;

trait CanBeNative

{
    public  bool $isNative = false;


    public  function native(bool $enabled = false): self
    {
        $this->isNative = $enabled;
        return $this;
    }

    public  function isNative(): bool
    {
        return $this->isClosedByEscaping;
    }
}
