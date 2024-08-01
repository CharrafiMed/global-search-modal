@use('Filament\Support\Facades\FilamentAsset')
@php
    use function Filament\Support\prepare_inherited_attributes;
    $debounce = filament()->getGlobalSearchDebounce();
    $keyBindings = filament()->getGlobalSearchKeyBindings();
    $suffix = filament()->getGlobalSearchFieldSuffix();
    $placeholder=$this->getConfigs()->getPlaceholder();
    $isRetainRecentIfFavorite=$this->getConfigs()->isRetainRecentIfFavorite();
    $maxItemsAllowed = $this->getConfigs()->getMaxItemsAllowed() ?? 10;
    $hasFooterView=$this->getConfigs()->hasFooterView();
    $footerView=$this->getConfigs()->getFooterView();
    $EmptyQueryView=$this->getConfigs()->getEmptyQueryView();
@endphp
{{-- <script src="https://cdn.tailwindcss.com"></script> --}}
<div>
    <div 
    x-ignore 
    ax-load
    x-load-css="[@js(FilamentAsset::getStyleHref('global-search-modal', 'charrafimed/global-search-modal'))]" 
    ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-observer', 'charrafimed/global-search-modal') }}"
    x-data="observer"
    >
    <x-global-search-modal::modal>
        <x-slot:header>
            <form 
                class="relative flex w-full items-center px-1 py-0.5"
                >
                    <label 
                        class="flex h-4 w-4 items-center justify-center text-gray-300/40 dark:text-white/30"
                        id="search-label" 
                        for="search-input"
                        >
                          <x-global-search-modal::icon.search wire:loading.class="hidden"/>
                          <div class="hidden" wire:loading.class.remove="hidden">
                                <x-global-search-modal::icon.loading-indicator/>
                          </div>
                    </label>
                    <x-global-search-modal::search.input 
                        :placeholder="$placeholder"
                        x-data="{}"
                        :attributes="prepare_inherited_attributes(
                        new \Illuminate\View\ComponentAttributeBag([
                            'wire:model.live.debounce.' . $debounce => 'search',
                            'x-mousetrap.global.' .
                            collect($keyBindings)
                                ->map(fn(string $keyBinding): string => str_replace('+', '-', $keyBinding))
                                ->implode('.') => $keyBindings ? 'document.getElementById($id(\'input\')).focus()' : null,
                            ]),
                        )"
                    />
            </form>
        </x-slot:header>
        <x-slot:dropdown>
            {{-- the user start searching --}}
        <div     
            x-ignore
            ax-load
            ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-search', 'charrafimed/global-search-modal') }}"
            x-data="searchComponent({
                recentSearchesKey:  @js($this->getPanelId() . "_recent_search"),
                favoriteSearchesKey: @js( $this->getPanelId() . "_favorites_search"),
                maxItemsAllowed:  @js( $maxItemsAllowed),
                retainRecentIfFavorite : @js($isRetainRecentIfFavorite)
            })"
            >
            @unless(empty($search))
                <x-global-search-modal::search.results 
                    :results="$results"
                />
            @else
                <div
                    class="w-full"
                    >
                    @unless (filled($EmptyQueryView))
                        <div>                            
                            <template x-if="search_history.length <=0 && favorite_items.length <=0">
                                <x-global-search-modal::search.empty-query-text/>
                            </template>
                        </div>
                    @else
                        <div>
                            <template x-if="search_history.length <=0 && favorite_items.length <=0">
                                <div>     {{-- this div is nessacery to get this working  --}}
                                    {!! $EmptyQueryView->render() !!}
                                </div>
                            </template>
                        </div>
                    @endunless
                    <x-global-search-modal::search.summary.summary-wrapper />
                </div>
            @endunless  
        </div>
        </x-slot:dropdown>

        @if ($hasFooterView)
            <x-slot:footer>
                @unless (filled($footerView))
                        <x-global-search-modal::search.footer/>    
                @else
                    {!! $footerView->render() !!}
                @endif
            </x-slot:footer>
          @endif
        

    </x-global-search-modal::modal>    
</div>
</div>
