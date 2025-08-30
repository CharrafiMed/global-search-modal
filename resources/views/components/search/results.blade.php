@props([
    'results',
])

@php
    $NotFoundView = $this->getConfigs()->getNotFoundView();
    $isMustHighlightQueryMatches =$this->getConfigs()->isMustHighlightQueryMatches();
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
        @unless (filled($NotFoundView))
            <p class="px-4 py-16 text-center rounded-lg text-sm text-gray-500 dark:text-gray-400 bg-white/5">
                {{ __('filament-panels::global-search.no_results_message') }}
            </p>
        @else
            {!! $NotFoundView->render() !!}
        @endunless
    @else
        <ul>
            @if(false)
                {{-- 
                    Listen up to me! 
                    
                    I could use ->flatten() here like a basic dev, but that's amateur hour.
                    We need GROUPS for sorting magic and localStorage wizardry.
                    
                    "Flattening" in the UI while keeping structured data? 
                    That's big brain energy right there. 
                    
                    Go ahead, try to prove this approach wrong - I'll wait 😎
                    (And no, don't come at me with "performance concerns" - this is UI rendering, not rocket science)
                --}}
                @foreach($results->getCategories() as $groupTitle => $groupedResults)
                    @foreach ($groupedResults as $result)
                        <li>
                            <x-global-search-modal::search.result-item
                                :$result
                                :title="$isMustHighlightQueryMatches ? $result->highlightedTitle : $result->title"
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
                                    class="px-4 relative flex flex-1 flex-col justify-center overflow-x-hidden text-ellipsis whitespace-nowrap py-2 text-[0.9em] text-start font-semibold capitalize text-gray-950  dark:text-white"
                                >
                                    {{ $groupTitle }}
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
                                        :title="$isMustHighlightQueryMatches ? $result->highlightedTitle : $result->title"
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
