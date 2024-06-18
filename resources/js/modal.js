export default function modalStore() {
  return {
    open: false,
    showModal() {
      this.open = true;
    },
    hideModal() {
      this.open = false;
      const searchFiled = document.querySelector(".fi-global-search-field");
      if (searchFiled) {
        searchFiled.style.display = "block";
        const inputElement = searchFiled.querySelector("input[type=search]");
        if (inputElement) {
          inputElement.disabled = false;
        }
      }
    },
  };
}
