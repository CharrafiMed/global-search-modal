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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL3NlYXJjaC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VhcmNoKHtcclxuICByZWNlbnRTZWFyY2hlc0tleSxcclxuICBmYXZvcml0ZVNlYXJjaGVzS2V5LFxyXG4gIG1heEl0ZW1zQWxsb3dlZCxcclxuICByZXRhaW5SZWNlbnRJZkZhdm9yaXRlXHJcbn0pIHtcclxuICByZXR1cm4ge1xyXG4gICAgc2VhcmNoX2hpc3Rvcnk6IFtdLFxyXG4gICAgZmF2b3JpdGVfaXRlbXM6IFtdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeSA9IHRoaXMuZ2V0SW5pdGlhbEl0ZW1zKHJlY2VudFNlYXJjaGVzS2V5KTtcclxuICAgICAgdGhpcy5mYXZvcml0ZV9pdGVtcyA9IHRoaXMuZ2V0SW5pdGlhbEl0ZW1zKGZhdm9yaXRlU2VhcmNoZXNLZXkpO1xyXG5cclxuICAgICAgdGhpcy4kd2F0Y2goXCJzZWFyY2hfaGlzdG9yeVwiLCAodmFscykgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yYWdlKHJlY2VudFNlYXJjaGVzS2V5LCB2YWxzKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJHdhdGNoKFwiZmF2b3JpdGVfaXRlbXNcIiwgKHZhbHMpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxvY2FsU3RvcmFnZShmYXZvcml0ZVNlYXJjaGVzS2V5LCB2YWxzKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5pdGlhbEl0ZW1zOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpIHx8IFtdO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZUxvY2FsU3RvcmFnZTogZnVuY3Rpb24gKGtleSwgdmFscykge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTdHJpbmcoa2V5KSwgSlNPTi5zdHJpbmdpZnkodmFscykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRUb1NlYXJjaEhpc3Rvcnk6IGZ1bmN0aW9uIChzZWFyY2hJdGVtLCBncm91cCwgdXJsKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaEl0ZW1PYmplY3QgPSB7IGl0ZW06IHNlYXJjaEl0ZW0sIGdyb3VwLCB1cmwgfTtcclxuICAgICAgbGV0IGhpc3RvcnlfZGF0YSA9IHRoaXMuc2VhcmNoX2hpc3RvcnkuZmlsdGVyKFxyXG4gICAgICAgIChlbCkgPT5cclxuICAgICAgICAgICEoXHJcbiAgICAgICAgICAgIGVsLml0ZW0gPT09IHNlYXJjaEl0ZW1PYmplY3QuaXRlbSAmJlxyXG4gICAgICAgICAgICBlbC5ncm91cCA9PT0gc2VhcmNoSXRlbU9iamVjdC5ncm91cFxyXG4gICAgICAgICAgKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaGlzdG9yeV9kYXRhID0gW3NlYXJjaEl0ZW1PYmplY3QsIC4uLmhpc3RvcnlfZGF0YV0uc2xpY2UoXHJcbiAgICAgICAgMCxcclxuICAgICAgICBtYXhJdGVtc0FsbG93ZWRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuc2VhcmNoX2hpc3RvcnkgPSBoaXN0b3J5X2RhdGE7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZUZyb21IaXN0b3J5OiBmdW5jdGlvbiAoc2VhcmNoSXRlbSwgZ3JvdXApIHtcclxuICAgICAgbGV0IGluZGV4ID0gdGhpcy5zZWFyY2hfaGlzdG9yeS5maW5kSW5kZXgoXHJcbiAgICAgICAgKGVsKSA9PiBlbC5pdGVtID09PSBzZWFyY2hJdGVtICYmIGVsLmdyb3VwID09PSBncm91cFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZUFsbEhpc3Rvcnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeSA9IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRUb0Zhdm9yaXRlczogZnVuY3Rpb24gKGZhdkl0ZW0sIGdyb3VwLCB1cmwpIHtcclxuICAgICAgaWYoIXJldGFpblJlY2VudElmRmF2b3JpdGUpe1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRnJvbUhpc3RvcnkoZmF2SXRlbSxncm91cCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZmF2SXRlbU9iamVjdCA9IHsgaXRlbTogZmF2SXRlbSwgZ3JvdXAsIHVybCB9O1xyXG4gICAgICBsZXQgZmF2b3JpdGVfaXRlbXMgPSB0aGlzLmZhdm9yaXRlX2l0ZW1zLmZpbHRlcihcclxuICAgICAgICAoZWwpID0+XHJcbiAgICAgICAgICAhKGVsLml0ZW0gPT09IGZhdkl0ZW1PYmplY3QuaXRlbSAmJiBlbC5ncm91cCA9PT0gZmF2SXRlbU9iamVjdC5ncm91cClcclxuICAgICAgKTtcclxuICAgICAgZmF2b3JpdGVfaXRlbXMgPSBbZmF2SXRlbU9iamVjdCwgLi4uZmF2b3JpdGVfaXRlbXNdLnNsaWNlKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgbWF4SXRlbXNBbGxvd2VkXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZmF2b3JpdGVfaXRlbXMgPSBmYXZvcml0ZV9pdGVtcztcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlRnJvbUZhdm9yaXRlczogZnVuY3Rpb24gKGZhdkl0ZW1Ub0RlbGV0ZSwgZ3JvdXApIHtcclxuICAgICAgbGV0IGluZGV4ID0gdGhpcy5mYXZvcml0ZV9pdGVtcy5maW5kSW5kZXgoXHJcbiAgICAgICAgKGVsKSA9PiBlbC5pdGVtID09PSBmYXZJdGVtVG9EZWxldGUgJiYgZWwuZ3JvdXAgPT09IGdyb3VwXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLmZhdm9yaXRlX2l0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlQWxsRmF2b3JpdGVzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZmF2b3JpdGVfaXRlbXMgPSBbXTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixPQUF3QjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsR0FBRztBQUNELFNBQU87QUFBQSxJQUNMLGdCQUFnQixDQUFDO0FBQUEsSUFDakIsZ0JBQWdCLENBQUM7QUFBQSxJQUVqQixNQUFNLFdBQVk7QUFDaEIsV0FBSyxpQkFBaUIsS0FBSyxnQkFBZ0IsaUJBQWlCO0FBQzVELFdBQUssaUJBQWlCLEtBQUssZ0JBQWdCLG1CQUFtQjtBQUU5RCxXQUFLLE9BQU8sa0JBQWtCLENBQUMsU0FBUztBQUN0QyxhQUFLLG1CQUFtQixtQkFBbUIsSUFBSTtBQUFBLE1BQ2pELENBQUM7QUFDRCxXQUFLLE9BQU8sa0JBQWtCLENBQUMsU0FBUztBQUN0QyxhQUFLLG1CQUFtQixxQkFBcUIsSUFBSTtBQUFBLE1BQ25ELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxpQkFBaUIsU0FBVSxLQUFLO0FBQzlCLGFBQU8sS0FBSyxNQUFNLGFBQWEsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQUEsSUFDbkQ7QUFBQSxJQUNBLG9CQUFvQixTQUFVLEtBQUssTUFBTTtBQUN2QyxtQkFBYSxRQUFRLE9BQU8sR0FBRyxHQUFHLEtBQUssVUFBVSxJQUFJLENBQUM7QUFBQSxJQUN4RDtBQUFBLElBRUEsb0JBQW9CLFNBQVUsWUFBWSxPQUFPLEtBQUs7QUFDcEQsWUFBTSxtQkFBbUIsRUFBRSxNQUFNLFlBQVksT0FBTyxJQUFJO0FBQ3hELFVBQUksZUFBZSxLQUFLLGVBQWU7QUFBQSxRQUNyQyxDQUFDLE9BQ0MsRUFDRSxHQUFHLFNBQVMsaUJBQWlCLFFBQzdCLEdBQUcsVUFBVSxpQkFBaUI7QUFBQSxNQUVwQztBQUVBLHFCQUFlLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxFQUFFO0FBQUEsUUFDakQ7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFdBQUssaUJBQWlCO0FBQUEsSUFDeEI7QUFBQSxJQUVBLG1CQUFtQixTQUFVLFlBQVksT0FBTztBQUM5QyxVQUFJLFFBQVEsS0FBSyxlQUFlO0FBQUEsUUFDOUIsQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjLEdBQUcsVUFBVTtBQUFBLE1BQ2pEO0FBQ0EsVUFBSSxVQUFVLElBQUk7QUFDaEIsYUFBSyxlQUFlLE9BQU8sT0FBTyxDQUFDO0FBQUEsTUFDckM7QUFBQSxJQUNGO0FBQUEsSUFFQSxrQkFBa0IsV0FBWTtBQUM1QixXQUFLLGlCQUFpQixDQUFDO0FBQUEsSUFDekI7QUFBQSxJQUVBLGdCQUFnQixTQUFVLFNBQVMsT0FBTyxLQUFLO0FBQzdDLFVBQUcsQ0FBQyx3QkFBdUI7QUFDekIsYUFBSyxrQkFBa0IsU0FBUSxLQUFLO0FBQUEsTUFDdEM7QUFDQSxZQUFNLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxPQUFPLElBQUk7QUFDbEQsVUFBSSxpQkFBaUIsS0FBSyxlQUFlO0FBQUEsUUFDdkMsQ0FBQyxPQUNDLEVBQUUsR0FBRyxTQUFTLGNBQWMsUUFBUSxHQUFHLFVBQVUsY0FBYztBQUFBLE1BQ25FO0FBQ0EsdUJBQWlCLENBQUMsZUFBZSxHQUFHLGNBQWMsRUFBRTtBQUFBLFFBQ2xEO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFDQSxXQUFLLGlCQUFpQjtBQUFBLElBQ3hCO0FBQUEsSUFFQSxxQkFBcUIsU0FBVSxpQkFBaUIsT0FBTztBQUNyRCxVQUFJLFFBQVEsS0FBSyxlQUFlO0FBQUEsUUFDOUIsQ0FBQyxPQUFPLEdBQUcsU0FBUyxtQkFBbUIsR0FBRyxVQUFVO0FBQUEsTUFDdEQ7QUFDQSxVQUFJLFVBQVUsSUFBSTtBQUNoQixhQUFLLGVBQWUsT0FBTyxPQUFPLENBQUM7QUFBQSxNQUNyQztBQUFBLElBQ0Y7QUFBQSxJQUVBLG9CQUFvQixXQUFZO0FBQzlCLFdBQUssaUJBQWlCLENBQUM7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
