<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\Modal;
use Closure;
use Filament\Support\Enums\Width;

trait CanManageModal
{
    public ?Modal $modal = null;


    public function modal(
        Width $width = Width::TwoExtraLarge,
        bool $hasCloseButton = true,
        bool $isClosedByClickingAway = true,
        bool $isClosedByEscaping = true,
        bool $isAutofocused = true,
        bool $isSlideOver = false,
    ): self {
        return $this;
    }

    public function getModalConfigs(): Modal
    {
        return $this->modal;
    }
}
