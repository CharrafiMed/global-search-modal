@use('Filament\Support\Facades\FilamentAsset')
@php
    $modal = $this->getConfigs()->getModal();
    
    $isRetainRecentIfFavorite = $this->getConfigs()->isRetainRecentIfFavorite();
    $maxItemsAllowed  =  $this->getConfigs()->getMaxItemsAllowed() ?? 10;
    $hasFooterView = $this->getConfigs()->hasFooterView();
    $footerView = $this->getConfigs()->getFooterView();
    $EmptyQueryView = $this->getConfigs()->getEmptyQueryView();
    
    // here I am going to force custom style for built-in filament modal
    $classes = [
        // there is lot of padding around the modal reduce it.
        '[&_.fi-modal-header]:!px-4 [&_.fi-modal-header]:!py-4', 
        
        // reduce also the padding of contents 
        '[&_.fi-modal-content]:!py-3 [&_.fi-modal-content]:!px-4', 

        // reduce top padding a little bit
        '[&_.fi-modal-window-ctn]:!grid-rows-[0.6fr_auto_1fr] [&_.fi-modal-window-ctn]:sm:!grid-rows-[0.5fr_auto_3fr]', 
  
        // give it some padding when the auto in "0.6fr_auto_1fr" expand across
        '[&_:not(.fi-modal-slide-over):not(.fi-width-screen)_.fi-modal-window-ctn]:!pt-16',

        // handle the close button 
        '[&_.fi-modal-close-btn]:!top-4 [&_.fi-modal-close-btn]:!end-4 [&_.fi-modal-close-btn]:!p-0.5 [&_.fi-modal-close-btn]:size-6 ',
        // control results container heights 
        '[&_:not(.fi-modal-slide-over):not(.fi-width-screen)_.results-container]:max-h-[67vh]', 
        '[&_.fi-modal-slide-over_.results-container]:!max-h-[80vh] [&_.fi-modal-slide-over_.results-container]:!min-h-full', 
        '[&_.fi-width-screen_.results-container]:!max-h-[80vh]', 

        // chrome scroll bar sucks (make it looks like what firefox does)
        '[&_.results-container]:[scrollbar-width:thin]',
        '[&_.results-container]:[scrollbar-color:rgba(156_,_163_,_175_,_0.7)_transparent]',
        '[&_.results-container::-webkit-scrollbar]:w-[6px]',
        '[&_.results-container::-webkit-scrollbar-thumb]:bg-gray-400/70',
        '[&_.results-container::-webkit-scrollbar-thumb]:rounded-full',
        '[&_.results-container::-webkit-scrollbar-thumb:hover]:bg-gray-500/90',
        '[&_.results-container::-webkit-scrollbar-track]:bg-transparent',
        'dark:[&_.results-container::-webkit-scrollbar-thumb]:bg-gray-500/70',
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
        id="global-search-modal::plugin"
        openEventName='open-global-search-modal' 
        :attributes="new \Illuminate\View\ComponentAttributeBag([
            'width' => $modal->getWidth()?->value ?? Filament\Support\Enums\Width::TwoExtraLarge,
            'closeButton' => $modal->hasCloseButton(),
            'closedByClickingAway' => $modal->isClosedByClickingAway(),
            'closedByEscaping' => $modal->isClosedByEscaping(),
            'autofocus' => $modal->isAutofocus(),
            'slideOver' => $modal->isSlideOver(),
        ])"
    >
        <x-slot name="header">
            <x-global-search-modal::search.bar/>
        </x-slot>

        <div class="results-container overflow-y-auto">
            <div     
                x-load
                x-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-search', 'charrafimed/global-search-modal') }}"
                x-data="searchComponent({
                    recentSearchesKey:  @js($this->getPanelId() . "_recent_search"),
                    favoriteSearchesKey: @js($this->getPanelId() . "_favorites_search"),
                    maxItemsAllowed:  @js($maxItemsAllowed),
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
 <x-filament-actions::modals />
</div>
