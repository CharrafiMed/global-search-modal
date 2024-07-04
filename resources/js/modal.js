export default function modalStore() {
  return {
    isOpen: false,
    showModal() {
      this.isOpen = true;
    },
    hideModal() {  
      this.isOpen = false;
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
