<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\Customization\Position;
use Closure;

trait CanCustomizeModalBehaviors

{
    protected  bool $hasCloseButton = true;

    protected  bool $isClosedByClickingAway = true;

    protected  bool $isClosedByEscaping = true;

    protected  bool $isAutofocused = true;


    public  function autofocus(bool $enabled = true): self
    {
        $this->isAutofocused = $enabled;
        return $this;
    }

    public function isAutofocus(): bool
    {
        return $this->isAutofocused;
    }

    public function  closeButton(bool $enabled = true): self
    {
        $this->hasCloseButton = $enabled;
        return $this;
    }
    public function hasCloseButton(): bool
    {
        return $this->hasCloseButton;
    }

    public function closeByClickingAway(bool $enabled = true): self
    {
        $this->isClosedByClickingAway = $enabled;
        return $this;
    }
    public  function isClosedByClickingAway(): bool
    {
        return $this->isClosedByClickingAway;
    }

    public  function closeByEscaping(bool $enabled = true): self
    {
        $this->isClosedByEscaping = $enabled;
        return $this;
    }
    public  function isClosedByEscaping(): bool
    {
        return $this->isClosedByEscaping;
    }
}
