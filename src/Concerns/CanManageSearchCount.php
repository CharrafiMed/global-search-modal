<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait CanManageSearchCount
{
    protected bool $showTotalSearchCounts = false;
    protected bool $showGroupSearchCounts = false;

    public function showTotalSearchCounts(): static
    {
        $this->showTotalSearchCounts = true;
        return $this;
    }

    public function shouldShowTotalSearchCounts(): bool
    {
        return $this->showTotalSearchCounts;
    }
    
    public function showGroupSearchCounts(): static
    {
        $this->showGroupSearchCounts = true;
        return $this;
    }

    public function shouldShowGroupSearchCounts(): bool
    {
        return $this->showGroupSearchCounts;
    }
}