// resources/js/globalModal.js
var globalModal_default = (Alpine) => {
  Alpine.data("GlobalSearchModalComponent", () => ({
    observer: null,
    init: function() {
      this.initObserver();
    },
    initObserver() {
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
    checkForTargetClass(node) {
      if (node.classList.contains("fi-global-search-field")) {
        node.addEventListener("click", () => {
          console.log("clicked on fi-global-search-field element");
          node.dispatchEvent(new CustomEvent("global-search-input-clicked"));
          node.disabled = true;
          node.remove();
        });
        return;
      }
      Array.from(node.children).filter((child) => child.nodeType === Node.ELEMENT_NODE).forEach((child) => {
        this.checkForTargetClass(child);
      });
    }
  }));
};

// resources/js/index.js
document.addEventListener("alpine:init", () => {
  window.Alpine.plugin(globalModal_default);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL2dsb2JhbE1vZGFsLmpzIiwgIi4uL3Jlc291cmNlcy9qcy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgKEFscGluZSkgPT4ge1xyXG4gIEFscGluZS5kYXRhKFwiR2xvYmFsU2VhcmNoTW9kYWxDb21wb25lbnRcIiwgKCkgPT4gKHtcclxuICAgIG9ic2VydmVyOiBudWxsLFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xyXG4gICAgfSxcclxuICAgIGluaXRPYnNlcnZlcigpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBcIi5maS10b3BiYXJcIjtcclxuICAgICAgY29uc3Qgb2JzZXJ2ZXJDb25maWcgPSB7XHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IG9ic2VydmVyQ2FsbGJhY2sgPSAobXV0YXRpb25zTGlzdCkgPT4ge1xyXG4gICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20obXV0YXRpb24uYWRkZWROb2RlcylcclxuICAgICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIob2JzZXJ2ZXJDYWxsYmFjayk7XHJcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcclxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWxlbWVudCwgb2JzZXJ2ZXJDb25maWcpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrRm9yVGFyZ2V0Q2xhc3Mobm9kZSkge1xyXG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJmaS1nbG9iYWwtc2VhcmNoLWZpZWxkXCIpKSB7XHJcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIG9uIGZpLWdsb2JhbC1zZWFyY2gtZmllbGQgZWxlbWVudFwiKTtcclxuICAgICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJnbG9iYWwtc2VhcmNoLWlucHV0LWNsaWNrZWRcIikpO1xyXG4gICAgICAgICAgbm9kZS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIGlucHV0IGZyb20gdGhlIERPTVxyXG4gICAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICAgIC8vIERpc3BhdGNoIGFuIGV2ZW50IG9yIHBlcmZvcm0gYWN0aW9ucyB3aGVuIGNsaWNrZWRcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrRm9yVGFyZ2V0Q2xhc3MoY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9KSk7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2xvYmFsTW9kYWwgZnJvbSBcIi4vZ2xvYmFsTW9kYWxcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FscGluZTppbml0JywgKCkgPT4ge1xyXG4gIHdpbmRvdy5BbHBpbmUucGx1Z2luKGdsb2JhbE1vZGFsKTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxJQUFPLHNCQUFRLENBQUMsV0FBVztBQUN6QixTQUFPLEtBQUssOEJBQThCLE9BQU87QUFBQSxJQUMvQyxVQUFVO0FBQUEsSUFDVixNQUFNLFdBQVk7QUFDaEIsV0FBSyxhQUFhO0FBQUEsSUFDcEI7QUFBQSxJQUNBLGVBQWU7QUFDYixZQUFNLGlCQUFpQjtBQUN2QixZQUFNLGlCQUFpQjtBQUFBLFFBQ3JCLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxNQUNYO0FBQ0EsWUFBTSxtQkFBbUIsQ0FBQyxrQkFBa0I7QUFDMUMsc0JBQWMsUUFBUSxDQUFDLGFBQWE7QUFDbEMsY0FBSSxTQUFTLFNBQVMsYUFBYTtBQUNqQyxrQkFBTSxLQUFLLFNBQVMsVUFBVSxFQUMzQixPQUFPLENBQUMsU0FBUyxLQUFLLGFBQWEsS0FBSyxZQUFZLEVBQ3BELFFBQVEsQ0FBQyxTQUFTO0FBQ2pCLG1CQUFLLG9CQUFvQixJQUFJO0FBQUEsWUFDL0IsQ0FBQztBQUFBLFVBQ0w7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQ0EsV0FBSyxXQUFXLElBQUksaUJBQWlCLGdCQUFnQjtBQUNyRCxZQUFNLGdCQUFnQixTQUFTLGNBQWMsY0FBYztBQUMzRCxVQUFJLGVBQWU7QUFDakIsYUFBSyxTQUFTLFFBQVEsZUFBZSxjQUFjO0FBQUEsTUFDckQ7QUFBQSxJQUNGO0FBQUEsSUFFQSxvQkFBb0IsTUFBTTtBQUN4QixVQUFJLEtBQUssVUFBVSxTQUFTLHdCQUF3QixHQUFHO0FBQ3JELGFBQUssaUJBQWlCLFNBQVMsTUFBTTtBQUNuQyxrQkFBUSxJQUFJLDJDQUEyQztBQUN2RCxlQUFLLGNBQWMsSUFBSSxZQUFZLDZCQUE2QixDQUFDO0FBQ2pFLGVBQUssV0FBVztBQUVoQixlQUFLLE9BQU87QUFBQSxRQUVkLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFDQSxZQUFNLEtBQUssS0FBSyxRQUFRLEVBQ3JCLE9BQU8sQ0FBQyxVQUFVLE1BQU0sYUFBYSxLQUFLLFlBQVksRUFDdEQsUUFBUSxDQUFDLFVBQVU7QUFDbEIsYUFBSyxvQkFBb0IsS0FBSztBQUFBLE1BQ2hDLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDRixFQUFFO0FBQ0o7OztBQy9DQSxTQUFTLGlCQUFpQixlQUFlLE1BQU07QUFDN0MsU0FBTyxPQUFPLE9BQU8sbUJBQVc7QUFDbEMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
