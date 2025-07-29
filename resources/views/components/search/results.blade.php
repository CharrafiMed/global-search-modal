@props([
    'results',
])

@php
    $NotFoundView = $this->getConfigs()->getNotFoundView();
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
            <x-global-search-modal::search.no-results/>
        @else
            {!! $NotFoundView->render() !!}
        @endunless
    @else
        <ul
        >
            @foreach ($results->getCategories() as $groupTitle => $groupedResults)
                <x-global-search-modal::search.grouped-results
                    :groupTitle="$groupTitle"
                    :results="$groupedResults"
                />
            @endforeach
        </ul>
    @endif
</div>
