@props([
    'actions'
])
<li class="fi-global-search-result scroll-mt-9 mr-1 my-1 dark:bg-white/5 bg-gray-50 py-4 px-3 duration-300 transition-colors rounded-lg   focus-within:bg-gray-100 hover:bg-gray-100 dark:focus-within:bg-white/5 dark:hover:bg-white/10 flex justify-between items-center">
    <a href="#" class="fi-global-search-result-link  outline-none f">
    <span
        x-text="result.group"
        class="rounded-full bg-slate-500 uppercase text-gray-950 dark:text-white" 
    >
    </span>
        <h4
            @class([
                'text-sm text-start font-medium text-gray-950 dark:text-white',
            ])
        >
        {{ $slot }}
    </h4>
    </a>
    @if(filled($actions))
        <span class="actions-wrapper flex items-center  ">
            {{ $actions }}
        </span>
    @endif
</li>