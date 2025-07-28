<?php

namespace CharrafiMed\GlobalSearchModal;

use CharrafiMed\GlobalSearchModal\Concerns\Modal\CanCustomizeModalBehaviors;
use CharrafiMed\GlobalSearchModal\Concerns\Modal\HasSlideOverModal;
use CharrafiMed\GlobalSearchModal\Concerns\Modal\HasWidth;
use Filament\Support\Enums\Width;

class Modal
{
    use HasWidth;
    use CanCustomizeModalBehaviors;
    use HasSlideOverModal;

    public function setConfigs(
        Width $width = Width::TwoExtraLarge,
        bool $hasCloseButton = true,
        bool $closedByClickingAway = true,
        bool $closedByEscaping = true,
        bool $autofocused = true,
        bool $slideOver = false
    ) {
        $this->width = $width;
        $this->hasCloseButton = $hasCloseButton;
        $this->isClosedByClickingAway = $closedByClickingAway;
        $this->isClosedByEscaping = $closedByEscaping;
        $this->isAutofocused = $autofocused;
        $this->isSlideOver = $slideOver;
    }
}
