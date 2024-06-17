export default function GlobalSearchModal() {
  return {
    observer: null,
    init: function () {
      this.initObserver();
    },
    initObserver() {
      const targetSelector = ".fi-topbar";
      const observerConfig = {
        childList: true,
        subtree: true,
      };
      const observerCallback = (mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === "childList") {
            Array.from(mutation.addedNodes)
              .filter((node) => node.nodeType === Node.ELEMENT_NODE)
              .forEach((node) => {
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

    checkForTargetClass(node) {
      if (node.classList.contains("fi-global-search-field")) {
        node.addEventListener("click", () => {
          console.log("clicked on fi-global-search-field element");
          node.dispatchEvent(new CustomEvent("global-search-input-clicked"));
          node.disabled = true;
          // Remove the input from the DOM
          node.remove();
          // Dispatch an event or perform actions when clicked
        });
        return;
      }
      Array.from(node.children)
        .filter((child) => child.nodeType === Node.ELEMENT_NODE)
        .forEach((child) => {
          this.checkForTargetClass(child);
        });
    },
  };
}
