@props(['actions'])
@php
    $shouldAssociateGroups=$this->getConfigs()->shouldAssociateGroups();
@endphp
<li
    class="fi-global-search-result my-1 mr-1 flex scroll-mt-9 items-center justify-between rounded-lg bg-gray-50 px-3 py-4 transition-colors duration-300 focus-within:bg-gray-100 hover:bg-gray-100 dark:bg-white/5 dark:focus-within:bg-white/5 dark:hover:bg-white/10">
    <a class="fi-global-search-result-link f outline-none" href="#">
        @if ($shouldAssociateGroups)
            <span
                class="rounded-full bg-gray-200 px-4 py-[0.5px] uppercase text-gray-950/90 dark:bg-white/10 dark:text-white"
                x-text="result.group">
            </span>
        @endif
        <h4 @class([
            'text-sm text-start font-medium text-gray-950 dark:text-white',
        ])>
            {{ $slot }}
        </h4>
    </a>
    @if (filled($actions))
        <span class="actions-wrapper flex items-center">
            {{ $actions }}
        </span>
    @endif
</li>
