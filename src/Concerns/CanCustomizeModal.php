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

    public  function autofocus(bool $condition = true): self
    {
        $this->isAutofocused = $condition;
        return $this;
    }
    public function isAutofocus(): bool
    {
        return $this->isAutofocused;
    }

    public function  closeButton(bool $condition = true): self
    {
        $this->hasCloseButton = $condition;
        return $this;
    }
    public function hasCloseButton(): bool
    {
        return $this->hasCloseButton;
    }

    public function closedByClickingAway(bool $condition = true): self
    {
        $this->isClosedByClickingAway = $condition;
        return $this;
    }
    public  function isClosedByClickingAway(): bool
    {
        return $this->isClosedByClickingAway;
    }

    public  function closedByEscaping(bool $condition = true): self
    {
        $this->isClosedByEscaping = $condition;
        return $this;
    }
    public  function isClosedByEscaping(): bool
    {
        return $this->isClosedByEscaping;
    }

    public function slideOver(bool | Closure $condition = false): self
    {
        $this->isSlideOver = $condition;
        return $this;
    }
    public function isSlideOver(): bool
    {
        return $this->isSlideOver;
    }
}
