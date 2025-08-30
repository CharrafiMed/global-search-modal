<?php

namespace CharrafiMed\GlobalSearchModal;

use Filament\Panel;
use Filament\Contracts\Plugin;
use Filament\Support\Concerns\EvaluatesClosures;
use Filament\View\PanelsRenderHook;
use Illuminate\Support\Facades\Blade;
use CharrafiMed\GlobalSearchModal\Concerns\HasPlaceHolder;
use CharrafiMed\GlobalSearchModal\Concerns\CanUseCustomViews;
use CharrafiMed\GlobalSearchModal\Concerns\HasSearchItemTree;
use CharrafiMed\GlobalSearchModal\Concerns\CanExpandUrlTarget;
use CharrafiMed\GlobalSearchModal\Concerns\CanHighlightQueryMatches;
use CharrafiMed\GlobalSearchModal\Concerns\CanInteractWithLocalStorage;
use CharrafiMed\GlobalSearchModal\Concerns\CanManageCustomSort;
use CharrafiMed\GlobalSearchModal\Concerns\CanManageModal;
use CharrafiMed\GlobalSearchModal\Concerns\CanSearchCustomPages;
use CharrafiMed\GlobalSearchModal\Concerns\CanUseCustomGlobalSearch;
use CharrafiMed\GlobalSearchModal\Concerns\HasRenderHooksScopes;
use CharrafiMed\GlobalSearchModal\Concerns\HasInputLength;

class GlobalSearchModalPlugin implements Plugin
{
    use CanInteractWithLocalStorage;
    use HasRenderHooksScopes;
    use CanExpandUrlTarget;
    use CanUseCustomViews;
    use HasSearchItemTree;
    use CanHighlightQueryMatches;
    use HasPlaceHolder;
    use HasInputLength;
    use EvaluatesClosures;
    use CanManageModal;
    use CanSearchCustomPages;
    use CanUseCustomGlobalSearch;
    use CanManageCustomSort;



    public static function make()
    {
        return app(static::class);
    }


    public function getId(): string
    {
        return 'global-search-modal';
    }

    public function register(Panel $panel): void
    {
        $panel->renderHook(
            PanelsRenderHook::BODY_START,
            fn(): string => Blade::render('@livewire("global-search-modal" )'),
            scopes: $this->getRenderHooksScopes()
        );
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
