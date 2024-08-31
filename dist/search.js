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
      console.log(recentSearchesKey);
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
      console.log("add search item clicked");
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
      console.log("deleted clicked");
      console.log(searchItem, group);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL3NlYXJjaC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VhcmNoKHtcclxuICByZWNlbnRTZWFyY2hlc0tleSxcclxuICBmYXZvcml0ZVNlYXJjaGVzS2V5LFxyXG4gIG1heEl0ZW1zQWxsb3dlZCxcclxuICByZXRhaW5SZWNlbnRJZkZhdm9yaXRlXHJcbn0pIHtcclxuICByZXR1cm4ge1xyXG4gICAgc2VhcmNoX2hpc3Rvcnk6IFtdLFxyXG4gICAgZmF2b3JpdGVfaXRlbXM6IFtdLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVjZW50U2VhcmNoZXNLZXkpO1xyXG4gICAgICB0aGlzLnNlYXJjaF9oaXN0b3J5ID0gdGhpcy5nZXRJbml0aWFsSXRlbXMocmVjZW50U2VhcmNoZXNLZXkpO1xyXG4gICAgICB0aGlzLmZhdm9yaXRlX2l0ZW1zID0gdGhpcy5nZXRJbml0aWFsSXRlbXMoZmF2b3JpdGVTZWFyY2hlc0tleSk7XHJcblxyXG4gICAgICB0aGlzLiR3YXRjaChcInNlYXJjaF9oaXN0b3J5XCIsICh2YWxzKSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMb2NhbFN0b3JhZ2UocmVjZW50U2VhcmNoZXNLZXksIHZhbHMpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy4kd2F0Y2goXCJmYXZvcml0ZV9pdGVtc1wiLCAodmFscykgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTG9jYWxTdG9yYWdlKGZhdm9yaXRlU2VhcmNoZXNLZXksIHZhbHMpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnZXRJbml0aWFsSXRlbXM6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkgfHwgW107XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoa2V5LCB2YWxzKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFN0cmluZyhrZXkpLCBKU09OLnN0cmluZ2lmeSh2YWxzKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFRvU2VhcmNoSGlzdG9yeTogZnVuY3Rpb24gKHNlYXJjaEl0ZW0sIGdyb3VwLCB1cmwpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJhZGQgc2VhcmNoIGl0ZW0gY2xpY2tlZFwiKTtcclxuICAgICAgY29uc3Qgc2VhcmNoSXRlbU9iamVjdCA9IHsgaXRlbTogc2VhcmNoSXRlbSwgZ3JvdXAsIHVybCB9O1xyXG4gICAgICBsZXQgaGlzdG9yeV9kYXRhID0gdGhpcy5zZWFyY2hfaGlzdG9yeS5maWx0ZXIoXHJcbiAgICAgICAgKGVsKSA9PlxyXG4gICAgICAgICAgIShcclxuICAgICAgICAgICAgZWwuaXRlbSA9PT0gc2VhcmNoSXRlbU9iamVjdC5pdGVtICYmXHJcbiAgICAgICAgICAgIGVsLmdyb3VwID09PSBzZWFyY2hJdGVtT2JqZWN0Lmdyb3VwXHJcbiAgICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBoaXN0b3J5X2RhdGEgPSBbc2VhcmNoSXRlbU9iamVjdCwgLi4uaGlzdG9yeV9kYXRhXS5zbGljZShcclxuICAgICAgICAwLFxyXG4gICAgICAgIG1heEl0ZW1zQWxsb3dlZFxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeSA9IGhpc3RvcnlfZGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlRnJvbUhpc3Rvcnk6IGZ1bmN0aW9uIChzZWFyY2hJdGVtLCBncm91cCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBjbGlja2VkJyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHNlYXJjaEl0ZW0sZ3JvdXApXHJcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuc2VhcmNoX2hpc3RvcnkuZmluZEluZGV4KFxyXG4gICAgICAgIChlbCkgPT4gZWwuaXRlbSA9PT0gc2VhcmNoSXRlbSAmJiBlbC5ncm91cCA9PT0gZ3JvdXBcclxuICAgICAgKTtcclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoX2hpc3Rvcnkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVBbGxIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuc2VhcmNoX2hpc3RvcnkgPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkVG9GYXZvcml0ZXM6IGZ1bmN0aW9uIChmYXZJdGVtLCBncm91cCwgdXJsKSB7XHJcbiAgICAgIGlmKCFyZXRhaW5SZWNlbnRJZkZhdm9yaXRlKXtcclxuICAgICAgICB0aGlzLmRlbGV0ZUZyb21IaXN0b3J5KGZhdkl0ZW0sZ3JvdXApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGZhdkl0ZW1PYmplY3QgPSB7IGl0ZW06IGZhdkl0ZW0sIGdyb3VwLCB1cmwgfTtcclxuICAgICAgbGV0IGZhdm9yaXRlX2l0ZW1zID0gdGhpcy5mYXZvcml0ZV9pdGVtcy5maWx0ZXIoXHJcbiAgICAgICAgKGVsKSA9PlxyXG4gICAgICAgICAgIShlbC5pdGVtID09PSBmYXZJdGVtT2JqZWN0Lml0ZW0gJiYgZWwuZ3JvdXAgPT09IGZhdkl0ZW1PYmplY3QuZ3JvdXApXHJcbiAgICAgICk7XHJcbiAgICAgIGZhdm9yaXRlX2l0ZW1zID0gW2Zhdkl0ZW1PYmplY3QsIC4uLmZhdm9yaXRlX2l0ZW1zXS5zbGljZShcclxuICAgICAgICAwLFxyXG4gICAgICAgIG1heEl0ZW1zQWxsb3dlZFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmZhdm9yaXRlX2l0ZW1zID0gZmF2b3JpdGVfaXRlbXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZUZyb21GYXZvcml0ZXM6IGZ1bmN0aW9uIChmYXZJdGVtVG9EZWxldGUsIGdyb3VwKSB7XHJcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuZmF2b3JpdGVfaXRlbXMuZmluZEluZGV4KFxyXG4gICAgICAgIChlbCkgPT4gZWwuaXRlbSA9PT0gZmF2SXRlbVRvRGVsZXRlICYmIGVsLmdyb3VwID09PSBncm91cFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5mYXZvcml0ZV9pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZUFsbEZhdm9yaXRlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmZhdm9yaXRlX2l0ZW1zID0gW107XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsT0FBd0I7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQUc7QUFDRCxTQUFPO0FBQUEsSUFDTCxnQkFBZ0IsQ0FBQztBQUFBLElBQ2pCLGdCQUFnQixDQUFDO0FBQUEsSUFFakIsTUFBTSxXQUFZO0FBQ2hCLGNBQVEsSUFBSSxpQkFBaUI7QUFDN0IsV0FBSyxpQkFBaUIsS0FBSyxnQkFBZ0IsaUJBQWlCO0FBQzVELFdBQUssaUJBQWlCLEtBQUssZ0JBQWdCLG1CQUFtQjtBQUU5RCxXQUFLLE9BQU8sa0JBQWtCLENBQUMsU0FBUztBQUN0QyxhQUFLLG1CQUFtQixtQkFBbUIsSUFBSTtBQUFBLE1BQ2pELENBQUM7QUFDRCxXQUFLLE9BQU8sa0JBQWtCLENBQUMsU0FBUztBQUN0QyxhQUFLLG1CQUFtQixxQkFBcUIsSUFBSTtBQUFBLE1BQ25ELENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxpQkFBaUIsU0FBVSxLQUFLO0FBQzlCLGFBQU8sS0FBSyxNQUFNLGFBQWEsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQUEsSUFDbkQ7QUFBQSxJQUNBLG9CQUFvQixTQUFVLEtBQUssTUFBTTtBQUN2QyxtQkFBYSxRQUFRLE9BQU8sR0FBRyxHQUFHLEtBQUssVUFBVSxJQUFJLENBQUM7QUFBQSxJQUN4RDtBQUFBLElBRUEsb0JBQW9CLFNBQVUsWUFBWSxPQUFPLEtBQUs7QUFDcEQsY0FBUSxJQUFJLHlCQUF5QjtBQUNyQyxZQUFNLG1CQUFtQixFQUFFLE1BQU0sWUFBWSxPQUFPLElBQUk7QUFDeEQsVUFBSSxlQUFlLEtBQUssZUFBZTtBQUFBLFFBQ3JDLENBQUMsT0FDQyxFQUNFLEdBQUcsU0FBUyxpQkFBaUIsUUFDN0IsR0FBRyxVQUFVLGlCQUFpQjtBQUFBLE1BRXBDO0FBRUEscUJBQWUsQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLEVBQUU7QUFBQSxRQUNqRDtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsV0FBSyxpQkFBaUI7QUFBQSxJQUN4QjtBQUFBLElBRUEsbUJBQW1CLFNBQVUsWUFBWSxPQUFPO0FBQzlDLGNBQVEsSUFBSSxpQkFBaUI7QUFDN0IsY0FBUSxJQUFJLFlBQVcsS0FBSztBQUM1QixVQUFJLFFBQVEsS0FBSyxlQUFlO0FBQUEsUUFDOUIsQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjLEdBQUcsVUFBVTtBQUFBLE1BQ2pEO0FBQ0EsVUFBSSxVQUFVLElBQUk7QUFDaEIsYUFBSyxlQUFlLE9BQU8sT0FBTyxDQUFDO0FBQUEsTUFDckM7QUFBQSxJQUNGO0FBQUEsSUFFQSxrQkFBa0IsV0FBWTtBQUM1QixXQUFLLGlCQUFpQixDQUFDO0FBQUEsSUFDekI7QUFBQSxJQUVBLGdCQUFnQixTQUFVLFNBQVMsT0FBTyxLQUFLO0FBQzdDLFVBQUcsQ0FBQyx3QkFBdUI7QUFDekIsYUFBSyxrQkFBa0IsU0FBUSxLQUFLO0FBQUEsTUFDdEM7QUFDQSxZQUFNLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxPQUFPLElBQUk7QUFDbEQsVUFBSSxpQkFBaUIsS0FBSyxlQUFlO0FBQUEsUUFDdkMsQ0FBQyxPQUNDLEVBQUUsR0FBRyxTQUFTLGNBQWMsUUFBUSxHQUFHLFVBQVUsY0FBYztBQUFBLE1BQ25FO0FBQ0EsdUJBQWlCLENBQUMsZUFBZSxHQUFHLGNBQWMsRUFBRTtBQUFBLFFBQ2xEO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFDQSxXQUFLLGlCQUFpQjtBQUFBLElBQ3hCO0FBQUEsSUFFQSxxQkFBcUIsU0FBVSxpQkFBaUIsT0FBTztBQUNyRCxVQUFJLFFBQVEsS0FBSyxlQUFlO0FBQUEsUUFDOUIsQ0FBQyxPQUFPLEdBQUcsU0FBUyxtQkFBbUIsR0FBRyxVQUFVO0FBQUEsTUFDdEQ7QUFDQSxVQUFJLFVBQVUsSUFBSTtBQUNoQixhQUFLLGVBQWUsT0FBTyxPQUFPLENBQUM7QUFBQSxNQUNyQztBQUFBLElBQ0Y7QUFBQSxJQUVBLG9CQUFvQixXQUFZO0FBQzlCLFdBQUssaUJBQWlCLENBQUM7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
