<div class="summary-wrapper">
    <div x-show="search_history.length > 0">
        <div class="top-0 z-10">
            <h3
                class="relative flex flex-1 flex-col justify-center overflow-x-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-start text-[0.9em] font-semibold capitalize text-gray-950 dark:text-white">
                Recent
            </h3>
        </div>
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
                            clickFunction="deleteFromHistory(result.title)" 
                            icon="x" 
                            />

                        <x-global-search-modal::search.action-button 
                            title="save this search item"
                            clickFunction="addToFavorites(result.title)" 
                            icon="favorite" 
                            />

                    </x-slot:actions>

                </x-global-search-modal::search.summary.item>
            </template>
        </ul>
    </div>

    <div x-show="favorite_items.length > 0">
        the favorites is exist
    </div>
</div>
