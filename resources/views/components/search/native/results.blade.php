@props([
    'results',
])

<div
    x-data="{
        isOpen: false,

        open: function (event) {
            this.isOpen = true
        },

        close: function (event) {
            this.isOpen = false
        },
    }"
    x-init="$nextTick(() => open())"
    x-on:click.away="close()"
    x-on:keydown.escape.window="close()"
    x-on:keydown.up.prevent="$focus.wrap().previous()"
    x-on:keydown.down.prevent="$focus.wrap().next()"
    x-on:open-global-search-results.window="$nextTick(() => open())"
    x-show="isOpen"
    x-transition:enter-start="opacity-0"
    x-transition:leave-end="opacity-0"
    {{
        $attributes->class([
            'fi-global-search-modal-results-ctn flex-1 z-10 w-full mt-1 overflow-y-auto h-full  bg-white shadow-lg ring-1 ring-gray-950/5 transition dark:bg-gray-900 dark:ring-white/10  ',
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
        <x-global-search-modal::search.native.no-results/>
    @else
        <ul class="divide-y divide-gray-200 dark:divide-white/10" x-animate>
            @foreach ($results->getCategories() as $group => $groupedResults)
                <x-global-search-modal::search.native.result-group
                    :label="$group"
                    :results="$groupedResults"
                />
            @endforeach
        </ul>
    @endif
</div>