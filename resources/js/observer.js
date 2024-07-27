export default function observer() {
  return {
    observer: null,
    init: function () {
      const nodeSelector = ".fi-topbar .fi-global-search-field";
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
            node.style.display = "none";
          });
        });
      }
    },
    handleNodeActions: function (node) {
      Alpine.store("globalSearchModalStore").showModal();
      node.disabled = true;
      console.log('node handled succefully')
    },
  };
}
