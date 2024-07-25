<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;


use Closure;

trait HasBackGroundColor
{
    public  string |null | Closure $backGroundClasses = null;


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
