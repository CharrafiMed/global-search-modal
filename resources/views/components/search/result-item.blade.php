@props([
    'actions' => [],
    'details' => [],
    'title',
    'rawTitle',
    'group',
    'isLast',
    'url',
    'hasSearchItemTree' => true,
])

<li
    {{ 
    $attributes->class([
        'fi-global-search-result scroll-mt-9 mr-3 my-1 dark:bg-white/5 bg-gray-50 py-2 px-3 duration-300 transition-colors rounded-lg focus:border-gray-500  focus-within:bg-gray-100 hover:bg-gray-100 dark:focus-within:bg-white/5 dark:hover:bg-white/10 flex justify-between items-center group',
    ]) 
    }} role="option">
    <a 
        {{ \Filament\Support\generate_href_html($url) }}
        x-on:click.stop="$store.globalSearchModalStore.hideModal()"
        x-on:click="addToSearchHistory(@js($rawTitle),@js($group),@js($url))"

        @class([
            'fi-global-search-result-link block outline-none group-focus-within:bg-gray-100  focus:border group-focus-within:dark:bg-white/5',
            'pe-4 ps-4 pt-4' => $actions,
            'p-3' => !$actions,
        ])
        >
        <h4 
            @class([
            'text-sm text-start font-medium text-gray-950 dark:text-white',
            'flex items-center gap-2' => $hasSearchItemTree,
        ])>

            @if ($hasSearchItemTree)
                @unless ($isLast)
                    <x-global-search-modal::icon.item-tree />
                @else
                    <x-global-search-modal::icon.item-end-tree />
                @endunless
            @endif

            <span>
                {{ str($title)->sanitizeHtml()->toHtmlString() }}
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
