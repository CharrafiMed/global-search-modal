<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;


trait CanBeSwappableOnMobile

{
    public  bool $isSwappableOnMobile = true;

    public  function SwappableOnMobile(bool $enabled = true): self
    {
        $this->isSwappableOnMobile = $enabled;
        return $this;
    }

    public  function isSwappableOnMobile(): bool
    {
        return $this->isSwappableOnMobile;
    }
}
