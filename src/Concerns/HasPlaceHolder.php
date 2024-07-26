<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

trait HasPlaceHolder

{
    public  ?string $placeholder = null;


    public  function placeholder(?string $enabled ): self
    {
        $this->placeholder = $enabled;
        return $this;
    }

    public  function getPlaceholder(): ?string
    {
        return $this->placeholder;
    }
}
