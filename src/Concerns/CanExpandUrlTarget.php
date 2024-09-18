<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait CanExpandUrlTarget
{
    public bool $isUrlTargetExpanded = true;

    public function expandUrlTarget($enabled = true)
    {
        $this->isUrlTargetExpanded = $enabled;
        return $this;
    }
    public function hasExpandedUrlTarget(): bool
    {
        return $this->isUrlTargetExpanded;
    }
}
