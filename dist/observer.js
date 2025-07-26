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
        this.checkForTargetClass(node);
        this.listenForModalClose(node);
      }
    },
    checkForTargetClass: function(node) {
      const inputElement = node.querySelector("input[type=search]");
      if (inputElement) {
        ["click", "focus", "keydown"].forEach((event) => {
          inputElement.addEventListener(event, () => {
            if (!this.modalOpen) {
              console.log("Opening modal");
              window.dispatchEvent(new CustomEvent("open-modal", {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBtb2RhbE9wZW46IGZhbHNlLCAvLyBUcmFjayBtb2RhbCBzdGF0ZVxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgbm9kZVNlbGVjdG9yID0gXCIuZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiO1xuICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobm9kZVNlbGVjdG9yKTtcblxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xuICAgICAgICB0aGlzLmxpc3RlbkZvck1vZGFsQ2xvc2Uobm9kZSk7IC8vIEFkZCBtb2RhbCBjbG9zZSBsaXN0ZW5lclxuICAgICAgfVxuICAgIH0sXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcblxuICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgICBbXCJjbGlja1wiLCBcImZvY3VzXCIsIFwia2V5ZG93blwiLF0uZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gT25seSBvcGVuIGlmIG1vZGFsIGlzIG5vdCBhbHJlYWR5IG9wZW5cbiAgICAgICAgICAgIGlmICghdGhpcy5tb2RhbE9wZW4pIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ09wZW5pbmcgbW9kYWwnKTtcbiAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvcGVuLW1vZGFsJywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogeyBpZDogJ2dsb2JhbC1zZWFyY2gtbW9kYWw6OnBsdWdpbicgfSxcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsaXN0ZW5Gb3JNb2RhbENsb3NlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgLy8gTGlzdGVuIGZvciBtb2RhbCBjbG9zZSBldmVudHNcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb2RhbC1jbG9zZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8uaWQgPT09ICdnbG9iYWwtc2VhcmNoLW1vZGFsOjpwbHVnaW4nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ01vZGFsIGNsb3NlZCwgcmUtZW5hYmxpbmcgbm9kZScpO1xuICAgICAgICAgIFxuICAgICAgICAgIHRoaXMubW9kYWxPcGVuID0gZmFsc2U7XG4gICAgICAgICAgLy8gbm9kZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH1cbiAgfTtcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixXQUE0QjtBQUNqQyxTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUE7QUFBQSxJQUVYLE1BQU0sV0FBWTtBQUNoQixZQUFNLGVBQWU7QUFDckIsWUFBTSxPQUFPLFNBQVMsY0FBYyxZQUFZO0FBRWhELFVBQUksTUFBTTtBQUNSLGFBQUssb0JBQW9CLElBQUk7QUFDN0IsYUFBSyxvQkFBb0IsSUFBSTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCLFNBQVUsTUFBTTtBQUNuQyxZQUFNLGVBQWUsS0FBSyxjQUFjLG9CQUFvQjtBQUU1RCxVQUFJLGNBQWM7QUFDaEIsU0FBQyxTQUFTLFNBQVMsU0FBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ2hELHVCQUFhLGlCQUFpQixPQUFPLE1BQU07QUFFekMsZ0JBQUksQ0FBQyxLQUFLLFdBQVc7QUFDbkIsc0JBQVEsSUFBSSxlQUFlO0FBQzNCLHFCQUFPLGNBQWMsSUFBSSxZQUFZLGNBQWM7QUFBQSxnQkFDakQsUUFBUSxFQUFFLElBQUksOEJBQThCO0FBQUEsZ0JBQzVDLFNBQVM7QUFBQSxjQUNYLENBQUMsQ0FBQztBQUVGLG1CQUFLLFlBQVk7QUFDakIsbUJBQUssV0FBVztBQUFBLFlBQ2xCO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQixTQUFVLE1BQU07QUFFbkMsYUFBTyxpQkFBaUIsZ0JBQWdCLENBQUMsVUFBVTtBQUNqRCxZQUFJLE1BQU0sUUFBUSxPQUFPLCtCQUErQjtBQUN0RCxrQkFBUSxJQUFJLGdDQUFnQztBQUU1QyxlQUFLLFlBQVk7QUFBQSxRQUVuQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBRUg7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
