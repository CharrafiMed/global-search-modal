// resources/js/modal.js
function modalStore() {
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
    }
  };
}

// resources/js/index.js
document.addEventListener("alpine:init", () => {
  window.Alpine.store("globalSearchModalStore", modalStore());
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIiwgIi4uL3Jlc291cmNlcy9qcy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW9kYWxTdG9yZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIHNob3dNb2RhbCgpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB9LFxuICAgIGhpZGVNb2RhbCgpIHsgIFxuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgIGNvbnN0IHNlYXJjaEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maS1nbG9iYWwtc2VhcmNoLWZpZWxkXCIpO1xuICAgICAgaWYgKHNlYXJjaEZpZWxkKSB7XG4gICAgICAgIHNlYXJjaEZpZWxkLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHNlYXJjaEZpZWxkLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXNlYXJjaF1cIik7XG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG4iLCAiaW1wb3J0IG1vZGFsU3RvcmUgZnJvbSBcIi4vbW9kYWxcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImFscGluZTppbml0XCIsICgpID0+IHtcblxuXG4gIHdpbmRvdy5BbHBpbmUuc3RvcmUoXCJnbG9iYWxTZWFyY2hNb2RhbFN0b3JlXCIsIG1vZGFsU3RvcmUoKSk7XG59KTtcblxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWUsU0FBUixhQUE4QjtBQUNuQyxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixZQUFZO0FBQ1YsV0FBSyxTQUFTO0FBQUEsSUFDaEI7QUFBQSxJQUNBLFlBQVk7QUFDVixXQUFLLFNBQVM7QUFDZCxZQUFNLGNBQWMsU0FBUyxjQUFjLHlCQUF5QjtBQUNwRSxVQUFJLGFBQWE7QUFDZixvQkFBWSxNQUFNLFVBQVU7QUFDNUIsY0FBTSxlQUFlLFlBQVksY0FBYyxvQkFBb0I7QUFDbkUsWUFBSSxjQUFjO0FBQ2hCLHVCQUFhLFdBQVc7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUNoQkEsU0FBUyxpQkFBaUIsZUFBZSxNQUFNO0FBRzdDLFNBQU8sT0FBTyxNQUFNLDBCQUEwQixXQUFXLENBQUM7QUFDNUQsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
