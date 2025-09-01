@props([
    'results',
])

@php
    $plugin = $this->getConfigs();
@endphp

<div
    x-data="{
        handleKeyUp(){
            $focus.getFirst() === $focus.focused() ? document.getElementById('search-input').focus() : $focus.previous();
        },
    }"
    x-on:focus-first-element.window="$focus.first()"
    x-on:keydown.up.stop.prevent="handleKeyUp()"
    x-on:keydown.down.stop.prevent="$focus.wrap().next()"
    {{
        $attributes->class([
            'flex-1 z-10 w-full mt-1 overflow-y-auto h-full shadow-lg transition',
            '[transform:translateZ(0)]',
        ])
    }}
>
    @if ($results->getCategories()->isEmpty())
        @unless (filled($plugin->getNotFoundView()))
            <p class="px-4 py-16 text-center rounded-lg text-sm text-gray-500 dark:text-gray-400 bg-white/5">
                {{ __('filament-panels::global-search.no_results_message') }}
            </p>
        @else
            {!! $plugin->getNotFoundView()->render() !!}
        @endunless
    @else
        @if ($plugin->shouldShowTotalSearchCounts())
            <div class="flex items-center ml-2 rtl:mr-2">
                <span class="mr-1 rtl:ml-1">
                    {{ __('total count: ') }}    
                </span>
                <x-filament::badge color="gray">
                    {{ $results->count() }}
                </x-filament::badge>
            </div>
        @endif
        <ul>
            @if($plugin->shouldFlattenResults())
                {{-- 
                    Listen up code warriors! 🔥
                    
                    Yeah, I could ->flatten() this like some basic dev, but that's messy .
                    We need these GROUPS intact for sorting wizardry and localStorage magic.
                    
                    "Fake flattening" in the UI while keeping structured data behind the scenes? 
                    That's galaxy brain architecture right there. 
                    
                    Think you can do better? Prove it - I'll wait 
                    (And save your "performance concerns" for actual bottlenecks, not UI rendering)
                --}}
                @foreach($results->getCategories() as $groupTitle => $groupedResults)
                    @foreach ($groupedResults as $result)
                        <li>
                            <x-global-search-modal::search.result-item
                                :$result
                                :title="$plugin->isMustHighlightQueryMatches() ? $result->highlightedTitle : $result->title"
                                :rawTitle="$result->title"
                                :group="$groupTitle"
                                :url="$result->url"
                                :isLast="$loop->last"
                            />
                        </li>
                    @endforeach 
                @endforeach
            @else
                @foreach ($results->getCategories() as $groupTitle => $groupedResults)
                    <li>
                            <div
                                class="top-0 z-10"
                            >
                                <h3
                                    class="px-4 relative flex overflow-x-hidden text-ellipsis whitespace-nowrap py-2 text-[0.9em] text-start font-semibold capitalize text-gray-950 dark:text-white"
                                >
                                    {{ $groupTitle }}
                                      @if ($plugin->shouldShowGroupSearchCounts())
                                        <span class="ml-2 rtl:mr-2">
                                            <x-filament::badge color="gray">
                                                {{ $groupedResults->count() }}
                                            </x-filament::badge>
                                        </span>
                                    @endif
                                </h3>
                            </div>

                            <ul 
                                @class([
                                    'list-result'
                                ]) 
                            >
                                @foreach ($groupedResults as $result)
                                    <x-global-search-modal::search.result-item
                                        :$result
                                        :title="$plugin->isMustHighlightQueryMatches() ? $result->highlightedTitle : $result->title"
                                        :rawTitle="$result->title"
                                        :group="$groupTitle"
                                        :url="$result->url"
                                        :isLast="$loop->last"
                                    />
                                @endforeach
                            </ul>
                        </li>
                @endforeach
            @endif
        </ul>
    @endif
</div>
