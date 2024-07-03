<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;

trait CanCustomizeModal
{
    public  bool $hasCloseButton = true;

    public  bool $isClosedByClickingAway = true;

    public  bool $isClosedByEscaping = true;

    public  bool $isAutofocused = true;

    public  bool $isSlideOver = false;

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

    public function slideOver(bool | Closure $enabled = true): self
    {
        $this->isSlideOver = $enabled;
        return $this;
    }
    public function isSlideOver(): bool
    {
        return $this->isSlideOver;
    }
}
