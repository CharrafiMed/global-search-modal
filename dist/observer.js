// resources/js/observer.js
function observer() {
  return {
    observer: null,
    modalOpen: false,
    // Track modal state
    init: function() {
      const nodeSelector = ".fi-global-search-field";
      const node = document.querySelector(nodeSelector);
      if (node) {
        node.disabled = true;
        this.checkForTargetClass(node);
        this.listenForModalClose(node);
      }
    },
    checkForTargetClass: function(node) {
      const inputElement = node.querySelector("input[type=search]");
      if (inputElement) {
        ["click", "keydown"].forEach((event) => {
          inputElement.addEventListener(event, (event2) => {
            if (!this.modalOpen) {
              console.log("Opening modal", event2);
              window.dispatchEvent(new CustomEvent("open-global-search-modal", {
                detail: { id: "global-search-modal::plugin" },
                bubbles: true
              }));
              this.modalOpen = true;
              node.disabled = true;
            }
          });
        });
      }
    },
    listenForModalClose: function(node) {
      window.addEventListener("modal-closed", (event) => {
        if (event.detail?.id === "global-search-modal::plugin") {
          console.log("Modal closed, re-enabling node");
          this.modalOpen = false;
        }
      });
    }
  };
}
export {
  observer as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBtb2RhbE9wZW46IGZhbHNlLCAvLyBUcmFjayBtb2RhbCBzdGF0ZVxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgbm9kZVNlbGVjdG9yID0gXCIuZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiO1xuXG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlU2VsZWN0b3IpO1xuXG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIG5vZGUuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhub2RlKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Gb3JNb2RhbENsb3NlKG5vZGUpOyBcbiAgICAgIH1cblxuICAgIH0sXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcblxuICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgICBbXCJjbGlja1wiLCBcImtleWRvd25cIl0uZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBPbmx5IG9wZW4gaWYgbW9kYWwgaXMgbm90IGFscmVhZHkgb3BlblxuICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGFsT3Blbikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnT3BlbmluZyBtb2RhbCcsZXZlbnQpO1xuXG4gICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb3Blbi1nbG9iYWwtc2VhcmNoLW1vZGFsJywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogeyBpZDogJ2dsb2JhbC1zZWFyY2gtbW9kYWw6OnBsdWdpbicgfSxcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsaXN0ZW5Gb3JNb2RhbENsb3NlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgLy8gTGlzdGVuIGZvciBtb2RhbCBjbG9zZSBldmVudHNcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb2RhbC1jbG9zZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8uaWQgPT09ICdnbG9iYWwtc2VhcmNoLW1vZGFsOjpwbHVnaW4nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIGNsb3NlZCwgcmUtZW5hYmxpbmcgbm9kZScpO1xuICAgICAgICAgIFxuICAgICAgICAgIHRoaXMubW9kYWxPcGVuID0gZmFsc2U7XG4gICAgICAgICAgLy8gbm9kZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH1cbiAgfTtcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixXQUE0QjtBQUNqQyxTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUE7QUFBQSxJQUVYLE1BQU0sV0FBWTtBQUNoQixZQUFNLGVBQWU7QUFFckIsWUFBTSxPQUFPLFNBQVMsY0FBYyxZQUFZO0FBR2hELFVBQUksTUFBTTtBQUNSLGFBQUssV0FBVztBQUNoQixhQUFLLG9CQUFvQixJQUFJO0FBQzdCLGFBQUssb0JBQW9CLElBQUk7QUFBQSxNQUMvQjtBQUFBLElBRUY7QUFBQSxJQUNBLHFCQUFxQixTQUFVLE1BQU07QUFDbkMsWUFBTSxlQUFlLEtBQUssY0FBYyxvQkFBb0I7QUFFNUQsVUFBSSxjQUFjO0FBQ2hCLFNBQUMsU0FBUyxTQUFTLEVBQUUsUUFBUSxDQUFDLFVBQVU7QUFDdEMsdUJBQWEsaUJBQWlCLE9BQU8sQ0FBQ0EsV0FBVTtBQUU5QyxnQkFBSSxDQUFDLEtBQUssV0FBVztBQUNuQixzQkFBUSxJQUFJLGlCQUFnQkEsTUFBSztBQUVqQyxxQkFBTyxjQUFjLElBQUksWUFBWSw0QkFBNEI7QUFBQSxnQkFDL0QsUUFBUSxFQUFFLElBQUksOEJBQThCO0FBQUEsZ0JBQzVDLFNBQVM7QUFBQSxjQUNYLENBQUMsQ0FBQztBQUVGLG1CQUFLLFlBQVk7QUFDakIsbUJBQUssV0FBVztBQUFBLFlBQ2xCO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQixTQUFVLE1BQU07QUFFbkMsYUFBTyxpQkFBaUIsZ0JBQWdCLENBQUMsVUFBVTtBQUNqRCxZQUFJLE1BQU0sUUFBUSxPQUFPLCtCQUErQjtBQUN0RCxrQkFBUSxJQUFJLGdDQUFnQztBQUU1QyxlQUFLLFlBQVk7QUFBQSxRQUVuQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBRUg7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbImV2ZW50Il0KfQo=
