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

    $isClosedByClickingAway = $this->getConfigs()->isClosedByClickingAway();
    $isClosedByEscaping = $this->getConfigs()->isClosedByEscaping();
    $hasCloseButton = $this->getConfigs()->hasCloseButton();
    $isSlideOver = $this->getConfigs()->isSlideOver();
    $maxWidth = $this->getConfigs()->getMaxWidth();
    
    // here I am going to force custom style for built-in filament modal
    $classes = [
        // there is lot of padding around the modal reduce it.
        '[&_.fi-modal-header]:!px-2 [&_.fi-modal-header]:!py-0.5', 
        
        // reduce also the padding of contents 
        '[&_.fi-modal-content]:!py-3 [&_.fi-modal-content]:!px-4', 

        // WHY IS THE MODAL SO FAR AWAYYY?? come closer bb 💕 (reduce top padding a little bit)
        '[&_.fi-modal-window-ctn]:!grid-rows-[0.6fr_auto_1fr] [&_.fi-modal-window-ctn]:sm:!grid-rows-[0.5fr_auto_3fr]', 
  
        // give it some padding when the auto in "0.6fr_auto_1fr" expand across
        '[&_:not(.fi-modal-slide-over):not(.fi-width-screen)_.fi-modal-window-ctn]:!pt-16',

        // control results container heights 
        '[&_:not(.fi-modal-slide-over):not(.fi-width-screen)_.results-container]:max-h-[67vh]', 
        '[&_.fi-modal-slide-over_.results-container]:!max-h-[83vh]', 
        '[&_.fi-width-screen_.results-container]:!max-h-[83vh]', 
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
        openEventName='open-global-search-modal' 
        id="global-search-modal::plugin"
        width="2xl"
        slide-over
        footer-sticky
        {{-- width="screen" --}}
    >
        <form 
            class="relative grid grid-cols-[auto_1fr] w-full items-center border-b border-gray-100 dark:border-gray-700 px-1 pt-0.5 pb-1.5"
        >
            <label 
                class="flex min-w-[1.5rem] pr-2 items-center justify-center text-gray-300/40 dark:text-white/30"
                id="search-label" 
                for="search-input"
            >
                <x-filament::icon 
                    :icon="\Filament\Support\Icons\Heroicon::MagnifyingGlass" 
                    class="fi-size-lg transition-all"    
                    wire:loading.class="hidden"
                />
                <x-filament::loading-indicator
                    class="fi-size-lg hidden transition-all"
                    wire:loading.class.remove="hidden"
                />
            </label>
            
            <x-global-search-modal::search.input 
                :placeholder="$placeholder"
                :maxlength="$maxLength"
            />
        </form>

        <div class="results-container overflow-y-auto">
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
                        class="w-full"
                    >
                        @unless (filled($EmptyQueryView))
                            <div>                            
                                <template x-if="search_history.length <=0 && favorite_items.length <=0">
                                    <p class="text-gray-700 p-4 dark:text-gray-200 text-center">{{ __('Please enter a search term to get started.') }}</p>
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
