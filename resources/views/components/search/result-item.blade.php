@props([
    'title',
    'rawTitle',
    'group',
    'isLast',
    'url',
    'result'
])

@php
$classes = [
    // background
    'dark:bg-[--alpha(white_/_3%)] bg-[--alpha(var(--color-gray-900)_/_5%)]',
    
    // Focus within because the focus target a tag and not this LI (for proper accessibility)
    'focus-within:dark:bg-[--alpha(white_/_8%)] focus-within:bg-[--alpha(var(--color-gray-900)_/_8%)]', 
    
    // Hover 
    'hover:bg-[--alpha(var(--color-gray-900)_/_8%)] dark:hover:bg-[--alpha(white_/_10%)]',
    
    ' my-1 py-2 px-3 duration-300 transition-colors rounded-lg flex justify-between items-center'
];

$isAssoc = \Illuminate\Support\Arr::isAssoc($result->details);

@endphp

<li
    {{ $attributes->class(Arr::toCssClasses($classes)) }} 
    role="option"
>
    <a 
        {{ \Filament\Support\generate_href_html($url) }}

        x-on:keydown.enter.stop="addToSearchHistory(@js($rawTitle),@js($group),@js($url))"

        x-on:click="$data.close();addToSearchHistory(@js($rawTitle),@js($group),@js($url))"

        @class([
            'fi-global-search-result-link block outline-none w-full',
            'pe-4 ps-4 pt-4' => $result->actions,
            'p-3' => !$result->actions,
        ])
    >

        <h4 
            @class([
                'text-sm text-start font-medium text-gray-950 dark:text-white',
            ])
        >
            <span>
                {{ str($title)->sanitizeHtml()->toHtmlString() }}
            </span>
        </h4>

        @if ($result->details)
            <dl class="mt-1 ml-1">
                @foreach ($result->details as $label => $value)
                    <div 
                        class="text-sm text-gray-500 dark:text-gray-400 
                            flex items-center justify-start"
                    >
                        @if ($isAssoc)
                            <dt 
                                class="inline font-medium" 
                                style="margin-right: 3px; padding-right: 1px;"
                            >{{ $label }}:
                            </dt>
                        @endif

                        <dd class="inline">{{ $value }}</dd>
                    </div>
                @endforeach
            </dl>
        @endif
    </a>
    
    @if ($resultVisibleActions = $result->getVisibleActions())
        <div class="fi-global-search-result-actions">
            @foreach ($resultVisibleActions as $action)
                {{ $action }}
            @endforeach
        </div>
    @endif
</li>