<div
x-data="{
    handleKeyUp(){
        focusedEl = $focus.focused()
        if($focus.getFirst() === $focus.focused()){
            document.getElementById('search-input').focus();return
        }
        if (focusedEl.hasAttribute('data-action')) {
            const parentLi = focusedEl.closest('li');
            if (parentLi) {
                const actions = parentLi.querySelectorAll('[data-action]');
                if (Array.from(actions).indexOf(focusedEl) === 0) {
                    parentLi.focus();
                    return;
                }
            }
        }
        $focus.previous()
    },
    handleKeyDown(){
        focusedEl = $focus.focused() 
        if(focusedEl.tagName == 'LI'){
            actions = focusedEl.querySelectorAll('[data-action]');
            if(actions.length > 0){
                actions[0].focus();
                    return;
            }
        }
        $focus.wrap().next(); 
    },
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
                    Recent
                </h3>
            </div>
            <ul x-animate>
                <template x-for="(result,index) in search_history">
                    <x-global-search-modal::search.summary.item
                        x-bind:key="index"
                    >
                        <span x-html="result.title"/>
                        <x-slot:actions>
                            <x-global-search-modal::search.action-button
                                title="delete"
                                clickFunction="deleteFromHistory(result.title,result.group)"
                                :icon="\Filament\Support\Icons\Heroicon::OutlinedXMark"
                            />
                            <x-global-search-modal::search.action-button
                                title="favorite this item"
                                clickFunction="addToFavorites(
                                            result.title,
                                            result.group,
                                            result.url
                                        )"
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
                Favorites
            </h3>
        </div>
        <ul x-animate>
            <template x-for="(result,index) in favorite_items">
                <x-global-search-modal::search.summary.item
                    x-bind:key="index"
                    x-on:click="addToSearchHistory(result.title,result.url)"
                >
                    <span x-html="result.title">
                    </span>
                    <x-slot:actions>
                        <x-global-search-modal::search.action-button
                            title="delete"
                            clickFunction="deleteFromFavorites(result.title,result.group)"
                            :icon="\Filament\Support\Icons\Heroicon::OutlinedXMark"
                        />
                    </x-slot:actions>
                </x-global-search-modal::search.summary.item>
            </template>
        </ul>
</div>
</template>
</div>