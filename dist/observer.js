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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBtb2RhbE9wZW46IGZhbHNlLCAvLyBUcmFjayBtb2RhbCBzdGF0ZVxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgbm9kZVNlbGVjdG9yID0gXCIuZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiO1xuXG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlU2VsZWN0b3IpO1xuXG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIG5vZGUuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhub2RlKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Gb3JNb2RhbENsb3NlKG5vZGUpOyBcbiAgICAgIH1cblxuICAgIH0sXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcblxuICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgICBbXCJjbGlja1wiLCBcImtleWRvd25cIl0uZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBPbmx5IG9wZW4gaWYgbW9kYWwgaXMgbm90IGFscmVhZHkgb3BlblxuICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGFsT3Blbikge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvcGVuLWdsb2JhbC1zZWFyY2gtbW9kYWwnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7IGlkOiAnZ2xvYmFsLXNlYXJjaC1tb2RhbDo6cGx1Z2luJyB9LFxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICB0aGlzLm1vZGFsT3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgIG5vZGUuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpc3RlbkZvck1vZGFsQ2xvc2U6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIG1vZGFsIGNsb3NlIGV2ZW50c1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vZGFsLWNsb3NlZCcsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGV0YWlsPy5pZCA9PT0gJ2dsb2JhbC1zZWFyY2gtbW9kYWw6OnBsdWdpbicpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnTW9kYWwgY2xvc2VkLCByZS1lbmFibGluZyBub2RlJyk7XG4gICAgICAgICAgXG4gICAgICAgICAgdGhpcy5tb2RhbE9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAvLyBub2RlLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuICB9O1xufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLFdBQTRCO0FBQ2pDLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQTtBQUFBLElBRVgsTUFBTSxXQUFZO0FBQ2hCLFlBQU0sZUFBZTtBQUVyQixZQUFNLE9BQU8sU0FBUyxjQUFjLFlBQVk7QUFHaEQsVUFBSSxNQUFNO0FBQ1IsYUFBSyxXQUFXO0FBQ2hCLGFBQUssb0JBQW9CLElBQUk7QUFDN0IsYUFBSyxvQkFBb0IsSUFBSTtBQUFBLE1BQy9CO0FBQUEsSUFFRjtBQUFBLElBQ0EscUJBQXFCLFNBQVUsTUFBTTtBQUNuQyxZQUFNLGVBQWUsS0FBSyxjQUFjLG9CQUFvQjtBQUU1RCxVQUFJLGNBQWM7QUFDaEIsU0FBQyxTQUFTLFNBQVMsRUFBRSxRQUFRLENBQUMsVUFBVTtBQUN0Qyx1QkFBYSxpQkFBaUIsT0FBTyxDQUFDQSxXQUFVO0FBRTlDLGdCQUFJLENBQUMsS0FBSyxXQUFXO0FBRW5CLHFCQUFPLGNBQWMsSUFBSSxZQUFZLDRCQUE0QjtBQUFBLGdCQUMvRCxRQUFRLEVBQUUsSUFBSSw4QkFBOEI7QUFBQSxnQkFDNUMsU0FBUztBQUFBLGNBQ1gsQ0FBQyxDQUFDO0FBRUYsbUJBQUssWUFBWTtBQUNqQixtQkFBSyxXQUFXO0FBQUEsWUFDbEI7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNILENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLElBQ0EscUJBQXFCLFNBQVUsTUFBTTtBQUVuQyxhQUFPLGlCQUFpQixnQkFBZ0IsQ0FBQyxVQUFVO0FBQ2pELFlBQUksTUFBTSxRQUFRLE9BQU8sK0JBQStCO0FBQ3RELGtCQUFRLElBQUksZ0NBQWdDO0FBRTVDLGVBQUssWUFBWTtBQUFBLFFBRW5CO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFFSDtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiZXZlbnQiXQp9Cg==
