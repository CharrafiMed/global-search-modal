import modalStore from "./modal";

document.addEventListener("alpine:init", () => {
  Alpine.store("modalStore", modalStore());
});
