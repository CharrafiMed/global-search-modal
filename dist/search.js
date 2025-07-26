// resources/js/search.js
function search({
  recentSearchesKey,
  favoriteSearchesKey,
  maxItemsAllowed,
  retainRecentIfFavorite
}) {
  return {
    search_history: [],
    favorite_items: [],
    init: function() {
      this.search_history = this.getInitialItems(recentSearchesKey);
      this.favorite_items = this.getInitialItems(favoriteSearchesKey);
      this.$watch("search_history", (vals) => {
        this.updateLocalStorage(recentSearchesKey, vals);
      });
      this.$watch("favorite_items", (vals) => {
        this.updateLocalStorage(favoriteSearchesKey, vals);
      });
    },
    getInitialItems: function(key) {
      return JSON.parse(localStorage.getItem(key)) || [];
    },
    updateLocalStorage: function(key, vals) {
      localStorage.setItem(String(key), JSON.stringify(vals));
    },
    addToSearchHistory: function(searchItem, group, url) {
      const searchItemObject = { item: searchItem, group, url };
      let history_data = this.search_history.filter(
        (el) => !(el.item === searchItemObject.item && el.group === searchItemObject.group)
      );
      history_data = [searchItemObject, ...history_data].slice(
        0,
        maxItemsAllowed
      );
      this.search_history = history_data;
    },
    deleteFromHistory: function(searchItem, group) {
      let index = this.search_history.findIndex(
        (el) => el.item === searchItem && el.group === group
      );
      if (index !== -1) {
        this.search_history.splice(index, 1);
      }
    },
    deleteAllHistory: function() {
      this.search_history = [];
    },
    addToFavorites: function(favItem, group, url) {
      if (!retainRecentIfFavorite) {
        this.deleteFromHistory(favItem, group);
      }
      const favItemObject = { item: favItem, group, url };
      let favorite_items = this.favorite_items.filter(
        (el) => !(el.item === favItemObject.item && el.group === favItemObject.group)
      );
      favorite_items = [favItemObject, ...favorite_items].slice(
        0,
        maxItemsAllowed
      );
      this.favorite_items = favorite_items;
    },
    deleteFromFavorites: function(favItemToDelete, group) {
      let index = this.favorite_items.findIndex(
        (el) => el.item === favItemToDelete && el.group === group
      );
      if (index !== -1) {
        this.favorite_items.splice(index, 1);
      }
    },
    deleteAllFavorites: function() {
      this.favorite_items = [];
    }
  };
}
export {
  search as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL3NlYXJjaC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VhcmNoKHtcbiAgcmVjZW50U2VhcmNoZXNLZXksXG4gIGZhdm9yaXRlU2VhcmNoZXNLZXksXG4gIG1heEl0ZW1zQWxsb3dlZCxcbiAgcmV0YWluUmVjZW50SWZGYXZvcml0ZVxufSkge1xuICByZXR1cm4ge1xuICAgIHNlYXJjaF9oaXN0b3J5OiBbXSxcbiAgICBmYXZvcml0ZV9pdGVtczogW10sXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNlYXJjaF9oaXN0b3J5ID0gdGhpcy5nZXRJbml0aWFsSXRlbXMocmVjZW50U2VhcmNoZXNLZXkpO1xuICAgICAgdGhpcy5mYXZvcml0ZV9pdGVtcyA9IHRoaXMuZ2V0SW5pdGlhbEl0ZW1zKGZhdm9yaXRlU2VhcmNoZXNLZXkpO1xuXG4gICAgICB0aGlzLiR3YXRjaChcInNlYXJjaF9oaXN0b3J5XCIsICh2YWxzKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yYWdlKHJlY2VudFNlYXJjaGVzS2V5LCB2YWxzKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kd2F0Y2goXCJmYXZvcml0ZV9pdGVtc1wiLCAodmFscykgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsU3RvcmFnZShmYXZvcml0ZVNlYXJjaGVzS2V5LCB2YWxzKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SW5pdGlhbEl0ZW1zOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB8fCBbXTtcbiAgICB9LFxuICAgIHVwZGF0ZUxvY2FsU3RvcmFnZTogZnVuY3Rpb24gKGtleSwgdmFscykge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU3RyaW5nKGtleSksIEpTT04uc3RyaW5naWZ5KHZhbHMpKTtcbiAgICB9LFxuXG4gICAgYWRkVG9TZWFyY2hIaXN0b3J5OiBmdW5jdGlvbiAoc2VhcmNoSXRlbSwgZ3JvdXAsIHVybCkge1xuICAgICAgY29uc3Qgc2VhcmNoSXRlbU9iamVjdCA9IHsgaXRlbTogc2VhcmNoSXRlbSwgZ3JvdXAsIHVybCB9O1xuICAgICAgbGV0IGhpc3RvcnlfZGF0YSA9IHRoaXMuc2VhcmNoX2hpc3RvcnkuZmlsdGVyKFxuICAgICAgICAoZWwpID0+XG4gICAgICAgICAgIShcbiAgICAgICAgICAgIGVsLml0ZW0gPT09IHNlYXJjaEl0ZW1PYmplY3QuaXRlbSAmJlxuICAgICAgICAgICAgZWwuZ3JvdXAgPT09IHNlYXJjaEl0ZW1PYmplY3QuZ3JvdXBcbiAgICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBoaXN0b3J5X2RhdGEgPSBbc2VhcmNoSXRlbU9iamVjdCwgLi4uaGlzdG9yeV9kYXRhXS5zbGljZShcbiAgICAgICAgMCxcbiAgICAgICAgbWF4SXRlbXNBbGxvd2VkXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNlYXJjaF9oaXN0b3J5ID0gaGlzdG9yeV9kYXRhO1xuICAgIH0sXG5cbiAgICBkZWxldGVGcm9tSGlzdG9yeTogZnVuY3Rpb24gKHNlYXJjaEl0ZW0sIGdyb3VwKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLnNlYXJjaF9oaXN0b3J5LmZpbmRJbmRleChcbiAgICAgICAgKGVsKSA9PiBlbC5pdGVtID09PSBzZWFyY2hJdGVtICYmIGVsLmdyb3VwID09PSBncm91cFxuICAgICAgKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBkZWxldGVBbGxIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNlYXJjaF9oaXN0b3J5ID0gW107XG4gICAgfSxcblxuICAgIGFkZFRvRmF2b3JpdGVzOiBmdW5jdGlvbiAoZmF2SXRlbSwgZ3JvdXAsIHVybCkge1xuICAgICAgaWYoIXJldGFpblJlY2VudElmRmF2b3JpdGUpe1xuICAgICAgICB0aGlzLmRlbGV0ZUZyb21IaXN0b3J5KGZhdkl0ZW0sZ3JvdXApO1xuICAgICAgfVxuICAgICAgY29uc3QgZmF2SXRlbU9iamVjdCA9IHsgaXRlbTogZmF2SXRlbSwgZ3JvdXAsIHVybCB9O1xuICAgICAgbGV0IGZhdm9yaXRlX2l0ZW1zID0gdGhpcy5mYXZvcml0ZV9pdGVtcy5maWx0ZXIoXG4gICAgICAgIChlbCkgPT5cbiAgICAgICAgICAhKGVsLml0ZW0gPT09IGZhdkl0ZW1PYmplY3QuaXRlbSAmJiBlbC5ncm91cCA9PT0gZmF2SXRlbU9iamVjdC5ncm91cClcbiAgICAgICk7XG4gICAgICBmYXZvcml0ZV9pdGVtcyA9IFtmYXZJdGVtT2JqZWN0LCAuLi5mYXZvcml0ZV9pdGVtc10uc2xpY2UoXG4gICAgICAgIDAsXG4gICAgICAgIG1heEl0ZW1zQWxsb3dlZFxuICAgICAgKTtcbiAgICAgIHRoaXMuZmF2b3JpdGVfaXRlbXMgPSBmYXZvcml0ZV9pdGVtcztcbiAgICB9LFxuXG4gICAgZGVsZXRlRnJvbUZhdm9yaXRlczogZnVuY3Rpb24gKGZhdkl0ZW1Ub0RlbGV0ZSwgZ3JvdXApIHtcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuZmF2b3JpdGVfaXRlbXMuZmluZEluZGV4KFxuICAgICAgICAoZWwpID0+IGVsLml0ZW0gPT09IGZhdkl0ZW1Ub0RlbGV0ZSAmJiBlbC5ncm91cCA9PT0gZ3JvdXBcbiAgICAgICk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZmF2b3JpdGVfaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsZXRlQWxsRmF2b3JpdGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmZhdm9yaXRlX2l0ZW1zID0gW107XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJt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
