@php
    use Filament\Support\Facades\FilamentAsset;
    $debounce = filament()->getGlobalSearchDebounce();
    $keyBindings = filament()->getGlobalSearchKeyBindings();
    $suffix = filament()->getGlobalSearchFieldSuffix();
    // $configs=$this->getConfigs();
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
    <x-global-search-modal::modal
        :suffix="$suffix"
        :keyBindings="$keyBindings"
        :debounce="$debounce"
    />
</div>
