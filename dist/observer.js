// resources/js/observer.js
function observer() {
  return {
    observer: null,
    init: function() {
      const nodeSelector = ".fi-topbar .fi-global-search-field";
      const node = document.querySelector(nodeSelector);
      if (node) {
        this.checkForTargetClass(node);
      }
    },
    checkForTargetClass: function(node) {
      const inputElement = node.querySelector("input[type=search]");
      if (inputElement) {
        ["click", "focus", "keydown", "input"].forEach((event) => {
          inputElement.addEventListener(event, () => {
            this.handleNodeActions(inputElement);
            node.style.display = "none";
          });
        });
      }
    },
    handleNodeActions: function(node) {
      Alpine.store("globalSearchModalStore").showModal();
      node.disabled = true;
    }
  };
}
export {
  observer as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2JzZXJ2ZXI6IG51bGwsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0IG5vZGVTZWxlY3RvciA9IFwiLmZpLXRvcGJhciAuZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiO1xyXG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlU2VsZWN0b3IpOyAgICAgIFxyXG4gICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhub2RlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNoZWNrRm9yVGFyZ2V0Q2xhc3M6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcclxuICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIFtcImNsaWNrXCIsIFwiZm9jdXNcIiwgXCJrZXlkb3duXCIsIFwiaW5wdXRcIl0uZm9yRWFjaCgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTm9kZUFjdGlvbnMoaW5wdXRFbGVtZW50KTtcclxuICAgICAgICAgICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGhhbmRsZU5vZGVBY3Rpb25zOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICBBbHBpbmUuc3RvcmUoXCJnbG9iYWxTZWFyY2hNb2RhbFN0b3JlXCIpLnNob3dNb2RhbCgpO1xyXG4gICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixXQUE0QjtBQUNqQyxTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixNQUFNLFdBQVk7QUFDaEIsWUFBTSxlQUFlO0FBQ3JCLFlBQU0sT0FBTyxTQUFTLGNBQWMsWUFBWTtBQUNoRCxVQUFJLE1BQU07QUFDUixhQUFLLG9CQUFvQixJQUFJO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxxQkFBcUIsU0FBVSxNQUFNO0FBQ25DLFlBQU0sZUFBZSxLQUFLLGNBQWMsb0JBQW9CO0FBQzVELFVBQUksY0FBYztBQUNoQixTQUFDLFNBQVMsU0FBUyxXQUFXLE9BQU8sRUFBRSxRQUFRLENBQUMsVUFBVTtBQUN4RCx1QkFBYSxpQkFBaUIsT0FBTyxNQUFNO0FBQ3pDLGlCQUFLLGtCQUFrQixZQUFZO0FBQ25DLGlCQUFLLE1BQU0sVUFBVTtBQUFBLFVBQ3ZCLENBQUM7QUFBQSxRQUNILENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLElBQ0EsbUJBQW1CLFNBQVUsTUFBTTtBQUNqQyxhQUFPLE1BQU0sd0JBQXdCLEVBQUUsVUFBVTtBQUNqRCxXQUFLLFdBQVc7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
