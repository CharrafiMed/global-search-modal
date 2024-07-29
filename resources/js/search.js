export default function search(
  recentSearchesKey,
  favoriteSearchesKey,
  maxItemsAllowed
) {
  return {
    search_history: [],
    favorite_items: [],

    init: function () {
      this.search_history = this.getInitialItems(recentSearchesKey);
      this.favorite_items = this.getInitialItems(favoriteSearchesKey);
      this.$watch("search_history", (val) => {
        this.updateLocalStorage(recentSearchesKey, val);
      });
      this.$watch("favorite_items", (val) => {
        this.updateLocalStorage(favoriteSearchesKey, val);
      });
    },
    getInitialItems: function (key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    updateLocalStorage: function (key, vals) {
      localStorage.setItem(String(key), JSON.stringify(vals));
    },

    addToSearchHistory: function (searchItem) {
        console.log('add search item clicked');
      const searchItemObject = { item: searchItem };
      let history_data = this.search_history.filter(
        (el) => el.item !== searchItemObject.item
      );
      history_data = [searchItemObject, ...history_data].slice(
        0,
        maxItemsAllowed
      );
      this.search_history = history_data;
    },

    deleteFromHistory: function (searchItem) {
      let index = this.search_history.findIndex((el) => el.item === searchItem);
      if (index !== -1) {
        this.search_history.splice(index, 1);
      }
    },

    deleteAllHistory: function () {
      this.search_history = [];
    },

    addToFavorites: function (favItem) {
      const favItemObject = { item: favItem };
      let favorite_items = this.favorite_items.filter(
        (el) => el.item !== favItemObject.item
      );
      favorite_items = [favItemObject, ...favorite_items].slice(
        0,
        maxItemsAllowed
      );
      this.favorite_items = favorite_items;
    },
    deleteFromFavorites: function (favItemToDelete) {
      let index = this.favorite_items.findIndex(
        (el) => el.item === favItemToDelete
      );
      if (index !== -1) {
        this.favorite_items.splice(index, 1);
      }
    },
    deleteAllFavorites: function () {
      this.favorite_items = [];
    },
  };
}
