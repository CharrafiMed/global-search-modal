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
            Array.from(mutation.addedNodes).filter((node2) => node2.nodeType === Node.ELEMENT_NODE).forEach((node2) => {
              this.checkForTargetClass(node2);
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
    checkForTargetClass: function(node2) {
      if (node2.classList.contains("fi-global-search-field")) {
        console.log("added");
        const inputElement = node2.querySelector("input[type=search]");
        if (inputElement) {
          ["click", "focus", "keydown", "input"].forEach((event) => {
            inputElement.addEventListener(event, () => {
              this.handleNodeActions(inputElement);
            });
          });
        }
      }
      Array.from(node2.children).filter((child) => child.nodeType === Node.ELEMENT_NODE).forEach((child) => {
        this.checkForTargetClass(child);
      });
    },
    handleNodeActions: function() {
      Alpine.store("modalStore").showModal();
      node.disabled = true;
      node.style.display = "none";
    }
  };
}
export {
  modal as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2RhbCgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2JzZXJ2ZXI6IG51bGwsXHJcbiAgICBvcGVuOiBmYWxzZSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcclxuICAgIH0sXHJcbiAgICBpbml0T2JzZXJ2ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBcIi5maS10b3BiYXJcIjtcclxuICAgICAgY29uc3Qgb2JzZXJ2ZXJDb25maWcgPSB7XHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IG9ic2VydmVyQ2FsbGJhY2sgPSAobXV0YXRpb25zTGlzdCkgPT4ge1xyXG4gICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSBcImNoaWxkTGlzdFwiKSB7XHJcbiAgICAgICAgICAgIEFycmF5LmZyb20obXV0YXRpb24uYWRkZWROb2RlcylcclxuICAgICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIob2JzZXJ2ZXJDYWxsYmFjayk7XHJcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKTtcclxuICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWxlbWVudCwgb2JzZXJ2ZXJDb25maWcpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRkZWRcIik7XHJcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gbm9kZS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT1zZWFyY2hdXCIpO1xyXG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgIFtcImNsaWNrXCIsIFwiZm9jdXNcIiwgXCJrZXlkb3duXCIsIFwiaW5wdXRcIl0uZm9yRWFjaCgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5vZGVBY3Rpb25zKGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFtcImNsaWNrXCIsIFwiZm9jdXNcIiwgXCJrZXlkb3duXCIsIFwiaW5wdXRcIl0uZm9yRWFjaCgoZXZlbnQpID0+IHtcclxuICAgICAgICAvLyAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhhbmRsZU5vZGVBY3Rpb25zKG5vZGUpO1xyXG4gICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgIH1cclxuICAgICAgQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrRm9yVGFyZ2V0Q2xhc3MoY2hpbGQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZU5vZGVBY3Rpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEFscGluZS5zdG9yZShcIm1vZGFsU3RvcmVcIikuc2hvd01vZGFsKCk7XHJcbiAgICAgIG5vZGUuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICBub2RlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixRQUF5QjtBQUM5QixTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixNQUFNO0FBQUEsSUFDTixNQUFNLFdBQVk7QUFDaEIsV0FBSyxhQUFhO0FBQUEsSUFDcEI7QUFBQSxJQUNBLGNBQWMsV0FBWTtBQUN4QixZQUFNLGlCQUFpQjtBQUN2QixZQUFNLGlCQUFpQjtBQUFBLFFBQ3JCLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxNQUNYO0FBQ0EsWUFBTSxtQkFBbUIsQ0FBQyxrQkFBa0I7QUFDMUMsc0JBQWMsUUFBUSxDQUFDLGFBQWE7QUFDbEMsY0FBSSxTQUFTLFNBQVMsYUFBYTtBQUNqQyxrQkFBTSxLQUFLLFNBQVMsVUFBVSxFQUMzQixPQUFPLENBQUNBLFVBQVNBLE1BQUssYUFBYSxLQUFLLFlBQVksRUFDcEQsUUFBUSxDQUFDQSxVQUFTO0FBQ2pCLG1CQUFLLG9CQUFvQkEsS0FBSTtBQUFBLFlBQy9CLENBQUM7QUFBQSxVQUNMO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUNBLFdBQUssV0FBVyxJQUFJLGlCQUFpQixnQkFBZ0I7QUFDckQsWUFBTSxnQkFBZ0IsU0FBUyxjQUFjLGNBQWM7QUFDM0QsVUFBSSxlQUFlO0FBQ2pCLGFBQUssU0FBUyxRQUFRLGVBQWUsY0FBYztBQUFBLE1BQ3JEO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCLFNBQVVBLE9BQU07QUFDbkMsVUFBSUEsTUFBSyxVQUFVLFNBQVMsd0JBQXdCLEdBQUc7QUFDckQsZ0JBQVEsSUFBSSxPQUFPO0FBQ25CLGNBQU0sZUFBZUEsTUFBSyxjQUFjLG9CQUFvQjtBQUM1RCxZQUFJLGNBQWM7QUFDaEIsV0FBQyxTQUFTLFNBQVMsV0FBVyxPQUFPLEVBQUUsUUFBUSxDQUFDLFVBQVU7QUFDeEQseUJBQWEsaUJBQWlCLE9BQU8sTUFBTTtBQUN6QyxtQkFBSyxrQkFBa0IsWUFBWTtBQUFBLFlBQ3JDLENBQUM7QUFBQSxVQUNILENBQUM7QUFBQSxRQUNIO0FBQUEsTUFNRjtBQUNBLFlBQU0sS0FBS0EsTUFBSyxRQUFRLEVBQ3JCLE9BQU8sQ0FBQyxVQUFVLE1BQU0sYUFBYSxLQUFLLFlBQVksRUFDdEQsUUFBUSxDQUFDLFVBQVU7QUFDbEIsYUFBSyxvQkFBb0IsS0FBSztBQUFBLE1BQ2hDLENBQUM7QUFBQSxJQUNMO0FBQUEsSUFDQSxtQkFBbUIsV0FBWTtBQUM3QixhQUFPLE1BQU0sWUFBWSxFQUFFLFVBQVU7QUFDckMsV0FBSyxXQUFXO0FBQ2hCLFdBQUssTUFBTSxVQUFVO0FBQUEsSUFDdkI7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbIm5vZGUiXQp9Cg==
