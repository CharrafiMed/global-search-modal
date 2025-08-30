<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;

trait CanManageCustomSort
{
    public  array $sorts = [];


    public  function sortUsing(array|Closure|null $items = []): self
    {
        $this->sorts = $items;
        return $this;
    }

    public  function getSort(): array
    {
        return $this->sorts;
    }
}
