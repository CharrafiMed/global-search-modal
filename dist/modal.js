// resources/js/modal.js
var modal_default = () => ({
  observer: null,
  init: function() {
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
      node.addEventListener("click", () => {
        console.log("clicked on fi-global-search-field element");
        node.dispatchEvent(new CustomEvent("global-search-input-clicked"));
        node.disabled = true;
        node.remove();
      });
    }
    Array.from(node.children).filter((child) => child.nodeType === Node.ELEMENT_NODE).forEach((child) => {
      this.checkForTargetClass(child);
    });
  }
});
export {
  modal_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xyXG4gIG9ic2VydmVyOiBudWxsLFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIHRoaXMuaW5pdE9ic2VydmVyKCk7XHJcbiAgfSxcclxuICBpbml0T2JzZXJ2ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gXCIuZmktdG9wYmFyXCI7XHJcbiAgICBjb25zdCBvYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9ic2VydmVyQ2FsbGJhY2sgPSAobXV0YXRpb25zTGlzdCkgPT4ge1xyXG4gICAgICBtdXRhdGlvbnNMaXN0LmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgIEFycmF5LmZyb20obXV0YXRpb24uYWRkZWROb2RlcylcclxuICAgICAgICAgICAgLmZpbHRlcigobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihvYnNlcnZlckNhbGxiYWNrKTtcclxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcclxuICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50LCBvYnNlcnZlckNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja0ZvclRhcmdldENsYXNzOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiKSkge1xyXG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIG9uIGZpLWdsb2JhbC1zZWFyY2gtZmllbGQgZWxlbWVudFwiKTtcclxuICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiZ2xvYmFsLXNlYXJjaC1pbnB1dC1jbGlja2VkXCIpKTtcclxuICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyBSZW1vdmUgdGhlIGlucHV0IGZyb20gdGhlIERPTVxyXG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKVxyXG4gICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKVxyXG4gICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICB0aGlzLmNoZWNrRm9yVGFyZ2V0Q2xhc3MoY2hpbGQpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLElBQU8sZ0JBQVEsT0FBTztBQUFBLEVBQ3BCLFVBQVU7QUFBQSxFQUNWLE1BQU0sV0FBWTtBQUFBLEVBRWxCO0FBQUEsRUFDQSxjQUFjLFdBQVk7QUFDeEIsVUFBTSxpQkFBaUI7QUFDdkIsVUFBTSxpQkFBaUI7QUFBQSxNQUNyQixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWDtBQUNBLFVBQU0sbUJBQW1CLENBQUMsa0JBQWtCO0FBQzFDLG9CQUFjLFFBQVEsQ0FBQyxhQUFhO0FBQ2xDLFlBQUksU0FBUyxTQUFTLGFBQWE7QUFDakMsZ0JBQU0sS0FBSyxTQUFTLFVBQVUsRUFDM0IsT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLEtBQUssWUFBWSxFQUNwRCxRQUFRLENBQUMsU0FBUztBQUNqQixpQkFBSyxvQkFBb0IsSUFBSTtBQUFBLFVBQy9CLENBQUM7QUFBQSxRQUNMO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUNBLFNBQUssV0FBVyxJQUFJLGlCQUFpQixnQkFBZ0I7QUFDckQsVUFBTSxnQkFBZ0IsU0FBUyxjQUFjLGNBQWM7QUFDM0QsUUFBSSxlQUFlO0FBQ2pCLFdBQUssU0FBUyxRQUFRLGVBQWUsY0FBYztBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUFBLEVBQ0EscUJBQXFCLFNBQVUsTUFBTTtBQUNuQyxRQUFJLEtBQUssVUFBVSxTQUFTLHdCQUF3QixHQUFHO0FBQ3JELFdBQUssaUJBQWlCLFNBQVMsTUFBTTtBQUNuQyxnQkFBUSxJQUFJLDJDQUEyQztBQUN2RCxhQUFLLGNBQWMsSUFBSSxZQUFZLDZCQUE2QixDQUFDO0FBQ2pFLGFBQUssV0FBVztBQUVoQixhQUFLLE9BQU87QUFBQSxNQUNkLENBQUM7QUFBQSxJQUNIO0FBQ0EsVUFBTSxLQUFLLEtBQUssUUFBUSxFQUNyQixPQUFPLENBQUMsVUFBVSxNQUFNLGFBQWEsS0FBSyxZQUFZLEVBQ3RELFFBQVEsQ0FBQyxVQUFVO0FBQ2xCLFdBQUssb0JBQW9CLEtBQUs7QUFBQSxJQUNoQyxDQUFDO0FBQUEsRUFDTDtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
