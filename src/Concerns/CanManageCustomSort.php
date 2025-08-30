<?php

namespace CharrafiMed\GlobalSearchModal\Concerns;

use Closure;
use Filament\Resources\Resource;

trait CanManageCustomSort
{
    public array|Closure|null $sorts = [];


    public  function sortUsing(array|Closure|null $items = []): self
    {
        $this->sorts = $items;
        return $this;
    }

    public  function getSort(): array
    {
        return array_map(function ($item) {
            if (is_subclass_of($item, Resource::class)) {
                return $item::getPluralModelLabel();
            }
            return $item;
        }, $this->evaluate($this->sorts));
    }

    public function isSortable(): bool
    {
        return (bool)$this->evaluate($this->sorts);
    }
}
