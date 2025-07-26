export default function observer() {
  return {
    observer: null,
    modalOpen: false, // Track modal state

    init: function () {
      const nodeSelector = ".fi-global-search-field";

      const node = document.querySelector(nodeSelector);


      if (node) {
        node.disabled = true
        this.checkForTargetClass(node);
        this.listenForModalClose(node); 
      }

    },
    checkForTargetClass: function (node) {
      const inputElement = node.querySelector("input[type=search]");

      if (inputElement) {
        ["click", "keydown"].forEach((event) => {
          inputElement.addEventListener(event, (event) => {
            // Only open if modal is not already open
            if (!this.modalOpen) {
              console.log('Opening modal',event);

              window.dispatchEvent(new CustomEvent('open-global-search-modal', {
                detail: { id: 'global-search-modal::plugin' },
                bubbles: true,
              }));

              this.modalOpen = true;
              node.disabled = true;
            }
          });
        });
      }
    },
    listenForModalClose: function (node) {
      // Listen for modal close events
      window.addEventListener('modal-closed', (event) => {
        if (event.detail?.id === 'global-search-modal::plugin') {
          console.log('Modal closed, re-enabling node');
          
          this.modalOpen = false;
          // node.disabled = false;
        }
      });

    }
  };
}