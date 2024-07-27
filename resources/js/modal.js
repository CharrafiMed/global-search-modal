export default function modalStore() {
  return {
    isOpen: false,
    showModal() {
      this.isOpen = true;
    },
    hideModal() {  
      this.isOpen = false;
      const searchField = document.querySelector(".fi-global-search-field");
      if (searchField) {
        searchField.style.display = "block";
        const inputElement = searchField.querySelector("input[type=search]");
        if (inputElement) {
          inputElement.disabled = false;
        }
      }
    },
  };
}
