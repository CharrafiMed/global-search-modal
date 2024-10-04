<div 
x-on:keydown.up.prevent="$focus.wrap().previous()"
x-on:keydown.down.prevent="$focus.wrap().next()"
x-on:focus-first-element.window="($el.querySelector('.fi-global-search-result-link')?.focus())"
    >
    <div class="summary-wrapper">
        <div x-show="search_history.length > 0">
            <x-global-search-modal::search.summary.title title="recent"/>
            <ul x-animate>
                <template x-for="(result,index) in search_history ">
                    <x-global-search-modal::search.summary.item 
                        x-bind:key="index"
                    >
                        <x-slot:slot>
                            <span x-html="result.item">
                            </span>
                        </x-slot:slot>
    
                        <x-slot:actions>
                            <x-global-search-modal::search.action-button
                                title="delete"
                                clickFunction="deleteFromHistory(result.item, result.group)"
                                icon="x"
                                />
    
                            <x-global-search-modal::search.action-button
                                title="favorite this item"
                                clickFunction="addToFavorites(result.item, result.group)"
                                icon="favorite"
                                />
    
                        </x-slot:actions>
    
                    </x-global-search-modal::search.summary.item>
                </template>
            </ul>
        </div>
        <div x-show="favorite_items.length > 0">
            <x-global-search-modal::search.summary.title title="favorites"/>
            <ul x-animate>
                <template x-for="(result,index) in favorite_items ">
                    <x-global-search-modal::search.summary.item 
                        x-bind:key="index"
                    >
                        <x-slot:slot>
                            <span x-html="result.item">
                            </span>
                        </x-slot:slot>
    
                        <x-slot:actions>
                            <x-global-search-modal::search.action-button
                                title="delete"
                                clickFunction="deleteFromFavorites(
                                    result.item,
                                    result.group
                                    )"
    
                                icon="x"
                                />
                        </x-slot:actions>
    
                    </x-global-search-modal::search.summary.item>
                </template>
            </ul>
        </div>
    </div>
</div>
