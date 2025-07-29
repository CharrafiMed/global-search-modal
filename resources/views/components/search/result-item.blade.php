@props([
    'actions' => [],
    'details' => [],
    'title',
    'rawTitle',
    'group',
    'isLast',
    'url',
    'hasExpandedUrlTarget'
])

@php
$classes = [
    // background
    'dark:bg-[--alpha(white_/_3%)] bg-[--alpha(var(--color-gray-900)_/_5%)]',
    
    // Focus within because the focus target a tag and not this LI (for proper accessibilty)
    'focus-within:dark:bg-[--alpha(white_/_8%)] focus-within:bg-[--alpha(var(--color-gray-900)_/_8%)]', 
    
    // Hover 
    'hover:bg-[--alpha(var(--color-gray-900)_/_8%)] dark:hover:bg-[--alpha(white_/_10%)]',
    
    ' my-1 py-2 px-3 duration-300 transition-colors rounded-lg flex justify-between items-center'
];
@endphp

<li
    {{ $attributes->class(Arr::toCssClasses($classes)) }} 
    role="option"
>
    <a 
        {{ \Filament\Support\generate_href_html($url) }}

        x-on:keydown.enter.stop="$store.globalSearchModalStore.hideModal();addToSearchHistory(@js($rawTitle),@js($group),@js($url))"

        x-on:click="$data.close();addToSearchHistory(@js($rawTitle),@js($group),@js($url))"

        @class([
            'fi-global-search-result-link block outline-none w-full',
            'pe-4 ps-4 pt-4' => $actions,
            'p-3' => !$actions,
        ])
    >

        <h4 
            @class([
            'text-sm text-start font-medium text-gray-950 dark:text-white',
        ])>
            <span>
                {{ str($title)->sanitizeHtml()->toHtmlString() }}
            </span>
        </h4>

        @if ($details)
        <dl class="mt-1 ml-1">
            @foreach ($details as $label => $value)
                <div 
                    class="text-sm text-gray-500 dark:text-gray-400 
                        flex items-center justify-start"
                    >
                    @if ($isAssoc ??= \Illuminate\Support\Arr::isAssoc($details))
                        <dt 
                            class="inline font-medium" 
                            style="margin-right: 3px; paddings-right:1px;"
                        >{{ $label }}:
                    </dt>
                    @endif

                    <dd class="inline">{{ $value }}</dd>
                </div>
            @endforeach
        </dl>
    @endif
    </a>

</li>