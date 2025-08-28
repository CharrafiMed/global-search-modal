export default function observer() {
  return {
    observer: null,
    modalOpen: false,

    init: function () {
      const nodeSelector = ".fi-global-search-field";
      const node = document.querySelector(nodeSelector);

      if (node) {
        node.disabled = true;
        this.checkForTargetClass(node);
        this.listenForModalClose(node);
      }
    },

    checkForTargetClass: function (node) {
      const inputElement = node.querySelector("input[type=search]");

      if (inputElement) {
        // Events that should open the modal (did more than focus and click to handle edge cases)
        ["focus", "click", "keydown", "input"].forEach((eventType) => {
          inputElement.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.handleInputInteraction(event, node);
          }, true);
        });

        // for Prevent any typing or interaction
        inputElement.addEventListener('keypress', (event) => {
          event.preventDefault();
          event.stopPropagation();
        }, true);

        inputElement.setAttribute('readonly', true);
        inputElement.setAttribute('tabindex', '-1');
      }
    },

    handleInputInteraction: function (event, node) {
      // Don't open modal if it's alreaady open
      if (this.modalOpen) {
        return;
      }

      // Immediately blur the input to prevent focus
      if (event.target) {
        event.target.blur();
      }

      // Open the modal
      this.openModal(node);
    },

    openModal: function (node) {
      this.modalOpen = true;
      node.disabled = true;

      window.dispatchEvent(new CustomEvent('open-global-search-modal', {
        detail: { id: 'global-search-modal::plugin' },
        bubbles: true,
      }));
    },

    listenForModalClose: function (node) {
      window.addEventListener('modal-closed', (event) => {
        if (event.detail?.id === 'global-search-modal::plugin') {
          this.modalOpen = false;
          const inputElement = node.querySelector("input[type=search]");
          inputElement.disabled = false;
          inputElement.setAttribute('readonly', false);
          inputElement.setAttribute('tabindex', 0);
        }
      });
    }
  };
}