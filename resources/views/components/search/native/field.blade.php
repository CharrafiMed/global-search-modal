@aware(['suffix','debounce','keyBindings'])
<x-filament::input.wrapper 
    class="border-none !rounded-md" 
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
        :attributes="\Filament\Support\prepare_inherited_attributes(
            new \Illuminate\View\ComponentAttributeBag([
                'wire:model.live.debounce.' . $debounce => 'search',
                'x-mousetrap.global.' .
                collect($keyBindings)
                    ->map(fn(string $keyBinding): string => str_replace('+', '-', $keyBinding))
                    ->implode('.') => $keyBindings ? 'document.getElementById($id(\'input\')).focus()' : null,
            ]),
        )" />
</x-filament::input.wrapper>
