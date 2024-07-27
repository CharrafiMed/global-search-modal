export default () => ({
    search_history: [],
    favorite_items: [],
    maxItemsAllowed: 10,

    init: function () {
        this.search_history = JSON.parse(localStorage.getItem("search_history")) || [];
        this.favorite_items = JSON.parse(localStorage.getItem("favorite_items")) || [];
        this.$watch("search_history", (val) => {
            localStorage.setItem("search_history", JSON.stringify(val));
        });
        this.$watch("favorite_items", (val) => {
            localStorage.setItem("favorite_items", JSON.stringify(val));
        });
    },

    highlightMatchingLetters(result, query, classes="", styles="") {
        const lowerCaseQuery = query.toLowerCase();
        let highlightedTitle = "";
        let index = result.toLowerCase().indexOf(lowerCaseQuery);

        while (index !== -1) {
            highlightedTitle += result.substring(0, index);
            highlightedTitle += 
                `
                <span 
                    class=${classes}
                    style="${styles}"
                >
                ${result.substring(index, index + query.length)}
                </span>
                `;
            result = result.substring(index + query.length);
            index = result.toLowerCase().indexOf(lowerCaseQuery);
        }

        highlightedTitle += result;
        return highlightedTitle;
    },
  
    addToSearchHistory: function (searchItem) {
        const searchItemObject = { result: searchItem };
        let history_data = this.search_history.filter(
            (el) => el.result !== searchItemObject.result
        );
        history_data = [searchItemObject, ...history_data].slice(
            0,
            this.maxItemsAllowed
        );
        this.search_history = history_data;
    },
  
    deleteFromHistory: function (searchItem) {
        let index = this.search_history.findIndex(
            (el) => el.result === searchItem
        );
        if (index !== -1) {
            this.search_history.splice(index, 1);
        }
    },
   
    deleteAllHistory: function () {
        this.search_history = [];
    },
   
    addToFavorites: function (favItem) {
        const favItemObject = { result: favItem };
        let favorite_items = this.favorite_items.filter(
            (el) => el.result !== favItemObject.result
        );
        favorite_items = [favItemObject, ...favorite_items].slice(
            0,
            this.maxItemsAllowed
        );
        this.favorite_items = favorite_items;
    },
    deleteFromFavorites: function (favItemToDelete) {
        let index = this.favorite_items.findIndex(
            (el) => el.result === favItemToDelete
        );
        if (index !== -1) {
            this.favorite_items.splice(index, 1);
        }
    },
    deleteAllFavorites: function () {
        this.favorite_items = [];
    },
});

