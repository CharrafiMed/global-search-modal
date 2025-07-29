import modalStore from "./modal";
import AlpineAnimation from '@charrafimed/alpine-animation'


document.addEventListener("alpine:init", () => {

  Alpine.plugin(AlpineAnimation);

  window.Alpine.store("globalSearchModalStore", modalStore());
});


