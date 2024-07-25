@php
    use Filament\Support\Facades\FilamentAsset;
    $isNative=$this->getConfigs()->isNative();
@endphp
<div 
    x-ignore 
    ax-load 
    x-load-css="[@js(FilamentAsset::getStyleHref('global-search-modal', 'charrafimed/global-search-modal'))]" 
    x-data="observer"
    >
    <x-global-search-modal::modal>
        @if ($isNative)
            <div
                @class([
                    'max-h-[96px]',
                    'overflow-y-hidden',
                ])
            >
                <x-global-search-modal::search.field />
                <div 
                    @class([
                        'h-full border border-white/10 overflow-hidden',
                    ])>

                    @if ($results !== null)
                    <x-global-search-modal::search.results :results="$results" />
                    @endif
                </div>
            </div>
        @else
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste hic eum culpa, ad quaerat quos pariatur illum, dignissimos natus, adipisci sapiente numquam? Error saepe consequatur nostrum corrupti voluptatibus molestiae qui.
            </div>
        @endif

    </x-global-search-modal::modal>    
</div>

