@props([
    'suffix' => '',
    'debounce'=>200,
    'keyBindings',
    'isSlideOver'=>false,
    'isFooterSticky'=>false

])
<div 
        class="fixed inset-0 z-40 "
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
            @class([
                'fi-modal-close-overlay fixed inset-0 z-40 bg-gray-950/50 dark:bg$store.modalStore.ope-gray-950/75',
            ])
            x-show="$store.modalStore.open" 
            x-transition.opacity
            >
        </div>

        <!-- Panel -->
        <div 
            class="relative flex min-h-screen items-center justify-center" 
            x-show="$store.modalStore.open"
            x-transition 
            x-on:click="$store.modalStore.hideModal()"
            >
            <div 
                class="absolute w-full max-w-2xl overflow-y-auto rounded-xl  bg-gray-800 p-2 shadow-lg"
                style="top: 80px;"
                x-on:click.stop 
                x-trap.noscroll.inert="$store.modalStore.open"
                >
                <x-filament::input.wrapper
                    prefix-icon="heroicon-m-magnifying-glass"
                    prefix-icon-alias="panels::global-search.field"
                    :suffix="$suffix"
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
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis architecto et ratione praesentium cum. Consequatur quos quibusdam perspiciatis voluptate sit! Minus explicabo architecto sunt omnis beatae obcaecati temporibus veniam accusamus.
                </div>
            </div>
        </div>
    </div>