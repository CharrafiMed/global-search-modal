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
                <input
                    @class([
                        'fi-input block w-full border-none bg-transparent py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.400)] dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] dark:disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.500)] sm:text-sm sm:leading-6',
                    ])
                    {{-- class="!important text-md flex-1 appearance-none border-none bg-transparent px-3 py-0 text-slate-900 focus:outline-none ring-0 dark:text-slate-100" --}}
                    id="search-input" 
                    style="border:none; outline:none"
                    type="search" 
                    aria-autocomplete="both" 
                    aria-labelledby="search-label"
                    aria-activedescendant="search-item-0" 
                    aria-controls="search-list" 
                    wire:model.live.debounce.200ms="search"
                    autocomplete="off" 
                    autocorrect="off" 
                    autocapitalize="none" 
                    enterkeyhint="go" 
                    spellcheck="false"
                    autofocus="true" 
                    placeholder="Search for anything, documents, actions, tasks..." 
                    maxlength="64" />
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

