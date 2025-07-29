<form 
    class="relative grid grid-cols-[auto_1fr] w-full items-center border-b border-gray-100 dark:border-gray-700 px-1 pt-0.5 pb-1.5"
>
    <label 
        class="flex min-w-[1.5rem] pr-2 items-center justify-center text-gray-300/40 dark:text-white/30"
        id="search-label" 
        for="search-input"
    >
        <x-filament::icon 
            :icon="\Filament\Support\Icons\Heroicon::MagnifyingGlass" 
            class="fi-size-lg transition-all"    
            wire:loading.class="hidden"
        />
        <x-filament::loading-indicator
            class="fi-size-lg hidden transition-all"
            wire:loading.class.remove="hidden"
        />
    </label>
    
    <x-global-search-modal::search.input 
        :placeholder="$this->getConfigs()->getPlaceholder()"
        :maxlength="$this->getConfigs()->getSearchInputMaxLength()"
    />
</form>