@php
    use Filament\Support\Facades\FilamentAsset;
    $debounce = filament()->getGlobalSearchDebounce();
    $keyBindings = filament()->getGlobalSearchKeyBindings();
    $suffix = filament()->getGlobalSearchFieldSuffix();
@endphp
<div
    class="flex justify-center"
    x-ignore 
    ax-load
    ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('global-search-modal-observer', 'charrafimed/global-search-modal') }}"
    x-load-css="[@js(FilamentAsset::getStyleHref('global-search-modal','charrafimed/global-search-modal'))]"
    x-data="observer"
    >
    <div 
        class="fixed inset-0 z-40 overflow-y-auto"
        role="dialog" 
        aria-modal="true" 
        style="display: none"
        x-show="$store.modalStore.open" 
        x-on:keydown.escape.window="$store.modalStore.hideModal()" 
        x-id="['modal-title']"
        :aria-labelledby="$id('modal-title')"
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
            class="absolute top-10 left-1/2 transform flex min-h-screen items-center justify-center" 
            x-show="$store.modalStore.open"
            x-transition 
            x-on:click="$store.modalStore.hideModal()"
            >
            <div 
                class="relative w-full max-w-2xl overflow-y-auto rounded-xl border border-green-400 bg-gray-800 p-3 shadow-lg"
                x-on:click.stop 
                x-trap.noscroll.inert="$store.modalStore.open"
                >
                <x-filament::input.wrapper
                    prefix-icon="heroicon-m-magnifying-glass"
                    prefix-icon-alias="panels::global-search.field"
                    inline-prefix
                    inline-suffix
                    wire:target="search"
                    >
                    <x-filament::input 
                        type="search" 
                        autocomplete="off" 
                        inline-prefix 
                        :placeholder="__('filament-panels::global-search.field.placeholder')"
                        wire:key="global-search.field.input" 
                        x-bind:id="$id('input')" 
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
                <!-- Title -->
                <h2 class="text-3xl font-bold" :id="$id('modal-title')">Confirm</h2>
                <!-- Content -->
                <p class="mt-2 text-gray-600">Are you sure you want to learn how to create an awesome modal?</p>
            </div>
        </div>
    </div>
</div>
