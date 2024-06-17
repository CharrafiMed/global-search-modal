import globalModal from "./globalModal";

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(globalModal);
});
