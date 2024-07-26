@props([
    'groupTitle',
    'results',
])

<li
    {{ $attributes->class(['fi-global-search-result-group']) }}
>
    <div
        class="top-0 z-10 border-b border-gray-200  dark:border-white/10 "
    >
        <h3
            class="px-4 py-2 text-sm text-start font-semibold capitalize text-gray-950  dark:text-white"
        >
            {{ $groupTitle }}
        </h3>
    </div>

    <ul class="divide-y divide-gray-200 dark:divide-white/10" x-animate>
        @foreach ($results as $result)
            <x-global-search-modal::search.native.result-item
                :actions="$result->actions"
                :details="$result->details"
                :title="$result->title"
                :url="$result->url"
            />
        @endforeach
    </ul>
</li>
