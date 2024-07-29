<div class="summary-wrapper">
    <div x-show="search_history.length > 0">
        <ul>
            <template x-for="(result,index) in search_history ">
                <li class="fi-global-search-result scroll-mt-9  my-1 dark:bg-white/5 duration-300 transition-colors rounded-lg   focus-within:bg-gray-50 hover:bg-gray-50 dark:focus-within:bg-white/5 dark:hover:bg-white/10">
                    <a href="#" class="fi-global-search-result-link block outline-none">
                        <h4
                        @class([
                        'text-sm text-start font-medium text-gray-950 dark:text-white',
                        ])>
                        <span x-text="result.item">
                        </span>
                    </h4>
                    </a>
                </li>
            </template>
        </ul>
    </div>

    <div x-show="favorite_items.length > 0">
        the favorites is exist
    </div>
</div>
