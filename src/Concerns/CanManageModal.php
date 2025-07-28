<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use CharrafiMed\GlobalSearchModal\Modal;
use Closure;
use Filament\Support\Enums\Width;

trait CanManageModal
{
    public function modal(
        Width $width = Width::TwoExtraLarge,
        bool $hasCloseButton = true,
        bool $closedByClickingAway = true,
        bool $closedByEscaping = true,
        bool $autofocused = true,
        bool $slideOver = false
    ): self {
        resolve(Modal::class)->setConfigs(
            $width,
            $hasCloseButton,
            $closedByClickingAway,
            $closedByEscaping,
            $autofocused,
            $slideOver
        );
        return $this;
    }

    public function getModal(): Modal
    {
        return resolve(Modal::class);
    }
}
