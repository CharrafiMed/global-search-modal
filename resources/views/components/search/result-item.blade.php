@php
    $hasSearchItemTree =$this->getConfigs()->hasSearchItemTree();
@endphp
@props([
    'actions' => [],
    'details' => [],
    'title',
    'isLast',
    'url',
])

<li
    {{ $attributes->class([
        'fi-global-search-result scroll-mt-9  my-1 dark:bg-white/5 duration-300 transition-colors rounded-lg   focus-within:bg-gray-50 hover:bg-gray-50 dark:focus-within:bg-white/5 dark:hover:bg-white/10'
        ]) }}
>
    <a
        {{ \Filament\Support\generate_href_html($url) }}
        x-on:click="close()"
        @class([
            'fi-global-search-result-link block outline-none',
            'pe-4 ps-4 pt-4' => $actions,
            'p-3' => ! $actions,
        ])
    >
        <h4 @class([
            'text-sm text-start font-medium text-gray-950 dark:text-white',
            'flex items-center gap-2' => $hasSearchItemTree
            ])>
            @if ($hasSearchItemTree)
                @unless ($isLast)
                <x-global-search-modal::icon.item-tree/>
                @else
                    <x-global-search-modal::icon.item-end-tree/>
                @endunless                
            @endif
            @if ($mustHighlightResults)
                <span x-html="highlightMatchingLetters(@js($title), $wire.search)">
                </span>
            @else
                <span>{{ $title }}</span>
            @endif

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
