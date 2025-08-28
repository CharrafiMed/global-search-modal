<?php

namespace CharrafiMed\GlobalSearchModal\Concerns\Modal;

use CharrafiMed\GlobalSearchModal\Customization\Position;
use Closure;

trait CanCustomizeModalBehaviors

{
    protected  bool $hasCloseButton = false;

    protected  bool $isClosedByClickingAway = true;

    protected  bool $isClosedByEscaping = true;

    protected  bool $isAutofocused = true;

    public function isAutofocus(): bool
    {
        return $this->isAutofocused;
    }

    public function hasCloseButton(): bool
    {
        return $this->hasCloseButton;
    }

    public function isClosedByClickingAway(): bool
    {
        return $this->isClosedByClickingAway;
    }

    public function isClosedByEscaping(): bool
    {
        return $this->isClosedByEscaping;
    }
}
