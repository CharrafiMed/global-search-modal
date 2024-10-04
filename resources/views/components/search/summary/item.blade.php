@props(['actions'])
@php
    $shouldAssociateGroups=$this->getConfigs()->shouldAssociateGroups();
@endphp
<li
    {{ $attributes }}
    class="fi-global-search-result my-1 mr-1 flex scroll-mt-9 items-center justify-between rounded-lg bg-gray-50 px-3 py-4 transition-colors duration-300 focus-within:bg-gray-100 hover:bg-gray-100/90 dark:bg-white/5 dark:focus-within:bg-white/5 dark:hover:bg-white/10"
    >
    <a 
        class="fi-global-search-result-link f outline-none"
        x-bind:href="result.url"
        
        x-on:click.stop="
        $store.globalSearchModalStore.hideModal();
        addToSearchHistory(result.item,result.group,result.url)
        "
        
        x-on:keydown.enter.stop="$store.globalSearchModalStore.hideModal()"
        x-on:focus="$el.closest('li').classList.add('focus')"
        x-on:blur="$el.closest('li').classList.remove('focus')"
        >

        @if ($shouldAssociateGroups)
            <span
                class="rounded-xl   text-start flex max-w-fit bg-gray-100 px-4  text-gray-950/50 dark:bg-white/10 dark:text-white "
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
