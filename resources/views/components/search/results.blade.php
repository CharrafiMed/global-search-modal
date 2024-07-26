@props([
    'results',
])

<div
    x-data
    x-on:keydown.up.prevent="$focus.wrap().previous()"
    x-on:keydown.down.prevent="$focus.wrap().next()"
    {{
        $attributes->class([
            'fi-global-search-modal-results-ctn flex-1 z-10 w-full mt-1 overflow-y-auto h-full  bg-white shadow-lg ring-1 ring-gray-950/5 transition dark:bg-transparent dark:ring-white/10  ',
            // This zero translation along the z-axis fixes a Safari bug
            // where the results container is incorrectly placed in the stacking context
            // due to the overflow-x value of clip on the topbar element.
            //
            // https://github.com/filamentphp/filament/issues/8215
            '[transform:translateZ(0)]',
        ])
    }}
>
    @if ($results->getCategories()->isEmpty())
        <x-global-search-modal::search.no-results/>
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
