// resources/js/observer.js
function observer() {
  return {
    observer: null,
    modalOpen: false,
    isClosing: false,
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
        ["focus", "click", "keydown", "input"].forEach((eventType) => {
          inputElement.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.handleInputInteraction(event, node);
          }, true);
        });
        inputElement.addEventListener("keypress", (event) => {
          event.preventDefault();
          event.stopPropagation();
        }, true);
        inputElement.setAttribute("readonly", true);
        inputElement.setAttribute("tabindex", "-1");
      }
    },
    handleInputInteraction: function(event, node) {
      if (this.modalOpen || this.isClosing) {
        return;
      }
      if (event.target) {
        event.target.blur();
      }
      this.openModal(node);
    },
    openModal: function(node) {
      this.modalOpen = true;
      node.disabled = true;
      window.dispatchEvent(new CustomEvent("open-global-search-modal", {
        detail: { id: "global-search-modal::plugin" },
        bubbles: true
      }));
    },
    listenForModalClose: function(node) {
      window.addEventListener("modal-closed", (event) => {
        if (event.detail?.id === "global-search-modal::plugin") {
          this.modalOpen = false;
          const inputElement = node.querySelector("input[type=search]");
          inputElement.disabled = false;
          inputElement.setAttribute("readonly", false);
          inputElement.setAttribute("tabindex", 0);
        }
      });
    }
  };
}
export {
  observer as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBtb2RhbE9wZW46IGZhbHNlLFxuICAgIGlzQ2xvc2luZzogZmFsc2UsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBub2RlU2VsZWN0b3IgPSBcIi5maS1nbG9iYWwtc2VhcmNoLWZpZWxkXCI7XG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlU2VsZWN0b3IpO1xuXG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja0ZvclRhcmdldENsYXNzKG5vZGUpO1xuICAgICAgICB0aGlzLmxpc3RlbkZvck1vZGFsQ2xvc2Uobm9kZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRm9yVGFyZ2V0Q2xhc3M6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXNlYXJjaF1cIik7XG5cbiAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgLy8gRXZlbnRzIHRoYXQgc2hvdWxkIG9wZW4gdGhlIG1vZGFsIChkaWQgbW9yZSB0aGFuIGZvY3VzIGFuZCBjbGljayB0byBoYW5kbGUgZWRnZSBjYXNlcylcbiAgICAgICAgW1wiZm9jdXNcIiwgXCJjbGlja1wiLCBcImtleWRvd25cIiwgXCJpbnB1dFwiXS5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dEludGVyYWN0aW9uKGV2ZW50LCBub2RlKTtcbiAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9yIFByZXZlbnQgYW55IHR5cGluZyBvciBpbnRlcmFjdGlvblxuICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsIHRydWUpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVJbnB1dEludGVyYWN0aW9uOiBmdW5jdGlvbiAoZXZlbnQsIG5vZGUpIHtcbiAgICAgIC8vIERvbid0IG9wZW4gbW9kYWwgaWYgaXQncyBhbHJlYWFkeSBvcGVuIG9yIGluIHRoZSBwcm9jZXNzIG9mIGNsb3NpbmdcbiAgICAgIGlmICh0aGlzLm1vZGFsT3BlbiB8fCB0aGlzLmlzQ2xvc2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEltbWVkaWF0ZWx5IGJsdXIgdGhlIGlucHV0IHRvIHByZXZlbnQgZm9jdXNcbiAgICAgIGlmIChldmVudC50YXJnZXQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmJsdXIoKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3BlbiB0aGUgbW9kYWxcbiAgICAgIHRoaXMub3Blbk1vZGFsKG5vZGUpO1xuICAgIH0sXG5cbiAgICBvcGVuTW9kYWw6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB0aGlzLm1vZGFsT3BlbiA9IHRydWU7XG4gICAgICBub2RlLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvcGVuLWdsb2JhbC1zZWFyY2gtbW9kYWwnLCB7XG4gICAgICAgIGRldGFpbDogeyBpZDogJ2dsb2JhbC1zZWFyY2gtbW9kYWw6OnBsdWdpbicgfSxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgbGlzdGVuRm9yTW9kYWxDbG9zZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb2RhbC1jbG9zZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8uaWQgPT09ICdnbG9iYWwtc2VhcmNoLW1vZGFsOjpwbHVnaW4nKSB7XG4gICAgICAgICAgdGhpcy5tb2RhbE9wZW4gPSBmYWxzZTtcbiAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXNlYXJjaF1cIik7XG4gICAgICAgICAgaW5wdXRFbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCBmYWxzZSk7XG4gICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLFdBQTRCO0FBQ2pDLFNBQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUVYLE1BQU0sV0FBWTtBQUNoQixZQUFNLGVBQWU7QUFDckIsWUFBTSxPQUFPLFNBQVMsY0FBYyxZQUFZO0FBRWhELFVBQUksTUFBTTtBQUNSLGFBQUssV0FBVztBQUNoQixhQUFLLG9CQUFvQixJQUFJO0FBQzdCLGFBQUssb0JBQW9CLElBQUk7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUVBLHFCQUFxQixTQUFVLE1BQU07QUFDbkMsWUFBTSxlQUFlLEtBQUssY0FBYyxvQkFBb0I7QUFFNUQsVUFBSSxjQUFjO0FBRWhCLFNBQUMsU0FBUyxTQUFTLFdBQVcsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjO0FBQzVELHVCQUFhLGlCQUFpQixXQUFXLENBQUMsVUFBVTtBQUNsRCxrQkFBTSxlQUFlO0FBQ3JCLGtCQUFNLGdCQUFnQjtBQUN0QixpQkFBSyx1QkFBdUIsT0FBTyxJQUFJO0FBQUEsVUFDekMsR0FBRyxJQUFJO0FBQUEsUUFDVCxDQUFDO0FBR0QscUJBQWEsaUJBQWlCLFlBQVksQ0FBQyxVQUFVO0FBQ25ELGdCQUFNLGVBQWU7QUFDckIsZ0JBQU0sZ0JBQWdCO0FBQUEsUUFDeEIsR0FBRyxJQUFJO0FBRVAscUJBQWEsYUFBYSxZQUFZLElBQUk7QUFDMUMscUJBQWEsYUFBYSxZQUFZLElBQUk7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFBQSxJQUVBLHdCQUF3QixTQUFVLE9BQU8sTUFBTTtBQUU3QyxVQUFJLEtBQUssYUFBYSxLQUFLLFdBQVc7QUFDcEM7QUFBQSxNQUNGO0FBR0EsVUFBSSxNQUFNLFFBQVE7QUFDaEIsY0FBTSxPQUFPLEtBQUs7QUFBQSxNQUNwQjtBQUdBLFdBQUssVUFBVSxJQUFJO0FBQUEsSUFDckI7QUFBQSxJQUVBLFdBQVcsU0FBVSxNQUFNO0FBQ3pCLFdBQUssWUFBWTtBQUNqQixXQUFLLFdBQVc7QUFFaEIsYUFBTyxjQUFjLElBQUksWUFBWSw0QkFBNEI7QUFBQSxRQUMvRCxRQUFRLEVBQUUsSUFBSSw4QkFBOEI7QUFBQSxRQUM1QyxTQUFTO0FBQUEsTUFDWCxDQUFDLENBQUM7QUFBQSxJQUNKO0FBQUEsSUFFQSxxQkFBcUIsU0FBVSxNQUFNO0FBQ25DLGFBQU8saUJBQWlCLGdCQUFnQixDQUFDLFVBQVU7QUFDakQsWUFBSSxNQUFNLFFBQVEsT0FBTywrQkFBK0I7QUFDdEQsZUFBSyxZQUFZO0FBQ2pCLGdCQUFNLGVBQWUsS0FBSyxjQUFjLG9CQUFvQjtBQUM1RCx1QkFBYSxXQUFXO0FBQ3hCLHVCQUFhLGFBQWEsWUFBWSxLQUFLO0FBQzNDLHVCQUFhLGFBQWEsWUFBWSxDQUFDO0FBQUEsUUFDekM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
