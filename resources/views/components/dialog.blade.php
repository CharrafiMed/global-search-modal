@php
    use Filament\Support\Facades\FilamentAsset;
    $debounce = filament()->getGlobalSearchDebounce();
    $keyBindings = filament()->getGlobalSearchKeyBindings();
    $suffix = filament()->getGlobalSearchFieldSuffix();

    $isClosedByClickingAway=$this->getConfigs()->isClosedByClickingAway();
    $isClosedByEscaping=$this->getConfigs()->isClosedByEscaping();
    $isSlideOver=$this->getConfigs()->isSlideOver();
    
@endphp
<div
@class([
    'flex justify-center'
    ])
    x-ignore 
    ax-load
    ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-observer', 'charrafimed/global-search-modal') }}"
    x-load-css="[@js(FilamentAsset::getStyleHref('global-search-modal','charrafimed/global-search-modal'))]"
    x-data="observer"
    >
    <div 
        class="fixed inset-0 z-40 overflow-y-auto "
        role="dialog" 
        aria-modal="true" 
        style="display: none"
        x-show="$store.modalStore.open"
        @if ($isClosedByEscaping)
            x-on:keydown.escape.window="$store.modalStore.hideModal()" 
        @endif
        x-id="['modal-title']"
        x-bind:aria-labelledby="$id('modal-title')"
        >
        <!-- Overlay -->
        <div 
            class="fixed inset-0 bg-black bg-opacity-50" 
            x-show="$store.modalStore.open" 
            x-transition.opacity
            >
        </div>

        <!-- Panel -->
        <div 
            class="relative flex min-h-screen bg-gray-950 items-center justify-center" 
            x-show="$store.modalStore.open"
            x-transition 
            @if ($isClosedByClickingAway)
                x-on:click="$store.modalStore.hideModal()"
            @endif
            >
            <div 
                class="{{ $isSlideOver ? 'absolute inset-y-0 right-0 max-w-sm w-full sm:w-1/2' : 'absolute w-full max-w-xl' }} overflow-y-auto rounded-xl bg-gray-800 p-1 shadow-lg"
                x-on:click.stop  
                x-trap.noscroll.inert="$store.modalStore.open"
                @if ($isSlideOver)
                    x-transition:enter-start="translate-x-full rtl:-translate-x-full"
                    x-transition:enter-end="translate-x-0"
                    x-transition:leave-start="translate-x-0"
                    x-transition:leave-end="translate-x-full rtl:-translate-x-full"
                @else
                    x-transition:enter-start="scale-95 opacity-0"
                    x-transition:enter-end="scale-100 opacity-100"
                    x-transition:leave-start="scale-100 opacity-100"
                    x-transition:leave-end="scale-95 opacity-0"
                @endif
                style="{{ $isSlideOver ? 'top: 0; right: 0;' : 'top: 10px;' }}"
                >
                <x-filament::input.wrapper
                    prefix-icon="heroicon-m-magnifying-glass"
                    prefix-icon-alias="panels::global-search.field"
                    :suffix="$suffix"
                    inline-prefix
                    inline-suffix
                    wire:target="search"
                    class="border-none"
                    >
                    <x-filament::input 
                        type="search" 
                        autocomplete="off" 
                        inline-prefix 
                        :placeholder="__('filament-panels::global-search.field.placeholder')"
                        wire:key="global-search.field.input" 
                        x-bind:id="$id('input')" 
                        wire:model="search"
                        x-data="{}"
                        :attributes="
                            \Filament\Support\prepare_inherited_attributes(
                                new \Illuminate\View\ComponentAttributeBag([
                                    'wire:model.live.debounce.' . $debounce => 'search',
                                    'x-mousetrap.global.' . collect($keyBindings)->map(fn (string $keyBinding): string => str_replace('+', '-', $keyBinding))->implode('.') => $keyBindings ? 'document.getElementById($id(\'input\')).focus()' : null,
                                ])
                            )
                        "
                  />
                </x-filament::input.wrapper>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis architecto et ratione praesentium cum. Consequatur quos quibusdam perspiciatis voluptate sit! Minus explicabo architecto sunt omnis beatae obcaecati temporibus veniam accusamus.
                </div>
            </div>
        </div>
    </div>
</div>
