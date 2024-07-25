@php
    use function Filament\Support\prepare_inherited_attributes;
    use Filament\Support\Facades\FilamentAsset;
    $debounce = filament()->getGlobalSearchDebounce();
    $keyBindings = filament()->getGlobalSearchKeyBindings();
    $suffix = filament()->getGlobalSearchFieldSuffix();
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
                <x-global-search-modal::search.native.field />
                <div 
                    @class([
                        'h-full border border-white/10 overflow-hidden',
                    ])>

                    @if ($results !== null)
                    <x-global-search-modal::search.native.results :results="$results" />
                    @endif
                </div>
            </div>
        @else
        {{-- not native --}}
        <x-slot:header>
            <form 
                class="relative flex w-full items-center px-4 py-2"
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
                <button 
                    class=" border-none bg-none stroke-2 p-0 text-gray-400"
                    type="reset" 
                    title="Clear the query" 
                    aria-label="Clear the query" 
                    {{-- hidden="true" --}}
                    >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20"
                        >
                        <path 
                            d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                            stroke="currentColor" 
                            fill="none" 
                            fill-rule="evenodd" 
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ></path>
                    </svg>
                </button>
            </form>
        </x-slot:header>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste hic eum culpa, ad quaerat quos pariatur illum, dignissimos natus, adipisci sapiente numquam? Error saepe consequatur nostrum corrupti voluptatibus molestiae qui.
            </div>
        @endif

    </x-global-search-modal::modal>    
</div>

