export default function search({
  recentSearchesKey,
  favoriteSearchesKey,
  maxItemsAllowed,
  retainRecentIfFavorite
}) {
  return {
    search_history: [],
    favorite_items: [],

    init: function () {
      this.search_history = this.getInitialItems(recentSearchesKey);
      this.favorite_items = this.getInitialItems(favoriteSearchesKey);

      this.$watch("search_history", (vals) => {
        this.updateLocalStorage(recentSearchesKey, vals);
      });
      this.$watch("favorite_items", (vals) => {
        this.updateLocalStorage(favoriteSearchesKey, vals);
      });
    },
    getInitialItems: function (key) {
      return JSON.parse(localStorage.getItem(key)) || [];
    },
    updateLocalStorage: function (key, vals) {
      localStorage.setItem(String(key), JSON.stringify(vals));
    },

    addToSearchHistory: function (searchItem, group, url) {
      const searchItemObject = { item: searchItem, group, url };
      let history_data = this.search_history.filter(
        (el) =>
          !(
            el.item === searchItemObject.item &&
            el.group === searchItemObject.group
          )
      );

      history_data = [searchItemObject, ...history_data].slice(
        0,
        maxItemsAllowed
      );

      this.search_history = history_data;
    },

    deleteFromHistory: function (searchItem, group) {
      let index = this.search_history.findIndex(
        (el) => el.item === searchItem && el.group === group
      );
      if (index !== -1) {
        this.search_history.splice(index, 1);
      }
    },

    deleteAllHistory: function () {
      this.search_history = [];
    },

    addToFavorites: function (favItem, group, url) {
      if(!retainRecentIfFavorite){
        this.deleteFromHistory(favItem,group);
      }
      const favItemObject = { item: favItem, group, url };
      let favorite_items = this.favorite_items.filter(
        (el) =>
          !(el.item === favItemObject.item && el.group === favItemObject.group)
      );
      favorite_items = [favItemObject, ...favorite_items].slice(
        0,
        maxItemsAllowed
      );
      this.favorite_items = favorite_items;
    },

    deleteFromFavorites: function (favItemToDelete, group) {
      let index = this.favorite_items.findIndex(
        (el) => el.item === favItemToDelete && el.group === group
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
