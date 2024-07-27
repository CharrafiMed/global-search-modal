import modalStore from "./modal";

document.addEventListener("alpine:init", () => {
  window.Alpine.store("globalSearchModalStore", modalStore());
});

