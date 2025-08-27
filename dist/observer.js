// resources/js/observer.js
function observer() {
  return {
    observer: null,
    modalOpen: false,
    isClosing: false,
    // Prevent reopening during close transition
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
          this.isClosing = true;
          setTimeout(() => {
            this.modalOpen = false;
            this.isClosing = false;
          }, 100);
        }
      });
      document.addEventListener("focusin", (event) => {
        const inputElement = node.querySelector("input[type=search]");
        if (event.target === inputElement && !this.modalOpen && !this.isClosing) {
          event.preventDefault();
          event.target.blur();
          this.handleInputInteraction(event, node);
        }
      }, true);
    }
  };
}
export {
  observer as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL29ic2VydmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYnNlcnZlcigpIHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlcjogbnVsbCxcbiAgICBtb2RhbE9wZW46IGZhbHNlLFxuICAgIGlzQ2xvc2luZzogZmFsc2UsIC8vIFByZXZlbnQgcmVvcGVuaW5nIGR1cmluZyBjbG9zZSB0cmFuc2l0aW9uXG4gICAgXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgbm9kZVNlbGVjdG9yID0gXCIuZmktZ2xvYmFsLXNlYXJjaC1maWVsZFwiO1xuICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobm9kZVNlbGVjdG9yKTtcbiAgICAgIFxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JUYXJnZXRDbGFzcyhub2RlKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Gb3JNb2RhbENsb3NlKG5vZGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgY2hlY2tGb3JUYXJnZXRDbGFzczogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IG5vZGUucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcbiAgICAgIFxuICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgICAvLyBFdmVudHMgdGhhdCBzaG91bGQgb3BlbiB0aGUgbW9kYWxcbiAgICAgICAgW1wiZm9jdXNcIiwgXCJjbGlja1wiLCBcImtleWRvd25cIiwgXCJpbnB1dFwiXS5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dEludGVyYWN0aW9uKGV2ZW50LCBub2RlKTtcbiAgICAgICAgICB9LCB0cnVlKTsgLy8gVXNlIGNhcHR1cmUgcGhhc2VcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBQcmV2ZW50IGFueSB0eXBpbmcgb3IgaW50ZXJhY3Rpb25cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBNYWtlIGlucHV0IHJlYWRvbmx5IGFzIGFkZGl0aW9uYWwgcHJvdGVjdGlvblxuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsIHRydWUpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgaGFuZGxlSW5wdXRJbnRlcmFjdGlvbjogZnVuY3Rpb24gKGV2ZW50LCBub2RlKSB7XG4gICAgICAvLyBEb24ndCBvcGVuIG1vZGFsIGlmIGl0J3MgYWxyZWFkeSBvcGVuIG9yIGluIHRoZSBwcm9jZXNzIG9mIGNsb3NpbmdcbiAgICAgIGlmICh0aGlzLm1vZGFsT3BlbiB8fCB0aGlzLmlzQ2xvc2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEltbWVkaWF0ZWx5IGJsdXIgdGhlIGlucHV0IHRvIHByZXZlbnQgZm9jdXNcbiAgICAgIGlmIChldmVudC50YXJnZXQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmJsdXIoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gT3BlbiB0aGUgbW9kYWxcbiAgICAgIHRoaXMub3Blbk1vZGFsKG5vZGUpO1xuICAgIH0sXG4gICAgXG4gICAgb3Blbk1vZGFsOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdGhpcy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgbm9kZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb3Blbi1nbG9iYWwtc2VhcmNoLW1vZGFsJywge1xuICAgICAgICBkZXRhaWw6IHsgaWQ6ICdnbG9iYWwtc2VhcmNoLW1vZGFsOjpwbHVnaW4nIH0sXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBcbiAgICBsaXN0ZW5Gb3JNb2RhbENsb3NlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vZGFsLWNsb3NlZCcsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGV0YWlsPy5pZCA9PT0gJ2dsb2JhbC1zZWFyY2gtbW9kYWw6OnBsdWdpbicpIHtcbiAgICAgICAgICB0aGlzLmlzQ2xvc2luZyA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gU21hbGwgZGVsYXkgdG8gcHJldmVudCBpbW1lZGlhdGUgcmVvcGVuaW5nXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0Nsb3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIEtlZXAgdGhlIG5vZGUgZGlzYWJsZWQgdG8gcHJldmVudCBpbnRlcmFjdGlvblxuICAgICAgICAgICAgLy8gbm9kZS5kaXNhYmxlZCA9IGZhbHNlOyAvLyBLZWVwIGNvbW1lbnRlZCB0byBtYWludGFpbiBkaXNhYmxlZCBzdGF0ZVxuICAgICAgICAgIH0sIDEwMCk7IC8vIFNob3J0IGRlbGF5IHRvIHByZXZlbnQgcmFjZSBjb25kaXRpb25zXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBBZGRpdGlvbmFsIHNhZmV0eTogbGlzdGVuIGZvciBhbnkgZm9jdXMgZXZlbnRzIG9uIHRoZSBkb2N1bWVudFxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXNlYXJjaF1cIik7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGlucHV0RWxlbWVudCAmJiAhdGhpcy5tb2RhbE9wZW4gJiYgIXRoaXMuaXNDbG9zaW5nKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuYmx1cigpO1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW5wdXRJbnRlcmFjdGlvbihldmVudCwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfTtcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixXQUE0QjtBQUNqQyxTQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUE7QUFBQSxJQUVYLE1BQU0sV0FBWTtBQUNoQixZQUFNLGVBQWU7QUFDckIsWUFBTSxPQUFPLFNBQVMsY0FBYyxZQUFZO0FBRWhELFVBQUksTUFBTTtBQUNSLGFBQUssV0FBVztBQUNoQixhQUFLLG9CQUFvQixJQUFJO0FBQzdCLGFBQUssb0JBQW9CLElBQUk7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxJQUVBLHFCQUFxQixTQUFVLE1BQU07QUFDbkMsWUFBTSxlQUFlLEtBQUssY0FBYyxvQkFBb0I7QUFFNUQsVUFBSSxjQUFjO0FBRWhCLFNBQUMsU0FBUyxTQUFTLFdBQVcsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjO0FBQzVELHVCQUFhLGlCQUFpQixXQUFXLENBQUMsVUFBVTtBQUNsRCxrQkFBTSxlQUFlO0FBQ3JCLGtCQUFNLGdCQUFnQjtBQUN0QixpQkFBSyx1QkFBdUIsT0FBTyxJQUFJO0FBQUEsVUFDekMsR0FBRyxJQUFJO0FBQUEsUUFDVCxDQUFDO0FBR0QscUJBQWEsaUJBQWlCLFlBQVksQ0FBQyxVQUFVO0FBQ25ELGdCQUFNLGVBQWU7QUFDckIsZ0JBQU0sZ0JBQWdCO0FBQUEsUUFDeEIsR0FBRyxJQUFJO0FBR1AscUJBQWEsYUFBYSxZQUFZLElBQUk7QUFDMUMscUJBQWEsYUFBYSxZQUFZLElBQUk7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFBQSxJQUVBLHdCQUF3QixTQUFVLE9BQU8sTUFBTTtBQUU3QyxVQUFJLEtBQUssYUFBYSxLQUFLLFdBQVc7QUFDcEM7QUFBQSxNQUNGO0FBR0EsVUFBSSxNQUFNLFFBQVE7QUFDaEIsY0FBTSxPQUFPLEtBQUs7QUFBQSxNQUNwQjtBQUdBLFdBQUssVUFBVSxJQUFJO0FBQUEsSUFDckI7QUFBQSxJQUVBLFdBQVcsU0FBVSxNQUFNO0FBQ3pCLFdBQUssWUFBWTtBQUNqQixXQUFLLFdBQVc7QUFFaEIsYUFBTyxjQUFjLElBQUksWUFBWSw0QkFBNEI7QUFBQSxRQUMvRCxRQUFRLEVBQUUsSUFBSSw4QkFBOEI7QUFBQSxRQUM1QyxTQUFTO0FBQUEsTUFDWCxDQUFDLENBQUM7QUFBQSxJQUNKO0FBQUEsSUFFQSxxQkFBcUIsU0FBVSxNQUFNO0FBQ25DLGFBQU8saUJBQWlCLGdCQUFnQixDQUFDLFVBQVU7QUFDakQsWUFBSSxNQUFNLFFBQVEsT0FBTywrQkFBK0I7QUFDdEQsZUFBSyxZQUFZO0FBR2pCLHFCQUFXLE1BQU07QUFDZixpQkFBSyxZQUFZO0FBQ2pCLGlCQUFLLFlBQVk7QUFBQSxVQUduQixHQUFHLEdBQUc7QUFBQSxRQUNSO0FBQUEsTUFDRixDQUFDO0FBR0QsZUFBUyxpQkFBaUIsV0FBVyxDQUFDLFVBQVU7QUFDOUMsY0FBTSxlQUFlLEtBQUssY0FBYyxvQkFBb0I7QUFDNUQsWUFBSSxNQUFNLFdBQVcsZ0JBQWdCLENBQUMsS0FBSyxhQUFhLENBQUMsS0FBSyxXQUFXO0FBQ3ZFLGdCQUFNLGVBQWU7QUFDckIsZ0JBQU0sT0FBTyxLQUFLO0FBQ2xCLGVBQUssdUJBQXVCLE9BQU8sSUFBSTtBQUFBLFFBQ3pDO0FBQUEsTUFDRixHQUFHLElBQUk7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
