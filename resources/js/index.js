import modalStore from "./modal";
import Animate from '@charrafimed/alpine-animation'


document.addEventListener("alpine:init", () => {
  Alpine.plugin(Animate)
  window.Alpine.store("globalSearchModalStore", modalStore());
});


