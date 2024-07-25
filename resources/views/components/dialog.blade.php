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
                class="relative flex w-full items-center px-1 py-0.5"
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
        <x-slot:slot>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt labore cum eos quibusdam ullam nostrum odio incidunt veniam est rerum mollitia expedita exercitationem natus veritatis blanditiis, libero iure neque numquam earum obcaecati, deserunt quaerat dicta? Magnam deleniti, repellat impedit nemo earum dolorum ipsa dolorem suscipit, tempora omnis reprehenderit necessitatibus quas quasi officia, mollitia iure esse nihil magni at voluptas ad. Est corrupti perferendis accusamus aliquid suscipit at placeat aut magnam. Distinctio sapiente doloremque tempore quaerat porro consequuntur quidem quibusdam, sequi quis dolores, ad ipsa nesciunt optio suscipit maiores nihil magni iusto rem sed molestias fugit blanditiis. Numquam temporibus aliquid ipsam.
        </x-slot:slot>
        <x-slot:footer>

            <ul class="m-0 mr-auto flex list-none space-x-2 p-0 dark:text-slate-500">
                <li class="items-cente flex">
                    <kbd class="mr-1 flex items-center justify-center rounded border border-sky-700 p-1 text-sky-700">
                        <svg role="img" aria-label="Enter key" width="15" height="15">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.2">
                                <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3">

                                </path>
                            </g>
                        </svg>
                    </kbd>
                    <span class="DocSearch-Label">to select</span>
                </li>
                <li class="items-cente mr-1 flex">
                    <kbd class="mr-1 flex items-center justify-center rounded border border-sky-700 p-1 text-sky-700">
                        <svg role="img" aria-label="Arrow down" width="15" height="15">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.2">
                                <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3">

                                </path>
                            </g>
                        </svg>
                    </kbd>
                    <kbd class="mr-1 flex items-center justify-center rounded border border-sky-700 p-1 text-sky-700">
                        <svg role="img" aria-label="Arrow up" width="15" height="15">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.2">
                                <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3">

                                </path>
                            </g>
                        </svg>
                    </kbd>
                    <span class="DocSearch-Label">to navigate</span>
                </li>
                <li class="items-cente flex">
                    <kbd class="mr-1 flex items-center justify-center rounded border border-sky-700 p-1 text-sky-700">
                        <svg role="img" aria-label="Escape key" width="15" height="15">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.2">
                                <path
                                    d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">
                                </path>
                            </g>
                        </svg>
                    </kbd>
                    <span class="DocSearch-Label">to close</span>
                </li>
            </ul>
    </x-slot:footer>
        @endif

    </x-global-search-modal::modal>    
</div>

