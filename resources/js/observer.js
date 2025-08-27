export default function observer() {
  return {
    observer: null,
    modalOpen: false,
    isClosing: false, // Prevent reopening during close transition
    
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
        // Events that should open the modal
        ["focus", "click", "keydown", "input"].forEach((eventType) => {
          inputElement.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.handleInputInteraction(event, node);
          }, true); // Use capture phase
        });
        
        // Prevent any typing or interaction
        inputElement.addEventListener('keypress', (event) => {
          event.preventDefault();
          event.stopPropagation();
        }, true);
        
        // Make input readonly as additional protection
        inputElement.setAttribute('readonly', true);
        inputElement.setAttribute('tabindex', '-1');
      }
    },
    
    handleInputInteraction: function (event, node) {
      // Don't open modal if it's already open or in the process of closing
      if (this.modalOpen || this.isClosing) {
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
          this.isClosing = true;
          
          // Small delay to prevent immediate reopening
          setTimeout(() => {
            this.modalOpen = false;
            this.isClosing = false;
            // Keep the node disabled to prevent interaction
            // node.disabled = false; // Keep commented to maintain disabled state
          }, 100); // Short delay to prevent race conditions
        }
      });
      
      // Additional safety: listen for any focus events on the document
      document.addEventListener('focusin', (event) => {
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