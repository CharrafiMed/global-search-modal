@props([
    'actions' => [],
    'details' => [],
    'title',
    'isLast',
    'url',
])

<li
    {{ $attributes->class([
        'fi-global-search-result scroll-mt-9 hover:bg-white/5 duration-300 transition-colors rounded-lg   focus-within:bg-gray-50 hover:bg-gray-50 dark:focus-within:bg-white/5 dark:hover:bg-white/5'
        ]) }}
>
    <a
        {{ \Filament\Support\generate_href_html($url) }}
        x-on:click="close()"
        @class([
            'fi-global-search-result-link block outline-none',
            'pe-4 ps-4 pt-4' => $actions,
            'p-4' => ! $actions,
        ])
    >
        <h4 class="text-sm text-start flex items-center font-medium text-gray-950 dark:text-white gap-2">
            @unless ($isLast)
                <svg class="w-6 h-12 stroke-2 text-gray-500 opacity-50" viewBox="0 0 24 54">
                    <g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8 6v42M20 27H8.3">
                        </path>
                    </g>
                </svg>
            @else
                <svg class="w-6 h-12 stroke-2 text-gray-500 opacity-50" viewBox="0 0 24 54">
                    <g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8 6v21M20 27H8.3">
                        </path>
                    </g>
                </svg>
            @endunless
             
            <span>
                {{ $title }}
            </span>
        </h4>

        @if ($details)
            <dl class="mt-1">
                @foreach ($details as $label => $value)
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        @if ($isAssoc ??= \Illuminate\Support\Arr::isAssoc($details))
                            <dt class="inline font-medium">{{ $label }}:</dt>
                        @endif

                        <dd class="inline">{{ $value }}</dd>
                    </div>
                @endforeach
            </dl>
        @endif
    </a>

</li>
