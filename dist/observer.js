// resources/js/observer.js
function observer() {
  return {
    observer: null,
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
        const inputElement = node.querySelector("input[type=search]");
        if (inputElement) {
          ["click", "focus", "keydown", "input"].forEach((event) => {
            inputElement.addEventListener(event, () => {
              this.handleNodeActions(inputElement);
              node.style.display = "none";
            });
          });
        }
      }
      Array.from(node.children).filter((child) => child.nodeType === Node.ELEMENT_NODE).forEach((child) => {
        this.checkForTargetClass(child);
      });
    },
    handleNodeActions: function(node) {
      Alpine.store("modalStore").showModal();
      node.disabled = true;
    }
  };
}
export {
  observer as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG9ic2VydmVyOiBudWxsLFxyXG4gICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0T2JzZXJ2ZXIoKTtcclxuICAgICAgfSxcclxuICAgICAgaW5pdE9ic2VydmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBcIi5maS10b3BiYXJcIjtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckNvbmZpZyA9IHtcclxuICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBvYnNlcnZlckNhbGxiYWNrID0gKG11dGF0aW9uc0xpc3QpID0+IHtcclxuICAgICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuICAgICAgICAgICAgICBBcnJheS5mcm9tKG11dGF0aW9uLmFkZGVkTm9kZXMpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihvYnNlcnZlckNhbGxiYWNrKTtcclxuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50LCBvYnNlcnZlckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjaGVja0ZvclRhcmdldENsYXNzOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhcImZpLWdsb2JhbC1zZWFyY2gtZmllbGRcIikpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkZWRcIik7XHJcbiAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXNlYXJjaF1cIik7XHJcbiAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIFtcImNsaWNrXCIsIFwiZm9jdXNcIiwgXCJrZXlkb3duXCIsIFwiaW5wdXRcIl0uZm9yRWFjaCgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOb2RlQWN0aW9ucyhpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKVxyXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhjaGlsZCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgaGFuZGxlTm9kZUFjdGlvbnM6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgQWxwaW5lLnN0b3JlKFwibW9kYWxTdG9yZVwiKS5zaG93TW9kYWwoKTtcclxuICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfVxyXG4gICJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLFdBQTRCO0FBQy9CLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLE1BQU0sV0FBWTtBQUNoQixXQUFLLGFBQWE7QUFBQSxJQUNwQjtBQUFBLElBQ0EsY0FBYyxXQUFZO0FBQ3hCLFlBQU0saUJBQWlCO0FBQ3ZCLFlBQU0saUJBQWlCO0FBQUEsUUFDckIsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLE1BQ1g7QUFDQSxZQUFNLG1CQUFtQixDQUFDLGtCQUFrQjtBQUMxQyxzQkFBYyxRQUFRLENBQUMsYUFBYTtBQUNsQyxjQUFJLFNBQVMsU0FBUyxhQUFhO0FBQ2pDLGtCQUFNLEtBQUssU0FBUyxVQUFVLEVBQzNCLE9BQU8sQ0FBQyxTQUFTLEtBQUssYUFBYSxLQUFLLFlBQVksRUFDcEQsUUFBUSxDQUFDLFNBQVM7QUFDakIsbUJBQUssb0JBQW9CLElBQUk7QUFBQSxZQUMvQixDQUFDO0FBQUEsVUFDTDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFDQSxXQUFLLFdBQVcsSUFBSSxpQkFBaUIsZ0JBQWdCO0FBQ3JELFlBQU0sZ0JBQWdCLFNBQVMsY0FBYyxjQUFjO0FBQzNELFVBQUksZUFBZTtBQUNqQixhQUFLLFNBQVMsUUFBUSxlQUFlLGNBQWM7QUFBQSxNQUNyRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQixTQUFVLE1BQU07QUFDbkMsVUFBSSxLQUFLLFVBQVUsU0FBUyx3QkFBd0IsR0FBRztBQUNyRCxnQkFBUSxJQUFJLE9BQU87QUFDbkIsY0FBTSxlQUFlLEtBQUssY0FBYyxvQkFBb0I7QUFDNUQsWUFBSSxjQUFjO0FBQ2hCLFdBQUMsU0FBUyxTQUFTLFdBQVcsT0FBTyxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ3hELHlCQUFhLGlCQUFpQixPQUFPLE1BQU07QUFDekMsbUJBQUssa0JBQWtCLFlBQVk7QUFDbkMsbUJBQUssTUFBTSxVQUFVO0FBQUEsWUFDdkIsQ0FBQztBQUFBLFVBQ0gsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQ0EsWUFBTSxLQUFLLEtBQUssUUFBUSxFQUNyQixPQUFPLENBQUMsVUFBVSxNQUFNLGFBQWEsS0FBSyxZQUFZLEVBQ3RELFFBQVEsQ0FBQyxVQUFVO0FBQ2xCLGFBQUssb0JBQW9CLEtBQUs7QUFBQSxNQUNoQyxDQUFDO0FBQUEsSUFDTDtBQUFBLElBQ0EsbUJBQW1CLFNBQVUsTUFBTTtBQUNqQyxhQUFPLE1BQU0sWUFBWSxFQUFFLFVBQVU7QUFDckMsV0FBSyxXQUFXO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
