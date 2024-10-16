// resources/js/observer.js
function observer() {
  return {
    observer: null,
    init: function() {
      const nodeSelector = ".fi-global-search-field";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBub2RlU2VsZWN0b3IgPSBcIi5maS1nbG9iYWwtc2VhcmNoLWZpZWxkXCI7XG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlU2VsZWN0b3IpOyAgICAgIFxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcbiAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgW1wiY2xpY2tcIiwgXCJmb2N1c1wiLCBcImtleWRvd25cIiwgXCJpbnB1dFwiXS5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZU5vZGVBY3Rpb25zKGlucHV0RWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlTm9kZUFjdGlvbnM6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBBbHBpbmUuc3RvcmUoXCJnbG9iYWxTZWFyY2hNb2RhbFN0b3JlXCIpLnNob3dNb2RhbCgpO1xuICAgICAgbm9kZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLFdBQTRCO0FBQ2pDLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLE1BQU0sV0FBWTtBQUNoQixZQUFNLGVBQWU7QUFDckIsWUFBTSxPQUFPLFNBQVMsY0FBYyxZQUFZO0FBQ2hELFVBQUksTUFBTTtBQUNSLGFBQUssb0JBQW9CLElBQUk7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQixTQUFVLE1BQU07QUFDbkMsWUFBTSxlQUFlLEtBQUssY0FBYyxvQkFBb0I7QUFDNUQsVUFBSSxjQUFjO0FBQ2hCLFNBQUMsU0FBUyxTQUFTLFdBQVcsT0FBTyxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ3hELHVCQUFhLGlCQUFpQixPQUFPLE1BQU07QUFDekMsaUJBQUssa0JBQWtCLFlBQVk7QUFBQSxVQUNyQyxDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxJQUNBLG1CQUFtQixTQUFVLE1BQU07QUFDakMsYUFBTyxNQUFNLHdCQUF3QixFQUFFLFVBQVU7QUFDakQsV0FBSyxXQUFXO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
