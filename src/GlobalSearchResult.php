<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Actions\Action;
use Filament\GlobalSearch\GlobalSearchResult as BaseGlobalSearchResult;
use Illuminate\Contracts\Support\Htmlable;

class GlobalSearchResult extends BaseGlobalSearchResult
{
    public function __construct(
        string | Htmlable $title,
        string $url,
        array $details = [],
        array $actions = [],
    ) {
        parent::__construct(
            $title,
            $url,
            $details,
            $actions,
        );
    }
}
