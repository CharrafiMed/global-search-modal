@props([
    'results',
])

@php
    $hasNotFoundView=$this->getConfigs()->hasNotFoundView();
@endphp

<div
    x-on:keydown.up.prevent="$focus.wrap().previous()"
    x-on:keydown.down.prevent="$focus.wrap().next()"
    {{
        $attributes->class([
            'fi-global-search-modal-results-ctn flex-1 z-10 w-full mt-1 overflow-y-auto h-full bg-white shadow-lg transition dark:bg-transparent ',
            '[transform:translateZ(0)]',
        ])
    }}
>
    @if ($results->getCategories()->isEmpty())
        @unless (filled($hasNotFoundView))
            <x-global-search-modal::search.no-results/>
        @else
            {!! $hasNotFoundView->render() !!}
        @endunless
    @else
        <ul x-animate>
            @foreach ($results->getCategories() as $groupTitle => $groupedResults)
                <x-global-search-modal::search.grouped-results
                    :groupTitle="$groupTitle"
                    :results="$groupedResults"
                />
            @endforeach
        </ul>
    @endif
</div>
