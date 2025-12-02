<div
x-data="{
    handleKeyUp(){
        const focusedEl = $focus.focused();
        
        // If at first element, go to search input
        if($focus.getFirst() === focusedEl){
            document.getElementById('search-input').focus();
            return;
        }
        
        // If on action button, check if it's first action in the li
        if (focusedEl.hasAttribute('data-action')) {
            const parentLi = focusedEl.closest('li');
            const actions = parentLi.querySelectorAll('[data-action]');
            if (actions[0] === focusedEl) {
                // Focus the link in the same li
                parentLi.querySelector('a').focus();
                return;
            }
        }
        
        $focus.previous();
    },
    
    handleKeyDown(){
        const focusedEl = $focus.focused();
        
        // If on link (a tag), go to first action if it exists
        if(focusedEl.tagName === 'A'){
            const actions = focusedEl.closest('li').querySelectorAll('[data-action]');
            if(actions.length > 0){
                actions[0].focus();
                return;
            }
        }
        
        $focus.wrap().next(); 
    }
}"   
x-on:focus-first-element.window="$focus.first()"
x-on:keydown.up.stop.prevent="handleKeyUp()"
x-on:keydown.down.stop.prevent="handleKeyDown()" 
class="global-search-modal w-full">
    <template x-if="search_history.length > 0">
        <div>
            <div class="top-0 z-10">
                <h3
                    class="relative flex flex-1 flex-col justify-center overflow-x-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-start text-[0.9em] font-semibold capitalize text-violet-600 dark:text-violet-500   ">
                    {{__('recent')}}
                </h3>
            </div>
            <ul x-animate>
                <template x-for="(result,index) in search_history">
                    <x-global-search-modal::search.summary.item
                        x-bind:key="index"
                    >
                        <span x-html="result.title" />
                        <x-slot:actions>
                            <x-global-search-modal::search.action-button
                                title="delete"
                                x-on:click.stop="deleteFromHistory(result.title, result.group)"
                                :icon="\Filament\Support\Icons\Heroicon::OutlinedXMark"
                            />
                            <x-global-search-modal::search.action-button
                                title="favorite this item"
                                x-on:click.stop="addToFavorites(result.title, result.group, result.url)"
                                :icon="\Filament\Support\Icons\Heroicon::OutlinedStar"
                            />
                        </x-slot:actions>
                    </x-global-search-modal::search.summary.item>
                </template>
            </ul>
        
    </div>
</template>
<template x-if="favorite_items.length > 0">
    <div>
        <div class="top-0 z-10">
            <h3
                class="relative flex flex-1 flex-col justify-center overflow-x-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-start text-[0.9em] font-semibold capitalize text-violet-600 dark:text-violet-500   ">
                {{__('favorites')}}
            </h3>
        </div>
        <ul x-animate>
            <template x-for="(result,index) in favorite_items">
                <x-global-search-modal::search.summary.item
                    x-bind:key="index"
                >
                    <span x-html="result.title">
                    </span>
                    <x-slot:actions>
                        <x-global-search-modal::search.action-button
                            title="delete"
                            x-on:click.stop="deleteFromFavorites(result.title, result.group)"
                            :icon="\Filament\Support\Icons\Heroicon::OutlinedXMark"
                        />
                    </x-slot:actions>
                </x-global-search-modal::search.summary.item>
            </template>
        </ul>
</div>
</template>
</div>
