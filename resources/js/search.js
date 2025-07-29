export default ({
    recentSearchesKey,
    favoriteSearchesKey,
    maxItemsAllowed,
    retainRecentIfFavorite
}) => ({
    search_history: [],
    favorite_items: [],

    init() {
        this.search_history = this.getLocalStorage(recentSearchesKey);
        this.favorite_items = this.getLocalStorage(favoriteSearchesKey);

        this.$watch("search_history", (val) =>
            this.setLocalStorage(recentSearchesKey, val)
        );
        this.$watch("favorite_items", (val) =>
            this.setLocalStorage(favoriteSearchesKey, val)
        );
    },

    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    updateList(list, newItem) {
        return [
            newItem,
            ...list.filter((el) => !(el.title === newItem.title && el.group === newItem.group)),
        ].slice(0, maxItemsAllowed);
    },

    addToSearchHistory(searchItem, group, url) {
        const searchItemObject = { title: searchItem, group, url };
        this.search_history = this.updateList(
            this.search_history,
            searchItemObject
        );
    },

    deleteFromHistory(searchItem, group) {
        this.search_history = this.search_history.filter(
            (el) => !(el.title === searchItem && el.group === group)
        );
    },

    deleteAllHistory() {
        this.search_history = [];
    },

    addToFavorites(favItem, group, url) {
        if (!retainRecentIfFavorite) {
            this.deleteFromHistory(favItem, group);
        }
        const favItemObject = { title: favItem, group, url };
        this.favorite_items = this.updateList(
            this.favorite_items,
            favItemObject
        );
    },

    deleteFromFavorites(favItem, group) {
        this.favorite_items = this.favorite_items.filter(
            (el) => !(el.title === favItem && el.group === group)
        );
    },

    deleteAllFavorites() {
        this.favorite_items = [];
    },
});