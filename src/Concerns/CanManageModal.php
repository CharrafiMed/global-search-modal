<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;

trait CanManageModal
{
    public   $modal = null;


    public  function backgroundColor(string |null | Closure $classes =null): self
    {
        $this->backGroundClasses = $classes;
        return $this;
    }

    public  function getBackGroundColorClasses(): mixed
    {
        return $this->backGroundClasses;
    }
}
