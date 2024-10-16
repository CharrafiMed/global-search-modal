export default function observer() {
  return {
    observer: null,
    init: function () {
      const nodeSelector = ".fi-global-search-field";
      const node = document.querySelector(nodeSelector);      
      if (node) {
        this.checkForTargetClass(node);
      }
    },
    checkForTargetClass: function (node) {
      const inputElement = node.querySelector("input[type=search]");
      if (inputElement) {
        ["click", "focus", "keydown", "input"].forEach((event) => {
          inputElement.addEventListener(event, () => {
            this.handleNodeActions(inputElement);
          });
        });
      }
    },
    handleNodeActions: function (node) {
      Alpine.store("globalSearchModalStore").showModal();
      node.disabled = true;
    },
  };
}
