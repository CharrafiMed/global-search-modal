// resources/js/modal.js
function modal() {
  return {
    observer: null,
    init: function() {
      console.log("hiba is here ");
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
  };
}
export {
  modal as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2RhbCgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2JzZXJ2ZXI6IG51bGwsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hpYmEgaXMgaGVyZSAnKVxyXG4gICAgICB0aGlzLmluaXRPYnNlcnZlcigpO1xyXG4gICAgfSxcclxuICAgIGluaXRPYnNlcnZlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCB0YXJnZXRTZWxlY3RvciA9IFwiLmZpLXRvcGJhclwiO1xyXG4gICAgICBjb25zdCBvYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgfTtcclxuICAgICAgY29uc3Qgb2JzZXJ2ZXJDYWxsYmFjayA9IChtdXRhdGlvbnNMaXN0KSA9PiB7XHJcbiAgICAgICAgbXV0YXRpb25zTGlzdC5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xyXG4gICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShtdXRhdGlvbi5hZGRlZE5vZGVzKVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoKG5vZGUpID0+IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKVxyXG4gICAgICAgICAgICAgIC5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRm9yVGFyZ2V0Q2xhc3Mobm9kZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihvYnNlcnZlckNhbGxiYWNrKTtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0U2VsZWN0b3IpO1xyXG4gICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50LCBvYnNlcnZlckNvbmZpZyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGVja0ZvclRhcmdldENsYXNzOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoXCJmaS1nbG9iYWwtc2VhcmNoLWZpZWxkXCIpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZGVkJylcclxuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrZWQgb24gZmktZ2xvYmFsLXNlYXJjaC1maWVsZCBlbGVtZW50XCIpO1xyXG4gICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImdsb2JhbC1zZWFyY2gtaW5wdXQtY2xpY2tlZFwiKSk7XHJcbiAgICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaW5wdXQgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIEFycmF5LmZyb20obm9kZS5jaGlsZHJlbilcclxuICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKVxyXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKGNoaWxkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixRQUF5QjtBQUM5QixTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixNQUFNLFdBQVk7QUFDZCxjQUFRLElBQUksZUFBZTtBQUM3QixXQUFLLGFBQWE7QUFBQSxJQUNwQjtBQUFBLElBQ0EsY0FBYyxXQUFZO0FBQ3hCLFlBQU0saUJBQWlCO0FBQ3ZCLFlBQU0saUJBQWlCO0FBQUEsUUFDckIsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLE1BQ1g7QUFDQSxZQUFNLG1CQUFtQixDQUFDLGtCQUFrQjtBQUMxQyxzQkFBYyxRQUFRLENBQUMsYUFBYTtBQUNsQyxjQUFJLFNBQVMsU0FBUyxhQUFhO0FBQ2pDLGtCQUFNLEtBQUssU0FBUyxVQUFVLEVBQzNCLE9BQU8sQ0FBQyxTQUFTLEtBQUssYUFBYSxLQUFLLFlBQVksRUFDcEQsUUFBUSxDQUFDLFNBQVM7QUFDakIsbUJBQUssb0JBQW9CLElBQUk7QUFBQSxZQUMvQixDQUFDO0FBQUEsVUFDTDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFDQSxXQUFLLFdBQVcsSUFBSSxpQkFBaUIsZ0JBQWdCO0FBQ3JELFlBQU0sZ0JBQWdCLFNBQVMsY0FBYyxjQUFjO0FBQzNELFVBQUksZUFBZTtBQUNqQixhQUFLLFNBQVMsUUFBUSxlQUFlLGNBQWM7QUFBQSxNQUNyRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQixTQUFVLE1BQU07QUFDbkMsVUFBSSxLQUFLLFVBQVUsU0FBUyx3QkFBd0IsR0FBRztBQUNyRCxnQkFBUSxJQUFJLE9BQU87QUFDbkIsYUFBSyxpQkFBaUIsU0FBUyxNQUFNO0FBQ25DLGtCQUFRLElBQUksMkNBQTJDO0FBQ3ZELGVBQUssY0FBYyxJQUFJLFlBQVksNkJBQTZCLENBQUM7QUFDakUsZUFBSyxXQUFXO0FBRWhCLGVBQUssT0FBTztBQUFBLFFBQ2QsQ0FBQztBQUFBLE1BQ0g7QUFDQSxZQUFNLEtBQUssS0FBSyxRQUFRLEVBQ3JCLE9BQU8sQ0FBQyxVQUFVLE1BQU0sYUFBYSxLQUFLLFlBQVksRUFDdEQsUUFBUSxDQUFDLFVBQVU7QUFDbEIsYUFBSyxvQkFBb0IsS0FBSztBQUFBLE1BQ2hDLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
