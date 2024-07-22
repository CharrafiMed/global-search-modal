@props([
    'results',
])

<div
    x-data="{}"
    {{
        $attributes->class([
            'fi-global-search-modal-results-ctn  z-10 w-full mt-1 overflow-auto  bg-white shadow-lg ring-1 ring-gray-950/5 transition dark:bg-gray-900 dark:ring-white/10 ',
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
        <ul class="divide-y divide-gray-200 dark:divide-white/10">
            @foreach ($results->getCategories() as $group => $groupedResults)
                <x-global-search-modal::search.result-group
                    :label="$group"
                    :results="$groupedResults"
                />
            @endforeach
        </ul>
    @endif
</div>
