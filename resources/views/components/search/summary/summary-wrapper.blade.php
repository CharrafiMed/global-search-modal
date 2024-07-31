<div class="summary-wrapper">
    <div x-show="search_history.length > 0">
        <x-global-search-modal::search.summary.title title="recent"/>
        <ul>
            <template x-for="(result,index) in search_history ">
                <x-global-search-modal::search.summary.item>
                    <x-slot:slot>
                        <span x-text="result.item">
                        </span>
                    </x-slot:slot>

                    <x-slot:actions>
                        <x-global-search-modal::search.action-button 
                            title="save this search item"
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
        <ul>
            <template x-for="(result,index) in favorite_items ">
                <x-global-search-modal::search.summary.item>
                    <x-slot:slot>
                        <span x-text="result.item">
                        </span>
                    </x-slot:slot>

                    <x-slot:actions>
                        <x-global-search-modal::search.action-button 
                            title="save this search item"
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
