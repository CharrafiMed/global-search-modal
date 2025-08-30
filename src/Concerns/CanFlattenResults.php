<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait CanFlattenResults
{
    protected bool $shouldFlattenResults = false;

    public function flattenResults(): static
    {
        $this->shouldFlattenResults = true;
        return $this;
    }

    public function shouldFlattenResults(): bool
    {
        return $this->shouldFlattenResults;
    }
}
