// resources/js/modal.js
function modalStore() {
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
    }
  };
}

// resources/js/index.js
document.addEventListener("alpine:init", () => {
  Alpine.store("modalStore", modalStore());
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIiwgIi4uL3Jlc291cmNlcy9qcy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW9kYWxTdG9yZSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb3BlbjogZmFsc2UsXHJcbiAgICBzaG93TW9kYWwoKSB7XHJcbiAgICAgIHRoaXMub3BlbiA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgaGlkZU1vZGFsKCkge1xyXG4gICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcclxuICAgICAgY29uc3Qgc2VhcmNoRmlsZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpLWdsb2JhbC1zZWFyY2gtZmllbGRcIik7XHJcbiAgICAgIGlmIChzZWFyY2hGaWxlZCkge1xyXG4gICAgICAgIHNlYXJjaEZpbGVkLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gc2VhcmNoRmlsZWQucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcclxuICAgICAgICBpZiAoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iLCAiaW1wb3J0IG1vZGFsU3RvcmUgZnJvbSBcIi4vbW9kYWxcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhbHBpbmU6aW5pdFwiLCAoKSA9PiB7XHJcbiAgQWxwaW5lLnN0b3JlKFwibW9kYWxTdG9yZVwiLCBtb2RhbFN0b3JlKCkpO1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsYUFBOEI7QUFDbkMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUNWLFdBQUssT0FBTztBQUFBLElBQ2Q7QUFBQSxJQUNBLFlBQVk7QUFDVixXQUFLLE9BQU87QUFDWixZQUFNLGNBQWMsU0FBUyxjQUFjLHlCQUF5QjtBQUNwRSxVQUFJLGFBQWE7QUFDZixvQkFBWSxNQUFNLFVBQVU7QUFDNUIsY0FBTSxlQUFlLFlBQVksY0FBYyxvQkFBb0I7QUFDbkUsWUFBSSxjQUFjO0FBQ2hCLHVCQUFhLFdBQVc7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUNoQkEsU0FBUyxpQkFBaUIsZUFBZSxNQUFNO0FBQzdDLFNBQU8sTUFBTSxjQUFjLFdBQVcsQ0FBQztBQUN6QyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
