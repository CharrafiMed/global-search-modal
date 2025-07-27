@use('Filament\Support\Facades\FilamentAsset')
@php
    use function Filament\Support\prepare_inherited_attributes;
    $placeholder = $this->getConfigs()->getPlaceholder();
    $maxLength = $this->getConfigs()->getSearchInputMaxLength();
    $hasCloseButton = $this->getConfigs()->hasCloseButton();
    $isRetainRecentIfFavorite = $this->getConfigs()->isRetainRecentIfFavorite();
    $maxItemsAllowed  =  $this->getConfigs()->getMaxItemsAllowed() ?? 10;
    $hasFooterView = $this->getConfigs()->hasFooterView();
    $footerView = $this->getConfigs()->getFooterView();
    $EmptyQueryView = $this->getConfigs()->getEmptyQueryView();
    
    // here I am going to force custom style for built-in filament modal
    $classes = [
        // there is lot of padding around the modal reduce it.
        '[&_.fi-modal-header]:!px-2 [&_.fi-modal-header]:!py-0.5', 

        // *screams in CSS* WHY IS THE MODAL SO FAR AWAYYY?? come closer bb 💕 (reduce top padding a little bit)
        '[&_.fi-modal-window-ctn]:!grid-rows-[0.5fr_auto_1fr] [&_.fi-modal-window-ctn]:sm:!grid-rows-[0.5fr_auto_3fr]', 
        // keep that search input visible when users go scroll-crazy 🎢 (force sticky header)
        // '[&_.fi-modal-header]:!sticky [&_.fi-modal-header]:!top-0 [&_.fi-modal-header]:!z-10',
        // '[&_.fi-modal-header]:!bg-white [&_.fi-modal-header]:dark:!bg-gray-900', // background so content doesn't show through
        // '[&_.fi-modal-header]:!border-b [&_.fi-modal-header]:!border-gray-200 [&_.fi-modal-header]:dark:!border-white/10', // subtle border for separation
  
  ];
@endphp
<div>
    <div 
        x-load
        x-load-css="[@js(FilamentAsset::getStyleHref('global-search-modal', 'charrafimed/global-search-modal'))]" 
        x-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-observer', 'charrafimed/global-search-modal') }}"
        x-data="observer"
        class="{{ Arr::toCssClasses($classes) }}"
    >
    <x-filament::modal
        sticky-header
        openEventName='open-global-search-modal' 
        id="global-search-modal::plugin"
        width="2xl"
    >
        <form 
            class="relative flex w-full items-center border-b border-gray-100 dark:border-gray-700 px-1 py-0.5"
        >
            <label 
                class="flex items-center justify-center text-gray-300/40 dark:text-white/30"
                id="search-label" 
                for="search-input"
            >
                <x-filament::icon 
                    :icon="\Filament\Support\Icons\Heroicon::MagnifyingGlass" 
                    class="fi-size-lg transition-all"    
                    wire:loading.class="hidden"
                />
                <x-filament::loading-indicator
                    wire:target="getResults"
                    class="fi-size-lg hidden transition-all"
                    wire:loading.class.remove="hidden"
                />
            </label>
            
            <x-global-search-modal::search.input 
                :placeholder="$placeholder"
                :maxlength="$maxLength"
            />
        </form>

        <div class="max-h-[60vh] overflow-y-auto">
            <div     
            x-load
            x-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-search', 'charrafimed/global-search-modal') }}"
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
                    class="w-full global-search-modal"
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
        </div>
        @if ($hasFooterView)
            <x-slot:footer>
                @unless (filled($footerView))
                        <x-global-search-modal::search.footer/>    
                @else
                    {!! $footerView->render() !!}
                @endif
            </x-slot:footer>
          @endif
        

    </x-filament::modal>    
</div>
</div>
