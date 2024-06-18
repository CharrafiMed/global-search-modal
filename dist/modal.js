// resources/js/modal.js
function modal() {
  return {
    observer: null,
    open: false,
    init: function() {
      this.initObserver();
    },
    initObserver: function() {
      const targetSelector = ".fi-topbar";
      const observerConfig = {
        childList: true,
        subtree: true
      };
      const observerCallback = (mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === "childList") {
            Array.from(mutation.addedNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE).forEach((node) => {
              this.checkForTargetClass(node);
            });
          }
        });
      };
      this.observer = new MutationObserver(observerCallback);
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        this.observer.observe(targetElement, observerConfig);
      }
    },
    checkForTargetClass: function(node) {
      if (node.classList.contains("fi-global-search-field")) {
        console.log("added");
        node.addEventListener("click", () => {
          Alpine.store("modalStore").showModal();
          node.style.display = "none";
        });
      }
      Array.from(node.children).filter((child) => child.nodeType === Node.ELEMENT_NODE).forEach((child) => {
        this.checkForTargetClass(child);
      });
    }
  };
}
export {
  modal as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2RhbCgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2JzZXJ2ZXI6IG51bGwsXHJcbiAgICBvcGVuOiBmYWxzZSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcclxuICAgIH0sXHJcbiAgICBpbml0T2JzZXJ2ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBcIi5maS10b3BiYXJcIjtcclxuICAgICAgY29uc3Qgb2JzZXJ2ZXJDb25maWcgPSB7XHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IG9ic2VydmVyQ2FsbGJhY2sgPSAobXV0YXRpb25zTGlzdCkgPT4ge1xyXG4gICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20obXV0YXRpb24uYWRkZWROb2RlcylcclxuICAgICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIob2JzZXJ2ZXJDYWxsYmFjayk7XHJcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcclxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWxlbWVudCwgb2JzZXJ2ZXJDb25maWcpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRkZWRcIik7XHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgQWxwaW5lLnN0b3JlKFwibW9kYWxTdG9yZVwiKS5zaG93TW9kYWwoKTtcclxuICAgICAgICAgIC8vIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICBub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhjaGlsZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsUUFBeUI7QUFDOUIsU0FBTztBQUFBLElBQ0wsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sTUFBTSxXQUFZO0FBQ2hCLFdBQUssYUFBYTtBQUFBLElBQ3BCO0FBQUEsSUFDQSxjQUFjLFdBQVk7QUFDeEIsWUFBTSxpQkFBaUI7QUFDdkIsWUFBTSxpQkFBaUI7QUFBQSxRQUNyQixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsTUFDWDtBQUNBLFlBQU0sbUJBQW1CLENBQUMsa0JBQWtCO0FBQzFDLHNCQUFjLFFBQVEsQ0FBQyxhQUFhO0FBQ2xDLGNBQUksU0FBUyxTQUFTLGFBQWE7QUFDakMsa0JBQU0sS0FBSyxTQUFTLFVBQVUsRUFDM0IsT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLEtBQUssWUFBWSxFQUNwRCxRQUFRLENBQUMsU0FBUztBQUNqQixtQkFBSyxvQkFBb0IsSUFBSTtBQUFBLFlBQy9CLENBQUM7QUFBQSxVQUNMO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUNBLFdBQUssV0FBVyxJQUFJLGlCQUFpQixnQkFBZ0I7QUFDckQsWUFBTSxnQkFBZ0IsU0FBUyxjQUFjLGNBQWM7QUFDM0QsVUFBSSxlQUFlO0FBQ2pCLGFBQUssU0FBUyxRQUFRLGVBQWUsY0FBYztBQUFBLE1BQ3JEO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCLFNBQVUsTUFBTTtBQUNuQyxVQUFJLEtBQUssVUFBVSxTQUFTLHdCQUF3QixHQUFHO0FBQ3JELGdCQUFRLElBQUksT0FBTztBQUNuQixhQUFLLGlCQUFpQixTQUFTLE1BQU07QUFDbkMsaUJBQU8sTUFBTSxZQUFZLEVBQUUsVUFBVTtBQUVyQyxlQUFLLE1BQU0sVUFBVTtBQUFBLFFBQ3ZCLENBQUM7QUFBQSxNQUNIO0FBQ0EsWUFBTSxLQUFLLEtBQUssUUFBUSxFQUNyQixPQUFPLENBQUMsVUFBVSxNQUFNLGFBQWEsS0FBSyxZQUFZLEVBQ3RELFFBQVEsQ0FBQyxVQUFVO0FBQ2xCLGFBQUssb0JBQW9CLEtBQUs7QUFBQSxNQUNoQyxDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
