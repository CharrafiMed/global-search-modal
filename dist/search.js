// resources/js/search.js
function searchComponent({
  recentSearchesKey,
  favoriteSearchesKey,
  maxItemsAllowed,
  retainRecentIfFavorite
}) {
  return {
    search_history: [],
    favorite_items: [],
    init() {
      this.search_history = this.getLocalStorage(recentSearchesKey);
      this.favorite_items = this.getLocalStorage(favoriteSearchesKey);
      this.$watch(
        "search_history",
        (val) => this.setLocalStorage(recentSearchesKey, val)
      );
      this.$watch(
        "favorite_items",
        (val) => this.setLocalStorage(favoriteSearchesKey, val)
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
        ...list.filter((el) => !(el.title === newItem.title && el.group === newItem.group))
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
    }
  };
}
export {
  searchComponent as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL3NlYXJjaC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VhcmNoQ29tcG9uZW50KHtcclxuICAgIHJlY2VudFNlYXJjaGVzS2V5LFxyXG4gICAgZmF2b3JpdGVTZWFyY2hlc0tleSxcclxuICAgIG1heEl0ZW1zQWxsb3dlZCxcclxuICAgIHJldGFpblJlY2VudElmRmF2b3JpdGVcclxufSkge1xyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgc2VhcmNoX2hpc3Rvcnk6IFtdLFxyXG4gICAgICAgIGZhdm9yaXRlX2l0ZW1zOiBbXSxcclxuXHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeSA9IHRoaXMuZ2V0TG9jYWxTdG9yYWdlKHJlY2VudFNlYXJjaGVzS2V5KTtcclxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZV9pdGVtcyA9IHRoaXMuZ2V0TG9jYWxTdG9yYWdlKGZhdm9yaXRlU2VhcmNoZXNLZXkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goXCJzZWFyY2hfaGlzdG9yeVwiLCAodmFsKSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVjZW50U2VhcmNoZXNLZXksIHZhbClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goXCJmYXZvcml0ZV9pdGVtc1wiLCAodmFsKSA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoZmF2b3JpdGVTZWFyY2hlc0tleSwgdmFsKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldExvY2FsU3RvcmFnZShrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkgfHwgW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZUxpc3QobGlzdCwgbmV3SXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbSxcclxuICAgICAgICAgICAgICAgIC4uLmxpc3QuZmlsdGVyKChlbCkgPT4gIShlbC50aXRsZSA9PT0gbmV3SXRlbS50aXRsZSAmJiBlbC5ncm91cCA9PT0gbmV3SXRlbS5ncm91cCkpLFxyXG4gICAgICAgICAgICBdLnNsaWNlKDAsIG1heEl0ZW1zQWxsb3dlZCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkVG9TZWFyY2hIaXN0b3J5KHNlYXJjaEl0ZW0sIGdyb3VwLCB1cmwpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VhcmNoSXRlbU9iamVjdCA9IHsgdGl0bGU6IHNlYXJjaEl0ZW0sIGdyb3VwLCB1cmwgfTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeSA9IHRoaXMudXBkYXRlTGlzdChcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoX2hpc3RvcnksXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hJdGVtT2JqZWN0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZXRlRnJvbUhpc3Rvcnkoc2VhcmNoSXRlbSwgZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hfaGlzdG9yeSA9IHRoaXMuc2VhcmNoX2hpc3RvcnkuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgKGVsKSA9PiAhKGVsLnRpdGxlID09PSBzZWFyY2hJdGVtICYmIGVsLmdyb3VwID09PSBncm91cClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWxldGVBbGxIaXN0b3J5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaF9oaXN0b3J5ID0gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkVG9GYXZvcml0ZXMoZmF2SXRlbSwgZ3JvdXAsIHVybCkge1xyXG4gICAgICAgICAgICBpZiAoIXJldGFpblJlY2VudElmRmF2b3JpdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlRnJvbUhpc3RvcnkoZmF2SXRlbSwgZ3JvdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGZhdkl0ZW1PYmplY3QgPSB7IHRpdGxlOiBmYXZJdGVtLCBncm91cCwgdXJsIH07XHJcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVfaXRlbXMgPSB0aGlzLnVwZGF0ZUxpc3QoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhdm9yaXRlX2l0ZW1zLFxyXG4gICAgICAgICAgICAgICAgZmF2SXRlbU9iamVjdFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlbGV0ZUZyb21GYXZvcml0ZXMoZmF2SXRlbSwgZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZV9pdGVtcyA9IHRoaXMuZmF2b3JpdGVfaXRlbXMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgKGVsKSA9PiAhKGVsLnRpdGxlID09PSBmYXZJdGVtICYmIGVsLmdyb3VwID09PSBncm91cClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWxldGVBbGxGYXZvcml0ZXMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGVfaXRlbXMgPSBbXTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59OyJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLGdCQUFpQztBQUFBLEVBQ3BDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0osR0FBRztBQUNDLFNBQU87QUFBQSxJQUVILGdCQUFnQixDQUFDO0FBQUEsSUFDakIsZ0JBQWdCLENBQUM7QUFBQSxJQUVqQixPQUFPO0FBQ0gsV0FBSyxpQkFBaUIsS0FBSyxnQkFBZ0IsaUJBQWlCO0FBQzVELFdBQUssaUJBQWlCLEtBQUssZ0JBQWdCLG1CQUFtQjtBQUU5RCxXQUFLO0FBQUEsUUFBTztBQUFBLFFBQWtCLENBQUMsUUFDM0IsS0FBSyxnQkFBZ0IsbUJBQW1CLEdBQUc7QUFBQSxNQUMvQztBQUNBLFdBQUs7QUFBQSxRQUFPO0FBQUEsUUFBa0IsQ0FBQyxRQUMzQixLQUFLLGdCQUFnQixxQkFBcUIsR0FBRztBQUFBLE1BQ2pEO0FBQUEsSUFDSjtBQUFBLElBRUEsZ0JBQWdCLEtBQUs7QUFDakIsYUFBTyxLQUFLLE1BQU0sYUFBYSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFBQSxJQUNyRDtBQUFBLElBRUEsZ0JBQWdCLEtBQUssT0FBTztBQUN4QixtQkFBYSxRQUFRLEtBQUssS0FBSyxVQUFVLEtBQUssQ0FBQztBQUFBLElBQ25EO0FBQUEsSUFFQSxXQUFXLE1BQU0sU0FBUztBQUN0QixhQUFPO0FBQUEsUUFDSDtBQUFBLFFBQ0EsR0FBRyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxVQUFVLFFBQVEsU0FBUyxHQUFHLFVBQVUsUUFBUSxNQUFNO0FBQUEsTUFDdEYsRUFBRSxNQUFNLEdBQUcsZUFBZTtBQUFBLElBQzlCO0FBQUEsSUFFQSxtQkFBbUIsWUFBWSxPQUFPLEtBQUs7QUFDdkMsWUFBTSxtQkFBbUIsRUFBRSxPQUFPLFlBQVksT0FBTyxJQUFJO0FBQ3pELFdBQUssaUJBQWlCLEtBQUs7QUFBQSxRQUN2QixLQUFLO0FBQUEsUUFDTDtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFFQSxrQkFBa0IsWUFBWSxPQUFPO0FBQ2pDLFdBQUssaUJBQWlCLEtBQUssZUFBZTtBQUFBLFFBQ3RDLENBQUMsT0FBTyxFQUFFLEdBQUcsVUFBVSxjQUFjLEdBQUcsVUFBVTtBQUFBLE1BQ3REO0FBQUEsSUFDSjtBQUFBLElBRUEsbUJBQW1CO0FBQ2YsV0FBSyxpQkFBaUIsQ0FBQztBQUFBLElBQzNCO0FBQUEsSUFFQSxlQUFlLFNBQVMsT0FBTyxLQUFLO0FBQ2hDLFVBQUksQ0FBQyx3QkFBd0I7QUFDekIsYUFBSyxrQkFBa0IsU0FBUyxLQUFLO0FBQUEsTUFDekM7QUFDQSxZQUFNLGdCQUFnQixFQUFFLE9BQU8sU0FBUyxPQUFPLElBQUk7QUFDbkQsV0FBSyxpQkFBaUIsS0FBSztBQUFBLFFBQ3ZCLEtBQUs7QUFBQSxRQUNMO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUVBLG9CQUFvQixTQUFTLE9BQU87QUFDaEMsV0FBSyxpQkFBaUIsS0FBSyxlQUFlO0FBQUEsUUFDdEMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxVQUFVLFdBQVcsR0FBRyxVQUFVO0FBQUEsTUFDbkQ7QUFBQSxJQUNKO0FBQUEsSUFFQSxxQkFBcUI7QUFDakIsV0FBSyxpQkFBaUIsQ0FBQztBQUFBLElBQzNCO0FBQUEsRUFDSjtBQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=
