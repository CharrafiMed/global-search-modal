// resources/js/globalModal.js
var globalModal_default = (Alpine) => {
  Alpine.data("GlobalSearchModalComponent", () => ({
    init: function() {
      document.addEventListener("DOMContentLoaded", () => {
        const targetSelector = ".fi-topbar";
        const observerConfig = {
          childList: true,
          subtree: true
        };
        const observerCallback = (mutationsList) => {
          mutationsList.forEach((mutation) => {
            if (mutation.type === "childList") {
              Array.from(mutation.addedNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE).forEach(checkForTargetClass);
            }
          });
        };
        const observer = new MutationObserver(observerCallback);
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          observer.observe(targetElement, observerConfig);
        }
        function checkForTargetClass(node) {
          if (node.classList.contains("fi-global-search-field")) {
            node.addEventListener("click", () => {
              console.log("clicked on fi-global-search-field element");
              node.dispatchEvent(
                new CustomEvent("global-search-input-clicked")
              );
              node.disabled = true;
              node.remove();
            });
            return;
          }
          Array.from(node.children).filter((child) => child.nodeType === Node.ELEMENT_NODE).forEach(checkForTargetClass);
        }
      });
    }
  }));
};

// resources/js/index.js
document.addEventListener("alpine:init", () => {
  window.Alpine.plugin(globalModal_default);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL2dsb2JhbE1vZGFsLmpzIiwgIi4uL3Jlc291cmNlcy9qcy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgKEFscGluZSkgPT4ge1xyXG4gIEFscGluZS5kYXRhKFwiR2xvYmFsU2VhcmNoTW9kYWxDb21wb25lbnRcIiwgKCkgPT4gKHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gXCIuZmktdG9wYmFyXCI7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJDb25maWcgPSB7XHJcbiAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJDYWxsYmFjayA9IChtdXRhdGlvbnNMaXN0KSA9PiB7XHJcbiAgICAgICAgICBtdXRhdGlvbnNMaXN0LmZvckVhY2goKG11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgQXJyYXkuZnJvbShtdXRhdGlvbi5hZGRlZE5vZGVzKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChjaGVja0ZvclRhcmdldENsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG9ic2VydmVyQ2FsbGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcclxuICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50LCBvYnNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0ZvclRhcmdldENsYXNzKG5vZGUpIHtcclxuICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcImZpLWdsb2JhbC1zZWFyY2gtZmllbGRcIikpIHtcclxuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBvbiBmaS1nbG9iYWwtc2VhcmNoLWZpZWxkIGVsZW1lbnRcIik7XHJcbiAgICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiZ2xvYmFsLXNlYXJjaC1pbnB1dC1jbGlja2VkXCIpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGlucHV0IGZyb20gdGhlIERPTVxyXG4gICAgICAgICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgLy8gRGlzcGF0Y2ggYW4gZXZlbnQgb3IgcGVyZm9ybSBhY3Rpb25zIHdoZW4gY2xpY2tlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChjaGVja0ZvclRhcmdldENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9KSk7XHJcbn07XHJcbiIsICJpbXBvcnQgZ2xvYmFsTW9kYWwgZnJvbSBcIi4vZ2xvYmFsTW9kYWxcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FscGluZTppbml0JywgKCkgPT4ge1xyXG4gIHdpbmRvdy5BbHBpbmUucGx1Z2luKGdsb2JhbE1vZGFsKTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxJQUFPLHNCQUFRLENBQUMsV0FBVztBQUN6QixTQUFPLEtBQUssOEJBQThCLE9BQU87QUFBQSxJQUMvQyxNQUFNLFdBQVk7QUFDaEIsZUFBUyxpQkFBaUIsb0JBQW9CLE1BQU07QUFDbEQsY0FBTSxpQkFBaUI7QUFDdkIsY0FBTSxpQkFBaUI7QUFBQSxVQUNyQixXQUFXO0FBQUEsVUFDWCxTQUFTO0FBQUEsUUFDWDtBQUVBLGNBQU0sbUJBQW1CLENBQUMsa0JBQWtCO0FBQzFDLHdCQUFjLFFBQVEsQ0FBQyxhQUFhO0FBQ2xDLGdCQUFJLFNBQVMsU0FBUyxhQUFhO0FBQ2pDLG9CQUFNLEtBQUssU0FBUyxVQUFVLEVBQzNCLE9BQU8sQ0FBQyxTQUFTLEtBQUssYUFBYSxLQUFLLFlBQVksRUFDcEQsUUFBUSxtQkFBbUI7QUFBQSxZQUNoQztBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFDQSxjQUFNLFdBQVcsSUFBSSxpQkFBaUIsZ0JBQWdCO0FBQ3RELGNBQU0sZ0JBQWdCLFNBQVMsY0FBYyxjQUFjO0FBQzNELFlBQUksZUFBZTtBQUNqQixtQkFBUyxRQUFRLGVBQWUsY0FBYztBQUFBLFFBQ2hEO0FBRUEsaUJBQVMsb0JBQW9CLE1BQU07QUFDakMsY0FBSSxLQUFLLFVBQVUsU0FBUyx3QkFBd0IsR0FBRztBQUNyRCxpQkFBSyxpQkFBaUIsU0FBUyxNQUFNO0FBQ25DLHNCQUFRLElBQUksMkNBQTJDO0FBQ3ZELG1CQUFLO0FBQUEsZ0JBQ0gsSUFBSSxZQUFZLDZCQUE2QjtBQUFBLGNBQy9DO0FBQ0EsbUJBQUssV0FBVztBQUVoQixtQkFBSyxPQUFPO0FBQUEsWUFFZCxDQUFDO0FBQ0Q7QUFBQSxVQUNGO0FBQ0EsZ0JBQU0sS0FBSyxLQUFLLFFBQVEsRUFDckIsT0FBTyxDQUFDLFVBQVUsTUFBTSxhQUFhLEtBQUssWUFBWSxFQUN0RCxRQUFRLG1CQUFtQjtBQUFBLFFBQ2hDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsRUFBRTtBQUNKOzs7QUM1Q0EsU0FBUyxpQkFBaUIsZUFBZSxNQUFNO0FBQzdDLFNBQU8sT0FBTyxPQUFPLG1CQUFXO0FBQ2xDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
