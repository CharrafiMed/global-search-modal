export default function modal() {
  return {
    observer: null,
    open: false,
    init: function () {
      this.initObserver();
    },
    initObserver: function () {
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
    checkForTargetClass: function (node) {
      if (node.classList.contains("fi-global-search-field")) {
        console.log("added");
        const inputElement = node.querySelector("input[type=search]");
        if (inputElement) {
          ["click", "focus", "keydown", "input"].forEach((event) => {
            inputElement.addEventListener(event, () => {
              this.handleNodeActions(inputElement);
            });
          });
        }
        // ["click", "focus", "keydown", "input"].forEach((event) => {
        //   node.addEventListener(event, () => {
        //     this.handleNodeActions(node);
        //   });
        // });
      }
      Array.from(node.children)
        .filter((child) => child.nodeType === Node.ELEMENT_NODE)
        .forEach((child) => {
          this.checkForTargetClass(child);
        });
    },
    handleNodeActions: function () {
      Alpine.store("modalStore").showModal();
      node.disabled = true;
      node.style.display = "none";
    },
  };
}
