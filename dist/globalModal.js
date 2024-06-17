// resources/js/globalModal.js
var globalModal_default = (Alpine) => {
  Alpine.data("GloblaSearchModalComponent", () => ({
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
export {
  globalModal_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL2dsb2JhbE1vZGFsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCAoQWxwaW5lKSA9PiB7XHJcbiAgQWxwaW5lLmRhdGEoXCJHbG9ibGFTZWFyY2hNb2RhbENvbXBvbmVudFwiLCAoKSA9PiAoe1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBcIi5maS10b3BiYXJcIjtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckNhbGxiYWNrID0gKG11dGF0aW9uc0xpc3QpID0+IHtcclxuICAgICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgICBBcnJheS5mcm9tKG11dGF0aW9uLmFkZGVkTm9kZXMpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGNoZWNrRm9yVGFyZ2V0Q2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIob2JzZXJ2ZXJDYWxsYmFjayk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0U2VsZWN0b3IpO1xyXG4gICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsZW1lbnQsIG9ic2VydmVyQ29uZmlnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRm9yVGFyZ2V0Q2xhc3Mobm9kZSkge1xyXG4gICAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiKSkge1xyXG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIG9uIGZpLWdsb2JhbC1zZWFyY2gtZmllbGQgZWxlbWVudFwiKTtcclxuICAgICAgICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJnbG9iYWwtc2VhcmNoLWlucHV0LWNsaWNrZWRcIilcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIG5vZGUuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaW5wdXQgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgbm9kZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAvLyBEaXNwYXRjaCBhbiBldmVudCBvciBwZXJmb3JtIGFjdGlvbnMgd2hlbiBjbGlja2VkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGNoZWNrRm9yVGFyZ2V0Q2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0pKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLElBQU8sc0JBQVEsQ0FBQyxXQUFXO0FBQ3pCLFNBQU8sS0FBSyw4QkFBOEIsT0FBTztBQUFBLElBQy9DLE1BQU0sV0FBWTtBQUNoQixlQUFTLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNsRCxjQUFNLGlCQUFpQjtBQUN2QixjQUFNLGlCQUFpQjtBQUFBLFVBQ3JCLFdBQVc7QUFBQSxVQUNYLFNBQVM7QUFBQSxRQUNYO0FBQ0EsY0FBTSxtQkFBbUIsQ0FBQyxrQkFBa0I7QUFDMUMsd0JBQWMsUUFBUSxDQUFDLGFBQWE7QUFDbEMsZ0JBQUksU0FBUyxTQUFTLGFBQWE7QUFDakMsb0JBQU0sS0FBSyxTQUFTLFVBQVUsRUFDM0IsT0FBTyxDQUFDLFNBQVMsS0FBSyxhQUFhLEtBQUssWUFBWSxFQUNwRCxRQUFRLG1CQUFtQjtBQUFBLFlBQ2hDO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUNBLGNBQU0sV0FBVyxJQUFJLGlCQUFpQixnQkFBZ0I7QUFDdEQsY0FBTSxnQkFBZ0IsU0FBUyxjQUFjLGNBQWM7QUFDM0QsWUFBSSxlQUFlO0FBQ2pCLG1CQUFTLFFBQVEsZUFBZSxjQUFjO0FBQUEsUUFDaEQ7QUFFQSxpQkFBUyxvQkFBb0IsTUFBTTtBQUNqQyxjQUFJLEtBQUssVUFBVSxTQUFTLHdCQUF3QixHQUFHO0FBQ3JELGlCQUFLLGlCQUFpQixTQUFTLE1BQU07QUFDbkMsc0JBQVEsSUFBSSwyQ0FBMkM7QUFDdkQsbUJBQUs7QUFBQSxnQkFDSCxJQUFJLFlBQVksNkJBQTZCO0FBQUEsY0FDL0M7QUFDQSxtQkFBSyxXQUFXO0FBRWhCLG1CQUFLLE9BQU87QUFBQSxZQUVkLENBQUM7QUFDRDtBQUFBLFVBQ0Y7QUFDQSxnQkFBTSxLQUFLLEtBQUssUUFBUSxFQUNyQixPQUFPLENBQUMsVUFBVSxNQUFNLGFBQWEsS0FBSyxZQUFZLEVBQ3RELFFBQVEsbUJBQW1CO0FBQUEsUUFDaEM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixFQUFFO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
