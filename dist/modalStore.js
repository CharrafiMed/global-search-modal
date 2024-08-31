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

// node_modules/@charrafimed/alpine-animation/dist/module.esm.js
var parents = /* @__PURE__ */ new Set();
var coords = /* @__PURE__ */ new WeakMap();
var siblings = /* @__PURE__ */ new WeakMap();
var animations = /* @__PURE__ */ new WeakMap();
var intersections = /* @__PURE__ */ new WeakMap();
var intervals = /* @__PURE__ */ new WeakMap();
var options = /* @__PURE__ */ new WeakMap();
var debounces = /* @__PURE__ */ new WeakMap();
var enabled = /* @__PURE__ */ new WeakSet();
var root;
var scrollX = 0;
var scrollY = 0;
var TGT = "__aa_tgt";
var DEL = "__aa_del";
var NEW = "__aa_new";
var handleMutations = (mutations2) => {
  const elements = getElements(mutations2);
  if (elements) {
    elements.forEach((el) => animate(el));
  }
};
var handleResizes = (entries) => {
  entries.forEach((entry) => {
    if (entry.target === root)
      updateAllPos();
    if (coords.has(entry.target))
      updatePos(entry.target);
  });
};
function observePosition(el) {
  const oldObserver = intersections.get(el);
  oldObserver === null || oldObserver === void 0 ? void 0 : oldObserver.disconnect();
  let rect = coords.get(el);
  let invocations = 0;
  const buffer = 5;
  if (!rect) {
    rect = getCoords(el);
    coords.set(el, rect);
  }
  const { offsetWidth, offsetHeight } = root;
  const rootMargins = [
    rect.top - buffer,
    offsetWidth - (rect.left + buffer + rect.width),
    offsetHeight - (rect.top + buffer + rect.height),
    rect.left - buffer
  ];
  const rootMargin = rootMargins.map((px) => `${-1 * Math.floor(px)}px`).join(" ");
  const observer = new IntersectionObserver(() => {
    ++invocations > 1 && updatePos(el);
  }, {
    root,
    threshold: 1,
    rootMargin
  });
  observer.observe(el);
  intersections.set(el, observer);
}
function updatePos(el) {
  clearTimeout(debounces.get(el));
  const optionsOrPlugin = getOptions(el);
  const delay = isPlugin(optionsOrPlugin) ? 500 : optionsOrPlugin.duration;
  debounces.set(el, setTimeout(async () => {
    const currentAnimation = animations.get(el);
    try {
      await (currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.finished);
      coords.set(el, getCoords(el));
      observePosition(el);
    } catch {
    }
  }, delay));
}
function updateAllPos() {
  clearTimeout(debounces.get(root));
  debounces.set(root, setTimeout(() => {
    parents.forEach((parent) => forEach(parent, (el) => lowPriority(() => updatePos(el))));
  }, 100));
}
function poll(el) {
  setTimeout(() => {
    intervals.set(el, setInterval(() => lowPriority(updatePos.bind(null, el)), 2e3));
  }, Math.round(2e3 * Math.random()));
}
function lowPriority(callback) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(() => callback());
  } else {
    requestAnimationFrame(() => callback());
  }
}
var mutations;
var resize;
var supportedBrowser = typeof window !== "undefined" && "ResizeObserver" in window;
if (supportedBrowser) {
  root = document.documentElement;
  mutations = new MutationObserver(handleMutations);
  resize = new ResizeObserver(handleResizes);
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
    scrollX = window.scrollX;
  });
  resize.observe(root);
}
function getElements(mutations2) {
  const observedNodes = mutations2.reduce((nodes, mutation) => {
    return [
      ...nodes,
      ...Array.from(mutation.addedNodes),
      ...Array.from(mutation.removedNodes)
    ];
  }, []);
  const onlyCommentNodesObserved = observedNodes.every((node) => node.nodeName === "#comment");
  if (onlyCommentNodesObserved)
    return false;
  return mutations2.reduce((elements, mutation) => {
    if (elements === false)
      return false;
    if (mutation.target instanceof Element) {
      target(mutation.target);
      if (!elements.has(mutation.target)) {
        elements.add(mutation.target);
        for (let i = 0; i < mutation.target.children.length; i++) {
          const child = mutation.target.children.item(i);
          if (!child)
            continue;
          if (DEL in child) {
            return false;
          }
          target(mutation.target, child);
          elements.add(child);
        }
      }
      if (mutation.removedNodes.length) {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const child = mutation.removedNodes[i];
          if (DEL in child) {
            return false;
          }
          if (child instanceof Element) {
            elements.add(child);
            target(mutation.target, child);
            siblings.set(child, [
              mutation.previousSibling,
              mutation.nextSibling
            ]);
          }
        }
      }
    }
    return elements;
  }, /* @__PURE__ */ new Set());
}
function target(el, child) {
  if (!child && !(TGT in el))
    Object.defineProperty(el, TGT, { value: el });
  else if (child && !(TGT in child))
    Object.defineProperty(child, TGT, { value: el });
}
function animate(el) {
  var _a;
  const isMounted = el.isConnected;
  const preExisting = coords.has(el);
  if (isMounted && siblings.has(el))
    siblings.delete(el);
  if (animations.has(el)) {
    (_a = animations.get(el)) === null || _a === void 0 ? void 0 : _a.cancel();
  }
  if (NEW in el) {
    add(el);
  } else if (preExisting && isMounted) {
    remain(el);
  } else if (preExisting && !isMounted) {
    remove(el);
  } else {
    add(el);
  }
}
function raw(str) {
  return Number(str.replace(/[^0-9.\-]/g, ""));
}
function getScrollOffset(el) {
  let p = el.parentElement;
  while (p) {
    if (p.scrollLeft || p.scrollTop) {
      return { x: p.scrollLeft, y: p.scrollTop };
    }
    p = p.parentElement;
  }
  return { x: 0, y: 0 };
}
function getCoords(el) {
  const rect = el.getBoundingClientRect();
  const { x, y } = getScrollOffset(el);
  return {
    top: rect.top + y,
    left: rect.left + x,
    width: rect.width,
    height: rect.height
  };
}
function getTransitionSizes(el, oldCoords, newCoords) {
  let widthFrom = oldCoords.width;
  let heightFrom = oldCoords.height;
  let widthTo = newCoords.width;
  let heightTo = newCoords.height;
  const styles = getComputedStyle(el);
  const sizing = styles.getPropertyValue("box-sizing");
  if (sizing === "content-box") {
    const paddingY = raw(styles.paddingTop) + raw(styles.paddingBottom) + raw(styles.borderTopWidth) + raw(styles.borderBottomWidth);
    const paddingX = raw(styles.paddingLeft) + raw(styles.paddingRight) + raw(styles.borderRightWidth) + raw(styles.borderLeftWidth);
    widthFrom -= paddingX;
    widthTo -= paddingX;
    heightFrom -= paddingY;
    heightTo -= paddingY;
  }
  return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round);
}
function getOptions(el) {
  return TGT in el && options.has(el[TGT]) ? options.get(el[TGT]) : { duration: 250, easing: "ease-in-out" };
}
function getTarget(el) {
  if (TGT in el)
    return el[TGT];
  return void 0;
}
function isEnabled(el) {
  const target2 = getTarget(el);
  return target2 ? enabled.has(target2) : false;
}
function forEach(parent, ...callbacks) {
  callbacks.forEach((callback) => callback(parent, options.has(parent)));
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children.item(i);
    if (child) {
      callbacks.forEach((callback) => callback(child, options.has(child)));
    }
  }
}
function getPluginTuple(pluginReturn) {
  if (Array.isArray(pluginReturn))
    return pluginReturn;
  return [pluginReturn];
}
function isPlugin(config) {
  return typeof config === "function";
}
function remain(el) {
  const oldCoords = coords.get(el);
  const newCoords = getCoords(el);
  if (!isEnabled(el))
    return coords.set(el, newCoords);
  let animation;
  if (!oldCoords)
    return;
  const pluginOrOptions = getOptions(el);
  if (typeof pluginOrOptions !== "function") {
    const deltaX = oldCoords.left - newCoords.left;
    const deltaY = oldCoords.top - newCoords.top;
    const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
    const start = {
      transform: `translate(${deltaX}px, ${deltaY}px)`
    };
    const end = {
      transform: `translate(0, 0)`
    };
    if (widthFrom !== widthTo) {
      start.width = `${widthFrom}px`;
      end.width = `${widthTo}px`;
    }
    if (heightFrom !== heightTo) {
      start.height = `${heightFrom}px`;
      end.height = `${heightTo}px`;
    }
    animation = el.animate([start, end], {
      duration: pluginOrOptions.duration,
      easing: pluginOrOptions.easing
    });
  } else {
    const [keyframes] = getPluginTuple(pluginOrOptions(el, "remain", oldCoords, newCoords));
    animation = new Animation(keyframes);
    animation.play();
  }
  animations.set(el, animation);
  coords.set(el, newCoords);
  animation.addEventListener("finish", updatePos.bind(null, el));
}
function add(el) {
  if (NEW in el)
    delete el[NEW];
  const newCoords = getCoords(el);
  coords.set(el, newCoords);
  const pluginOrOptions = getOptions(el);
  if (!isEnabled(el))
    return;
  let animation;
  if (typeof pluginOrOptions !== "function") {
    animation = el.animate([
      { transform: "scale(.98)", opacity: 0 },
      { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
      { transform: "scale(1)", opacity: 1 }
    ], {
      duration: pluginOrOptions.duration * 1.5,
      easing: "ease-in"
    });
  } else {
    const [keyframes] = getPluginTuple(pluginOrOptions(el, "add", newCoords));
    animation = new Animation(keyframes);
    animation.play();
  }
  animations.set(el, animation);
  animation.addEventListener("finish", updatePos.bind(null, el));
}
function cleanUp(el, styles) {
  var _a;
  el.remove();
  coords.delete(el);
  siblings.delete(el);
  animations.delete(el);
  (_a = intersections.get(el)) === null || _a === void 0 ? void 0 : _a.disconnect();
  setTimeout(() => {
    if (DEL in el)
      delete el[DEL];
    Object.defineProperty(el, NEW, { value: true, configurable: true });
    if (styles && el instanceof HTMLElement) {
      for (const style in styles) {
        el.style[style] = "";
      }
    }
  }, 0);
}
function remove(el) {
  var _a;
  if (!siblings.has(el) || !coords.has(el))
    return;
  const [prev, next] = siblings.get(el);
  Object.defineProperty(el, DEL, { value: true, configurable: true });
  const finalX = window.scrollX;
  const finalY = window.scrollY;
  if (next && next.parentNode && next.parentNode instanceof Element) {
    next.parentNode.insertBefore(el, next);
  } else if (prev && prev.parentNode) {
    prev.parentNode.appendChild(el);
  } else {
    (_a = getTarget(el)) === null || _a === void 0 ? void 0 : _a.appendChild(el);
  }
  if (!isEnabled(el))
    return cleanUp(el);
  const [top, left, width, height] = deletePosition(el);
  const optionsOrPlugin = getOptions(el);
  const oldCoords = coords.get(el);
  if (finalX !== scrollX || finalY !== scrollY) {
    adjustScroll(el, finalX, finalY, optionsOrPlugin);
  }
  let animation;
  let styleReset = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    margin: "0",
    pointerEvents: "none",
    transformOrigin: "center",
    zIndex: "100"
  };
  if (!isPlugin(optionsOrPlugin)) {
    Object.assign(el.style, styleReset);
    animation = el.animate([
      {
        transform: "scale(1)",
        opacity: 1
      },
      {
        transform: "scale(.98)",
        opacity: 0
      }
    ], { duration: optionsOrPlugin.duration, easing: "ease-out" });
  } else {
    const [keyframes, options2] = getPluginTuple(optionsOrPlugin(el, "remove", oldCoords));
    if ((options2 === null || options2 === void 0 ? void 0 : options2.styleReset) !== false) {
      styleReset = (options2 === null || options2 === void 0 ? void 0 : options2.styleReset) || styleReset;
      Object.assign(el.style, styleReset);
    }
    animation = new Animation(keyframes);
    animation.play();
  }
  animations.set(el, animation);
  animation.addEventListener("finish", cleanUp.bind(null, el, styleReset));
}
function adjustScroll(el, finalX, finalY, optionsOrPlugin) {
  const scrollDeltaX = scrollX - finalX;
  const scrollDeltaY = scrollY - finalY;
  const scrollBefore = document.documentElement.style.scrollBehavior;
  const scrollBehavior = getComputedStyle(root).scrollBehavior;
  if (scrollBehavior === "smooth") {
    document.documentElement.style.scrollBehavior = "auto";
  }
  window.scrollTo(window.scrollX + scrollDeltaX, window.scrollY + scrollDeltaY);
  if (!el.parentElement)
    return;
  const parent = el.parentElement;
  let lastHeight = parent.clientHeight;
  let lastWidth = parent.clientWidth;
  const startScroll = performance.now();
  function smoothScroll() {
    requestAnimationFrame(() => {
      if (!isPlugin(optionsOrPlugin)) {
        const deltaY = lastHeight - parent.clientHeight;
        const deltaX = lastWidth - parent.clientWidth;
        if (startScroll + optionsOrPlugin.duration > performance.now()) {
          window.scrollTo({
            left: window.scrollX - deltaX,
            top: window.scrollY - deltaY
          });
          lastHeight = parent.clientHeight;
          lastWidth = parent.clientWidth;
          smoothScroll();
        } else {
          document.documentElement.style.scrollBehavior = scrollBefore;
        }
      }
    });
  }
  smoothScroll();
}
function deletePosition(el) {
  const oldCoords = coords.get(el);
  const [width, , height] = getTransitionSizes(el, oldCoords, getCoords(el));
  let offsetParent = el.parentElement;
  while (offsetParent && (getComputedStyle(offsetParent).position === "static" || offsetParent instanceof HTMLBodyElement)) {
    offsetParent = offsetParent.parentElement;
  }
  if (!offsetParent)
    offsetParent = document.body;
  const parentStyles = getComputedStyle(offsetParent);
  const parentCoords = coords.get(offsetParent) || getCoords(offsetParent);
  const top = Math.round(oldCoords.top - parentCoords.top) - raw(parentStyles.borderTopWidth);
  const left = Math.round(oldCoords.left - parentCoords.left) - raw(parentStyles.borderLeftWidth);
  return [top, left, width, height];
}
function autoAnimate(el, config = {}) {
  if (mutations && resize) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isDisabledDueToReduceMotion = mediaQuery.matches && !isPlugin(config) && !config.disrespectUserMotionPreference;
    if (!isDisabledDueToReduceMotion) {
      enabled.add(el);
      if (getComputedStyle(el).position === "static") {
        Object.assign(el.style, { position: "relative" });
      }
      forEach(el, updatePos, poll, (element) => resize === null || resize === void 0 ? void 0 : resize.observe(element));
      if (isPlugin(config)) {
        options.set(el, config);
      } else {
        options.set(el, { duration: 250, easing: "ease-in-out", ...config });
      }
      mutations.observe(el, { childList: true });
      parents.add(el);
    }
  }
  return Object.freeze({
    parent: el,
    enable: () => {
      enabled.add(el);
    },
    disable: () => {
      enabled.delete(el);
    },
    isEnabled: () => enabled.has(el)
  });
}
var src_default = (Alpine2) => {
  Alpine2.directive("animate", (el, { value, modifiers, expression }, { Alpine: Alpine22, effect, evaluate, evaluateLater, cleanup }) => {
    let configs = {};
    if (modifiers.includes("duration")) {
      const durationIndex = modifiers.indexOf("duration");
      const durationValue = modifiers[durationIndex + 1];
      const durationRegex = /^(\d+)(ms|s)?$/;
      if (durationRegex.test(durationValue)) {
        const match = durationRegex.exec(durationValue);
        const durationNumber = parseInt(match[1], 10);
        const durationUnit = match[2] || "ms";
        configs.duration = durationUnit === "s" ? durationNumber * 1e3 : durationNumber;
      } else {
        console.warn("Invalid duration format. Use digits followed by 'ms' or 's'.");
      }
    } else {
      console.warn('The "duration" modifier was specified without a value.');
    }
    if (modifiers.includes("easing")) {
      const easingValue = modifiers[modifiers.indexOf("easing") + 1];
      easingValue ? configs.easing = easingValue : console.warn('The "easing" modifier was specified without a value.');
    }
    if (modifiers.includes("disrespectusermotionpreference")) {
      const userMotionPrefValue = modifiers[modifiers.indexOf("disrespectusermotionpreference") + 1];
      configs.disrespectUserMotionPreference = userMotionPrefValue ? true : false;
    }
    if (String(expression).length) {
      configs = { ...configs, ...evaluate(expression) };
    }
    autoAnimate(el, configs);
  });
};
var module_default = src_default;

// resources/js/index.js
document.addEventListener("alpine:init", () => {
  Alpine.plugin(module_default);
  window.Alpine.store("globalSearchModalStore", modalStore());
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY2hhcnJhZmltZWQvYWxwaW5lLWFuaW1hdGlvbi9kaXN0L21vZHVsZS5lc20uanMiLCAiLi4vcmVzb3VyY2VzL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2RhbFN0b3JlKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBpc09wZW46IGZhbHNlLFxyXG4gICAgc2hvd01vZGFsKCkge1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgaGlkZU1vZGFsKCkgeyAgXHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IHNlYXJjaEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maS1nbG9iYWwtc2VhcmNoLWZpZWxkXCIpO1xyXG4gICAgICBpZiAoc2VhcmNoRmllbGQpIHtcclxuICAgICAgICBzZWFyY2hGaWVsZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHNlYXJjaEZpZWxkLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXNlYXJjaF1cIik7XHJcbiAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgaW5wdXRFbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIiwgIi8vIG5vZGVfbW9kdWxlcy9AZm9ybWtpdC9hdXRvLWFuaW1hdGUvaW5kZXgubWpzXG52YXIgcGFyZW50cyA9IG5ldyBTZXQoKTtcbnZhciBjb29yZHMgPSBuZXcgV2Vha01hcCgpO1xudmFyIHNpYmxpbmdzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBhbmltYXRpb25zID0gbmV3IFdlYWtNYXAoKTtcbnZhciBpbnRlcnNlY3Rpb25zID0gbmV3IFdlYWtNYXAoKTtcbnZhciBpbnRlcnZhbHMgPSBuZXcgV2Vha01hcCgpO1xudmFyIG9wdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xudmFyIGRlYm91bmNlcyA9IG5ldyBXZWFrTWFwKCk7XG52YXIgZW5hYmxlZCA9IG5ldyBXZWFrU2V0KCk7XG52YXIgcm9vdDtcbnZhciBzY3JvbGxYID0gMDtcbnZhciBzY3JvbGxZID0gMDtcbnZhciBUR1QgPSBcIl9fYWFfdGd0XCI7XG52YXIgREVMID0gXCJfX2FhX2RlbFwiO1xudmFyIE5FVyA9IFwiX19hYV9uZXdcIjtcbnZhciBoYW5kbGVNdXRhdGlvbnMgPSAobXV0YXRpb25zMikgPT4ge1xuICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzKG11dGF0aW9uczIpO1xuICBpZiAoZWxlbWVudHMpIHtcbiAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4gYW5pbWF0ZShlbCkpO1xuICB9XG59O1xudmFyIGhhbmRsZVJlc2l6ZXMgPSAoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LnRhcmdldCA9PT0gcm9vdClcbiAgICAgIHVwZGF0ZUFsbFBvcygpO1xuICAgIGlmIChjb29yZHMuaGFzKGVudHJ5LnRhcmdldCkpXG4gICAgICB1cGRhdGVQb3MoZW50cnkudGFyZ2V0KTtcbiAgfSk7XG59O1xuZnVuY3Rpb24gb2JzZXJ2ZVBvc2l0aW9uKGVsKSB7XG4gIGNvbnN0IG9sZE9ic2VydmVyID0gaW50ZXJzZWN0aW9ucy5nZXQoZWwpO1xuICBvbGRPYnNlcnZlciA9PT0gbnVsbCB8fCBvbGRPYnNlcnZlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2xkT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICBsZXQgcmVjdCA9IGNvb3Jkcy5nZXQoZWwpO1xuICBsZXQgaW52b2NhdGlvbnMgPSAwO1xuICBjb25zdCBidWZmZXIgPSA1O1xuICBpZiAoIXJlY3QpIHtcbiAgICByZWN0ID0gZ2V0Q29vcmRzKGVsKTtcbiAgICBjb29yZHMuc2V0KGVsLCByZWN0KTtcbiAgfVxuICBjb25zdCB7b2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodH0gPSByb290O1xuICBjb25zdCByb290TWFyZ2lucyA9IFtcbiAgICByZWN0LnRvcCAtIGJ1ZmZlcixcbiAgICBvZmZzZXRXaWR0aCAtIChyZWN0LmxlZnQgKyBidWZmZXIgKyByZWN0LndpZHRoKSxcbiAgICBvZmZzZXRIZWlnaHQgLSAocmVjdC50b3AgKyBidWZmZXIgKyByZWN0LmhlaWdodCksXG4gICAgcmVjdC5sZWZ0IC0gYnVmZmVyXG4gIF07XG4gIGNvbnN0IHJvb3RNYXJnaW4gPSByb290TWFyZ2lucy5tYXAoKHB4KSA9PiBgJHstMSAqIE1hdGguZmxvb3IocHgpfXB4YCkuam9pbihcIiBcIik7XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICArK2ludm9jYXRpb25zID4gMSAmJiB1cGRhdGVQb3MoZWwpO1xuICB9LCB7XG4gICAgcm9vdCxcbiAgICB0aHJlc2hvbGQ6IDEsXG4gICAgcm9vdE1hcmdpblxuICB9KTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCk7XG4gIGludGVyc2VjdGlvbnMuc2V0KGVsLCBvYnNlcnZlcik7XG59XG5mdW5jdGlvbiB1cGRhdGVQb3MoZWwpIHtcbiAgY2xlYXJUaW1lb3V0KGRlYm91bmNlcy5nZXQoZWwpKTtcbiAgY29uc3Qgb3B0aW9uc09yUGx1Z2luID0gZ2V0T3B0aW9ucyhlbCk7XG4gIGNvbnN0IGRlbGF5ID0gaXNQbHVnaW4ob3B0aW9uc09yUGx1Z2luKSA/IDUwMCA6IG9wdGlvbnNPclBsdWdpbi5kdXJhdGlvbjtcbiAgZGVib3VuY2VzLnNldChlbCwgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEFuaW1hdGlvbiA9IGFuaW1hdGlvbnMuZ2V0KGVsKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgKGN1cnJlbnRBbmltYXRpb24gPT09IG51bGwgfHwgY3VycmVudEFuaW1hdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VycmVudEFuaW1hdGlvbi5maW5pc2hlZCk7XG4gICAgICBjb29yZHMuc2V0KGVsLCBnZXRDb29yZHMoZWwpKTtcbiAgICAgIG9ic2VydmVQb3NpdGlvbihlbCk7XG4gICAgfSBjYXRjaCB7XG4gICAgfVxuICB9LCBkZWxheSkpO1xufVxuZnVuY3Rpb24gdXBkYXRlQWxsUG9zKCkge1xuICBjbGVhclRpbWVvdXQoZGVib3VuY2VzLmdldChyb290KSk7XG4gIGRlYm91bmNlcy5zZXQocm9vdCwgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcGFyZW50cy5mb3JFYWNoKChwYXJlbnQpID0+IGZvckVhY2gocGFyZW50LCAoZWwpID0+IGxvd1ByaW9yaXR5KCgpID0+IHVwZGF0ZVBvcyhlbCkpKSk7XG4gIH0sIDEwMCkpO1xufVxuZnVuY3Rpb24gcG9sbChlbCkge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbnRlcnZhbHMuc2V0KGVsLCBzZXRJbnRlcnZhbCgoKSA9PiBsb3dQcmlvcml0eSh1cGRhdGVQb3MuYmluZChudWxsLCBlbCkpLCAyZTMpKTtcbiAgfSwgTWF0aC5yb3VuZCgyZTMgKiBNYXRoLnJhbmRvbSgpKSk7XG59XG5mdW5jdGlvbiBsb3dQcmlvcml0eShjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHJlcXVlc3RJZGxlQ2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4gY2FsbGJhY2soKSk7XG4gIH0gZWxzZSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGNhbGxiYWNrKCkpO1xuICB9XG59XG52YXIgbXV0YXRpb25zO1xudmFyIHJlc2l6ZTtcbnZhciBzdXBwb3J0ZWRCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBcIlJlc2l6ZU9ic2VydmVyXCIgaW4gd2luZG93O1xuaWYgKHN1cHBvcnRlZEJyb3dzZXIpIHtcbiAgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgbXV0YXRpb25zID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaGFuZGxlTXV0YXRpb25zKTtcbiAgcmVzaXplID0gbmV3IFJlc2l6ZU9ic2VydmVyKGhhbmRsZVJlc2l6ZXMpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIHNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcbiAgfSk7XG4gIHJlc2l6ZS5vYnNlcnZlKHJvb3QpO1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudHMobXV0YXRpb25zMikge1xuICBjb25zdCBvYnNlcnZlZE5vZGVzID0gbXV0YXRpb25zMi5yZWR1Y2UoKG5vZGVzLCBtdXRhdGlvbikgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICAuLi5ub2RlcyxcbiAgICAgIC4uLkFycmF5LmZyb20obXV0YXRpb24uYWRkZWROb2RlcyksXG4gICAgICAuLi5BcnJheS5mcm9tKG11dGF0aW9uLnJlbW92ZWROb2RlcylcbiAgICBdO1xuICB9LCBbXSk7XG4gIGNvbnN0IG9ubHlDb21tZW50Tm9kZXNPYnNlcnZlZCA9IG9ic2VydmVkTm9kZXMuZXZlcnkoKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IFwiI2NvbW1lbnRcIik7XG4gIGlmIChvbmx5Q29tbWVudE5vZGVzT2JzZXJ2ZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gbXV0YXRpb25zMi5yZWR1Y2UoKGVsZW1lbnRzLCBtdXRhdGlvbikgPT4ge1xuICAgIGlmIChlbGVtZW50cyA9PT0gZmFsc2UpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG11dGF0aW9uLnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIHRhcmdldChtdXRhdGlvbi50YXJnZXQpO1xuICAgICAgaWYgKCFlbGVtZW50cy5oYXMobXV0YXRpb24udGFyZ2V0KSkge1xuICAgICAgICBlbGVtZW50cy5hZGQobXV0YXRpb24udGFyZ2V0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbi50YXJnZXQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IG11dGF0aW9uLnRhcmdldC5jaGlsZHJlbi5pdGVtKGkpO1xuICAgICAgICAgIGlmICghY2hpbGQpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICBpZiAoREVMIGluIGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhcmdldChtdXRhdGlvbi50YXJnZXQsIGNoaWxkKTtcbiAgICAgICAgICBlbGVtZW50cy5hZGQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gbXV0YXRpb24ucmVtb3ZlZE5vZGVzW2ldO1xuICAgICAgICAgIGlmIChERUwgaW4gY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudHMuYWRkKGNoaWxkKTtcbiAgICAgICAgICAgIHRhcmdldChtdXRhdGlvbi50YXJnZXQsIGNoaWxkKTtcbiAgICAgICAgICAgIHNpYmxpbmdzLnNldChjaGlsZCwgW1xuICAgICAgICAgICAgICBtdXRhdGlvbi5wcmV2aW91c1NpYmxpbmcsXG4gICAgICAgICAgICAgIG11dGF0aW9uLm5leHRTaWJsaW5nXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9LCBuZXcgU2V0KCkpO1xufVxuZnVuY3Rpb24gdGFyZ2V0KGVsLCBjaGlsZCkge1xuICBpZiAoIWNoaWxkICYmICEoVEdUIGluIGVsKSlcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIFRHVCwge3ZhbHVlOiBlbH0pO1xuICBlbHNlIGlmIChjaGlsZCAmJiAhKFRHVCBpbiBjaGlsZCkpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLCBUR1QsIHt2YWx1ZTogZWx9KTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGUoZWwpIHtcbiAgdmFyIF9hO1xuICBjb25zdCBpc01vdW50ZWQgPSBlbC5pc0Nvbm5lY3RlZDtcbiAgY29uc3QgcHJlRXhpc3RpbmcgPSBjb29yZHMuaGFzKGVsKTtcbiAgaWYgKGlzTW91bnRlZCAmJiBzaWJsaW5ncy5oYXMoZWwpKVxuICAgIHNpYmxpbmdzLmRlbGV0ZShlbCk7XG4gIGlmIChhbmltYXRpb25zLmhhcyhlbCkpIHtcbiAgICAoX2EgPSBhbmltYXRpb25zLmdldChlbCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYW5jZWwoKTtcbiAgfVxuICBpZiAoTkVXIGluIGVsKSB7XG4gICAgYWRkKGVsKTtcbiAgfSBlbHNlIGlmIChwcmVFeGlzdGluZyAmJiBpc01vdW50ZWQpIHtcbiAgICByZW1haW4oZWwpO1xuICB9IGVsc2UgaWYgKHByZUV4aXN0aW5nICYmICFpc01vdW50ZWQpIHtcbiAgICByZW1vdmUoZWwpO1xuICB9IGVsc2Uge1xuICAgIGFkZChlbCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJhdyhzdHIpIHtcbiAgcmV0dXJuIE51bWJlcihzdHIucmVwbGFjZSgvW14wLTkuXFwtXS9nLCBcIlwiKSk7XG59XG5mdW5jdGlvbiBnZXRTY3JvbGxPZmZzZXQoZWwpIHtcbiAgbGV0IHAgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB3aGlsZSAocCkge1xuICAgIGlmIChwLnNjcm9sbExlZnQgfHwgcC5zY3JvbGxUb3ApIHtcbiAgICAgIHJldHVybiB7eDogcC5zY3JvbGxMZWZ0LCB5OiBwLnNjcm9sbFRvcH07XG4gICAgfVxuICAgIHAgPSBwLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIHt4OiAwLCB5OiAwfTtcbn1cbmZ1bmN0aW9uIGdldENvb3JkcyhlbCkge1xuICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHt4LCB5fSA9IGdldFNjcm9sbE9mZnNldChlbCk7XG4gIHJldHVybiB7XG4gICAgdG9wOiByZWN0LnRvcCArIHksXG4gICAgbGVmdDogcmVjdC5sZWZ0ICsgeCxcbiAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gIH07XG59XG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uU2l6ZXMoZWwsIG9sZENvb3JkcywgbmV3Q29vcmRzKSB7XG4gIGxldCB3aWR0aEZyb20gPSBvbGRDb29yZHMud2lkdGg7XG4gIGxldCBoZWlnaHRGcm9tID0gb2xkQ29vcmRzLmhlaWdodDtcbiAgbGV0IHdpZHRoVG8gPSBuZXdDb29yZHMud2lkdGg7XG4gIGxldCBoZWlnaHRUbyA9IG5ld0Nvb3Jkcy5oZWlnaHQ7XG4gIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICBjb25zdCBzaXppbmcgPSBzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcImJveC1zaXppbmdcIik7XG4gIGlmIChzaXppbmcgPT09IFwiY29udGVudC1ib3hcIikge1xuICAgIGNvbnN0IHBhZGRpbmdZID0gcmF3KHN0eWxlcy5wYWRkaW5nVG9wKSArIHJhdyhzdHlsZXMucGFkZGluZ0JvdHRvbSkgKyByYXcoc3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHJhdyhzdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpO1xuICAgIGNvbnN0IHBhZGRpbmdYID0gcmF3KHN0eWxlcy5wYWRkaW5nTGVmdCkgKyByYXcoc3R5bGVzLnBhZGRpbmdSaWdodCkgKyByYXcoc3R5bGVzLmJvcmRlclJpZ2h0V2lkdGgpICsgcmF3KHN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpO1xuICAgIHdpZHRoRnJvbSAtPSBwYWRkaW5nWDtcbiAgICB3aWR0aFRvIC09IHBhZGRpbmdYO1xuICAgIGhlaWdodEZyb20gLT0gcGFkZGluZ1k7XG4gICAgaGVpZ2h0VG8gLT0gcGFkZGluZ1k7XG4gIH1cbiAgcmV0dXJuIFt3aWR0aEZyb20sIHdpZHRoVG8sIGhlaWdodEZyb20sIGhlaWdodFRvXS5tYXAoTWF0aC5yb3VuZCk7XG59XG5mdW5jdGlvbiBnZXRPcHRpb25zKGVsKSB7XG4gIHJldHVybiBUR1QgaW4gZWwgJiYgb3B0aW9ucy5oYXMoZWxbVEdUXSkgPyBvcHRpb25zLmdldChlbFtUR1RdKSA6IHtkdXJhdGlvbjogMjUwLCBlYXNpbmc6IFwiZWFzZS1pbi1vdXRcIn07XG59XG5mdW5jdGlvbiBnZXRUYXJnZXQoZWwpIHtcbiAgaWYgKFRHVCBpbiBlbClcbiAgICByZXR1cm4gZWxbVEdUXTtcbiAgcmV0dXJuIHZvaWQgMDtcbn1cbmZ1bmN0aW9uIGlzRW5hYmxlZChlbCkge1xuICBjb25zdCB0YXJnZXQyID0gZ2V0VGFyZ2V0KGVsKTtcbiAgcmV0dXJuIHRhcmdldDIgPyBlbmFibGVkLmhhcyh0YXJnZXQyKSA6IGZhbHNlO1xufVxuZnVuY3Rpb24gZm9yRWFjaChwYXJlbnQsIC4uLmNhbGxiYWNrcykge1xuICBjYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKHBhcmVudCwgb3B0aW9ucy5oYXMocGFyZW50KSkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gcGFyZW50LmNoaWxkcmVuLml0ZW0oaSk7XG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGNoaWxkLCBvcHRpb25zLmhhcyhjaGlsZCkpKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFBsdWdpblR1cGxlKHBsdWdpblJldHVybikge1xuICBpZiAoQXJyYXkuaXNBcnJheShwbHVnaW5SZXR1cm4pKVxuICAgIHJldHVybiBwbHVnaW5SZXR1cm47XG4gIHJldHVybiBbcGx1Z2luUmV0dXJuXTtcbn1cbmZ1bmN0aW9uIGlzUGx1Z2luKGNvbmZpZykge1xuICByZXR1cm4gdHlwZW9mIGNvbmZpZyA9PT0gXCJmdW5jdGlvblwiO1xufVxuZnVuY3Rpb24gcmVtYWluKGVsKSB7XG4gIGNvbnN0IG9sZENvb3JkcyA9IGNvb3Jkcy5nZXQoZWwpO1xuICBjb25zdCBuZXdDb29yZHMgPSBnZXRDb29yZHMoZWwpO1xuICBpZiAoIWlzRW5hYmxlZChlbCkpXG4gICAgcmV0dXJuIGNvb3Jkcy5zZXQoZWwsIG5ld0Nvb3Jkcyk7XG4gIGxldCBhbmltYXRpb247XG4gIGlmICghb2xkQ29vcmRzKVxuICAgIHJldHVybjtcbiAgY29uc3QgcGx1Z2luT3JPcHRpb25zID0gZ2V0T3B0aW9ucyhlbCk7XG4gIGlmICh0eXBlb2YgcGx1Z2luT3JPcHRpb25zICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zdCBkZWx0YVggPSBvbGRDb29yZHMubGVmdCAtIG5ld0Nvb3Jkcy5sZWZ0O1xuICAgIGNvbnN0IGRlbHRhWSA9IG9sZENvb3Jkcy50b3AgLSBuZXdDb29yZHMudG9wO1xuICAgIGNvbnN0IFt3aWR0aEZyb20sIHdpZHRoVG8sIGhlaWdodEZyb20sIGhlaWdodFRvXSA9IGdldFRyYW5zaXRpb25TaXplcyhlbCwgb2xkQ29vcmRzLCBuZXdDb29yZHMpO1xuICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZGVsdGFYfXB4LCAke2RlbHRhWX1weClgXG4gICAgfTtcbiAgICBjb25zdCBlbmQgPSB7XG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoMCwgMClgXG4gICAgfTtcbiAgICBpZiAod2lkdGhGcm9tICE9PSB3aWR0aFRvKSB7XG4gICAgICBzdGFydC53aWR0aCA9IGAke3dpZHRoRnJvbX1weGA7XG4gICAgICBlbmQud2lkdGggPSBgJHt3aWR0aFRvfXB4YDtcbiAgICB9XG4gICAgaWYgKGhlaWdodEZyb20gIT09IGhlaWdodFRvKSB7XG4gICAgICBzdGFydC5oZWlnaHQgPSBgJHtoZWlnaHRGcm9tfXB4YDtcbiAgICAgIGVuZC5oZWlnaHQgPSBgJHtoZWlnaHRUb31weGA7XG4gICAgfVxuICAgIGFuaW1hdGlvbiA9IGVsLmFuaW1hdGUoW3N0YXJ0LCBlbmRdLCB7XG4gICAgICBkdXJhdGlvbjogcGx1Z2luT3JPcHRpb25zLmR1cmF0aW9uLFxuICAgICAgZWFzaW5nOiBwbHVnaW5Pck9wdGlvbnMuZWFzaW5nXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgW2tleWZyYW1lc10gPSBnZXRQbHVnaW5UdXBsZShwbHVnaW5Pck9wdGlvbnMoZWwsIFwicmVtYWluXCIsIG9sZENvb3JkcywgbmV3Q29vcmRzKSk7XG4gICAgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbihrZXlmcmFtZXMpO1xuICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gIH1cbiAgYW5pbWF0aW9ucy5zZXQoZWwsIGFuaW1hdGlvbik7XG4gIGNvb3Jkcy5zZXQoZWwsIG5ld0Nvb3Jkcyk7XG4gIGFuaW1hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsIHVwZGF0ZVBvcy5iaW5kKG51bGwsIGVsKSk7XG59XG5mdW5jdGlvbiBhZGQoZWwpIHtcbiAgaWYgKE5FVyBpbiBlbClcbiAgICBkZWxldGUgZWxbTkVXXTtcbiAgY29uc3QgbmV3Q29vcmRzID0gZ2V0Q29vcmRzKGVsKTtcbiAgY29vcmRzLnNldChlbCwgbmV3Q29vcmRzKTtcbiAgY29uc3QgcGx1Z2luT3JPcHRpb25zID0gZ2V0T3B0aW9ucyhlbCk7XG4gIGlmICghaXNFbmFibGVkKGVsKSlcbiAgICByZXR1cm47XG4gIGxldCBhbmltYXRpb247XG4gIGlmICh0eXBlb2YgcGx1Z2luT3JPcHRpb25zICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBhbmltYXRpb24gPSBlbC5hbmltYXRlKFtcbiAgICAgIHt0cmFuc2Zvcm06IFwic2NhbGUoLjk4KVwiLCBvcGFjaXR5OiAwfSxcbiAgICAgIHt0cmFuc2Zvcm06IFwic2NhbGUoMC45OClcIiwgb3BhY2l0eTogMCwgb2Zmc2V0OiAwLjV9LFxuICAgICAge3RyYW5zZm9ybTogXCJzY2FsZSgxKVwiLCBvcGFjaXR5OiAxfVxuICAgIF0sIHtcbiAgICAgIGR1cmF0aW9uOiBwbHVnaW5Pck9wdGlvbnMuZHVyYXRpb24gKiAxLjUsXG4gICAgICBlYXNpbmc6IFwiZWFzZS1pblwiXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgW2tleWZyYW1lc10gPSBnZXRQbHVnaW5UdXBsZShwbHVnaW5Pck9wdGlvbnMoZWwsIFwiYWRkXCIsIG5ld0Nvb3JkcykpO1xuICAgIGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oa2V5ZnJhbWVzKTtcbiAgICBhbmltYXRpb24ucGxheSgpO1xuICB9XG4gIGFuaW1hdGlvbnMuc2V0KGVsLCBhbmltYXRpb24pO1xuICBhbmltYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImZpbmlzaFwiLCB1cGRhdGVQb3MuYmluZChudWxsLCBlbCkpO1xufVxuZnVuY3Rpb24gY2xlYW5VcChlbCwgc3R5bGVzKSB7XG4gIHZhciBfYTtcbiAgZWwucmVtb3ZlKCk7XG4gIGNvb3Jkcy5kZWxldGUoZWwpO1xuICBzaWJsaW5ncy5kZWxldGUoZWwpO1xuICBhbmltYXRpb25zLmRlbGV0ZShlbCk7XG4gIChfYSA9IGludGVyc2VjdGlvbnMuZ2V0KGVsKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc2Nvbm5lY3QoKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKERFTCBpbiBlbClcbiAgICAgIGRlbGV0ZSBlbFtERUxdO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwgTkVXLCB7dmFsdWU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0pO1xuICAgIGlmIChzdHlsZXMgJiYgZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBzdHlsZSBpbiBzdHlsZXMpIHtcbiAgICAgICAgZWwuc3R5bGVbc3R5bGVdID0gXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gIH0sIDApO1xufVxuZnVuY3Rpb24gcmVtb3ZlKGVsKSB7XG4gIHZhciBfYTtcbiAgaWYgKCFzaWJsaW5ncy5oYXMoZWwpIHx8ICFjb29yZHMuaGFzKGVsKSlcbiAgICByZXR1cm47XG4gIGNvbnN0IFtwcmV2LCBuZXh0XSA9IHNpYmxpbmdzLmdldChlbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwgREVMLCB7dmFsdWU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0pO1xuICBjb25zdCBmaW5hbFggPSB3aW5kb3cuc2Nyb2xsWDtcbiAgY29uc3QgZmluYWxZID0gd2luZG93LnNjcm9sbFk7XG4gIGlmIChuZXh0ICYmIG5leHQucGFyZW50Tm9kZSAmJiBuZXh0LnBhcmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgbmV4dCk7XG4gIH0gZWxzZSBpZiAocHJldiAmJiBwcmV2LnBhcmVudE5vZGUpIHtcbiAgICBwcmV2LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xuICB9IGVsc2Uge1xuICAgIChfYSA9IGdldFRhcmdldChlbCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hcHBlbmRDaGlsZChlbCk7XG4gIH1cbiAgaWYgKCFpc0VuYWJsZWQoZWwpKVxuICAgIHJldHVybiBjbGVhblVwKGVsKTtcbiAgY29uc3QgW3RvcCwgbGVmdCwgd2lkdGgsIGhlaWdodF0gPSBkZWxldGVQb3NpdGlvbihlbCk7XG4gIGNvbnN0IG9wdGlvbnNPclBsdWdpbiA9IGdldE9wdGlvbnMoZWwpO1xuICBjb25zdCBvbGRDb29yZHMgPSBjb29yZHMuZ2V0KGVsKTtcbiAgaWYgKGZpbmFsWCAhPT0gc2Nyb2xsWCB8fCBmaW5hbFkgIT09IHNjcm9sbFkpIHtcbiAgICBhZGp1c3RTY3JvbGwoZWwsIGZpbmFsWCwgZmluYWxZLCBvcHRpb25zT3JQbHVnaW4pO1xuICB9XG4gIGxldCBhbmltYXRpb247XG4gIGxldCBzdHlsZVJlc2V0ID0ge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgdG9wOiBgJHt0b3B9cHhgLFxuICAgIGxlZnQ6IGAke2xlZnR9cHhgLFxuICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgLFxuICAgIG1hcmdpbjogXCIwXCIsXG4gICAgcG9pbnRlckV2ZW50czogXCJub25lXCIsXG4gICAgdHJhbnNmb3JtT3JpZ2luOiBcImNlbnRlclwiLFxuICAgIHpJbmRleDogXCIxMDBcIlxuICB9O1xuICBpZiAoIWlzUGx1Z2luKG9wdGlvbnNPclBsdWdpbikpIHtcbiAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCBzdHlsZVJlc2V0KTtcbiAgICBhbmltYXRpb24gPSBlbC5hbmltYXRlKFtcbiAgICAgIHtcbiAgICAgICAgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZSguOTgpXCIsXG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH1cbiAgICBdLCB7ZHVyYXRpb246IG9wdGlvbnNPclBsdWdpbi5kdXJhdGlvbiwgZWFzaW5nOiBcImVhc2Utb3V0XCJ9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBba2V5ZnJhbWVzLCBvcHRpb25zMl0gPSBnZXRQbHVnaW5UdXBsZShvcHRpb25zT3JQbHVnaW4oZWwsIFwicmVtb3ZlXCIsIG9sZENvb3JkcykpO1xuICAgIGlmICgob3B0aW9uczIgPT09IG51bGwgfHwgb3B0aW9uczIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMyLnN0eWxlUmVzZXQpICE9PSBmYWxzZSkge1xuICAgICAgc3R5bGVSZXNldCA9IChvcHRpb25zMiA9PT0gbnVsbCB8fCBvcHRpb25zMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9uczIuc3R5bGVSZXNldCkgfHwgc3R5bGVSZXNldDtcbiAgICAgIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIHN0eWxlUmVzZXQpO1xuICAgIH1cbiAgICBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKGtleWZyYW1lcyk7XG4gICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgfVxuICBhbmltYXRpb25zLnNldChlbCwgYW5pbWF0aW9uKTtcbiAgYW5pbWF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJmaW5pc2hcIiwgY2xlYW5VcC5iaW5kKG51bGwsIGVsLCBzdHlsZVJlc2V0KSk7XG59XG5mdW5jdGlvbiBhZGp1c3RTY3JvbGwoZWwsIGZpbmFsWCwgZmluYWxZLCBvcHRpb25zT3JQbHVnaW4pIHtcbiAgY29uc3Qgc2Nyb2xsRGVsdGFYID0gc2Nyb2xsWCAtIGZpbmFsWDtcbiAgY29uc3Qgc2Nyb2xsRGVsdGFZID0gc2Nyb2xsWSAtIGZpbmFsWTtcbiAgY29uc3Qgc2Nyb2xsQmVmb3JlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNjcm9sbEJlaGF2aW9yO1xuICBjb25zdCBzY3JvbGxCZWhhdmlvciA9IGdldENvbXB1dGVkU3R5bGUocm9vdCkuc2Nyb2xsQmVoYXZpb3I7XG4gIGlmIChzY3JvbGxCZWhhdmlvciA9PT0gXCJzbW9vdGhcIikge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zY3JvbGxCZWhhdmlvciA9IFwiYXV0b1wiO1xuICB9XG4gIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCArIHNjcm9sbERlbHRhWCwgd2luZG93LnNjcm9sbFkgKyBzY3JvbGxEZWx0YVkpO1xuICBpZiAoIWVsLnBhcmVudEVsZW1lbnQpXG4gICAgcmV0dXJuO1xuICBjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuICBsZXQgbGFzdEhlaWdodCA9IHBhcmVudC5jbGllbnRIZWlnaHQ7XG4gIGxldCBsYXN0V2lkdGggPSBwYXJlbnQuY2xpZW50V2lkdGg7XG4gIGNvbnN0IHN0YXJ0U2Nyb2xsID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGZ1bmN0aW9uIHNtb290aFNjcm9sbCgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCFpc1BsdWdpbihvcHRpb25zT3JQbHVnaW4pKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IGxhc3RIZWlnaHQgLSBwYXJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBkZWx0YVggPSBsYXN0V2lkdGggLSBwYXJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmIChzdGFydFNjcm9sbCArIG9wdGlvbnNPclBsdWdpbi5kdXJhdGlvbiA+IHBlcmZvcm1hbmNlLm5vdygpKSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIGxlZnQ6IHdpbmRvdy5zY3JvbGxYIC0gZGVsdGFYLFxuICAgICAgICAgICAgdG9wOiB3aW5kb3cuc2Nyb2xsWSAtIGRlbHRhWVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxhc3RIZWlnaHQgPSBwYXJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgIGxhc3RXaWR0aCA9IHBhcmVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICBzbW9vdGhTY3JvbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSBzY3JvbGxCZWZvcmU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzbW9vdGhTY3JvbGwoKTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZVBvc2l0aW9uKGVsKSB7XG4gIGNvbnN0IG9sZENvb3JkcyA9IGNvb3Jkcy5nZXQoZWwpO1xuICBjb25zdCBbd2lkdGgsICwgaGVpZ2h0XSA9IGdldFRyYW5zaXRpb25TaXplcyhlbCwgb2xkQ29vcmRzLCBnZXRDb29yZHMoZWwpKTtcbiAgbGV0IG9mZnNldFBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgKGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiB8fCBvZmZzZXRQYXJlbnQgaW5zdGFuY2VvZiBIVE1MQm9keUVsZW1lbnQpKSB7XG4gICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgaWYgKCFvZmZzZXRQYXJlbnQpXG4gICAgb2Zmc2V0UGFyZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgY29uc3QgcGFyZW50U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpO1xuICBjb25zdCBwYXJlbnRDb29yZHMgPSBjb29yZHMuZ2V0KG9mZnNldFBhcmVudCkgfHwgZ2V0Q29vcmRzKG9mZnNldFBhcmVudCk7XG4gIGNvbnN0IHRvcCA9IE1hdGgucm91bmQob2xkQ29vcmRzLnRvcCAtIHBhcmVudENvb3Jkcy50b3ApIC0gcmF3KHBhcmVudFN0eWxlcy5ib3JkZXJUb3BXaWR0aCk7XG4gIGNvbnN0IGxlZnQgPSBNYXRoLnJvdW5kKG9sZENvb3Jkcy5sZWZ0IC0gcGFyZW50Q29vcmRzLmxlZnQpIC0gcmF3KHBhcmVudFN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpO1xuICByZXR1cm4gW3RvcCwgbGVmdCwgd2lkdGgsIGhlaWdodF07XG59XG5mdW5jdGlvbiBhdXRvQW5pbWF0ZShlbCwgY29uZmlnID0ge30pIHtcbiAgaWYgKG11dGF0aW9ucyAmJiByZXNpemUpIHtcbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKTtcbiAgICBjb25zdCBpc0Rpc2FibGVkRHVlVG9SZWR1Y2VNb3Rpb24gPSBtZWRpYVF1ZXJ5Lm1hdGNoZXMgJiYgIWlzUGx1Z2luKGNvbmZpZykgJiYgIWNvbmZpZy5kaXNyZXNwZWN0VXNlck1vdGlvblByZWZlcmVuY2U7XG4gICAgaWYgKCFpc0Rpc2FibGVkRHVlVG9SZWR1Y2VNb3Rpb24pIHtcbiAgICAgIGVuYWJsZWQuYWRkKGVsKTtcbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsKS5wb3NpdGlvbiA9PT0gXCJzdGF0aWNcIikge1xuICAgICAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCB7cG9zaXRpb246IFwicmVsYXRpdmVcIn0pO1xuICAgICAgfVxuICAgICAgZm9yRWFjaChlbCwgdXBkYXRlUG9zLCBwb2xsLCAoZWxlbWVudCkgPT4gcmVzaXplID09PSBudWxsIHx8IHJlc2l6ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzaXplLm9ic2VydmUoZWxlbWVudCkpO1xuICAgICAgaWYgKGlzUGx1Z2luKGNvbmZpZykpIHtcbiAgICAgICAgb3B0aW9ucy5zZXQoZWwsIGNvbmZpZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnNldChlbCwge2R1cmF0aW9uOiAyNTAsIGVhc2luZzogXCJlYXNlLWluLW91dFwiLCAuLi5jb25maWd9KTtcbiAgICAgIH1cbiAgICAgIG11dGF0aW9ucy5vYnNlcnZlKGVsLCB7Y2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICBwYXJlbnRzLmFkZChlbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICBwYXJlbnQ6IGVsLFxuICAgIGVuYWJsZTogKCkgPT4ge1xuICAgICAgZW5hYmxlZC5hZGQoZWwpO1xuICAgIH0sXG4gICAgZGlzYWJsZTogKCkgPT4ge1xuICAgICAgZW5hYmxlZC5kZWxldGUoZWwpO1xuICAgIH0sXG4gICAgaXNFbmFibGVkOiAoKSA9PiBlbmFibGVkLmhhcyhlbClcbiAgfSk7XG59XG5cbi8vIHNyYy9pbmRleC5qc1xudmFyIHNyY19kZWZhdWx0ID0gKEFscGluZSkgPT4ge1xuICBBbHBpbmUuZGlyZWN0aXZlKFwiYW5pbWF0ZVwiLCAoZWwsIHt2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9ufSwge0FscGluZTogQWxwaW5lMiwgZWZmZWN0LCBldmFsdWF0ZSwgZXZhbHVhdGVMYXRlciwgY2xlYW51cH0pID0+IHtcbiAgICBsZXQgY29uZmlncyA9IHt9O1xuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJkdXJhdGlvblwiKSkge1xuICAgICAgY29uc3QgZHVyYXRpb25JbmRleCA9IG1vZGlmaWVycy5pbmRleE9mKFwiZHVyYXRpb25cIik7XG4gICAgICBjb25zdCBkdXJhdGlvblZhbHVlID0gbW9kaWZpZXJzW2R1cmF0aW9uSW5kZXggKyAxXTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uUmVnZXggPSAvXihcXGQrKShtc3xzKT8kLztcbiAgICAgIGlmIChkdXJhdGlvblJlZ2V4LnRlc3QoZHVyYXRpb25WYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBkdXJhdGlvblJlZ2V4LmV4ZWMoZHVyYXRpb25WYWx1ZSk7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgY29uc3QgZHVyYXRpb25Vbml0ID0gbWF0Y2hbMl0gfHwgXCJtc1wiO1xuICAgICAgICBjb25maWdzLmR1cmF0aW9uID0gZHVyYXRpb25Vbml0ID09PSBcInNcIiA/IGR1cmF0aW9uTnVtYmVyICogMWUzIDogZHVyYXRpb25OdW1iZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIGR1cmF0aW9uIGZvcm1hdC4gVXNlIGRpZ2l0cyBmb2xsb3dlZCBieSAnbXMnIG9yICdzJy5cIik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignVGhlIFwiZHVyYXRpb25cIiBtb2RpZmllciB3YXMgc3BlY2lmaWVkIHdpdGhvdXQgYSB2YWx1ZS4nKTtcbiAgICB9XG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImVhc2luZ1wiKSkge1xuICAgICAgY29uc3QgZWFzaW5nVmFsdWUgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoXCJlYXNpbmdcIikgKyAxXTtcbiAgICAgIGVhc2luZ1ZhbHVlID8gY29uZmlncy5lYXNpbmcgPSBlYXNpbmdWYWx1ZSA6IGNvbnNvbGUud2FybignVGhlIFwiZWFzaW5nXCIgbW9kaWZpZXIgd2FzIHNwZWNpZmllZCB3aXRob3V0IGEgdmFsdWUuJyk7XG4gICAgfVxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJkaXNyZXNwZWN0dXNlcm1vdGlvbnByZWZlcmVuY2VcIikpIHtcbiAgICAgIGNvbnN0IHVzZXJNb3Rpb25QcmVmVmFsdWUgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoXCJkaXNyZXNwZWN0dXNlcm1vdGlvbnByZWZlcmVuY2VcIikgKyAxXTtcbiAgICAgIGNvbmZpZ3MuZGlzcmVzcGVjdFVzZXJNb3Rpb25QcmVmZXJlbmNlID0gdXNlck1vdGlvblByZWZWYWx1ZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFN0cmluZyhleHByZXNzaW9uKS5sZW5ndGgpIHtcbiAgICAgIGNvbmZpZ3MgPSB7Li4uY29uZmlncywgLi4uZXZhbHVhdGUoZXhwcmVzc2lvbil9O1xuICAgIH1cbiAgICBhdXRvQW5pbWF0ZShlbCwgY29uZmlncyk7XG4gIH0pO1xufTtcblxuLy8gYnVpbGRzL21vZHVsZS5qc1xudmFyIG1vZHVsZV9kZWZhdWx0ID0gc3JjX2RlZmF1bHQ7XG5leHBvcnQge1xuICBtb2R1bGVfZGVmYXVsdCBhcyBkZWZhdWx0XG59O1xuIiwgImltcG9ydCBtb2RhbFN0b3JlIGZyb20gXCIuL21vZGFsXCI7XHJcbmltcG9ydCBBbmltYXRlIGZyb20gJ0BjaGFycmFmaW1lZC9hbHBpbmUtYW5pbWF0aW9uJ1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhbHBpbmU6aW5pdFwiLCAoKSA9PiB7XHJcbiAgQWxwaW5lLnBsdWdpbihBbmltYXRlKVxyXG4gIHdpbmRvdy5BbHBpbmUuc3RvcmUoXCJnbG9iYWxTZWFyY2hNb2RhbFN0b3JlXCIsIG1vZGFsU3RvcmUoKSk7XHJcbn0pO1xyXG5cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLGFBQThCO0FBQ25DLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFlBQVk7QUFDVixXQUFLLFNBQVM7QUFBQSxJQUNoQjtBQUFBLElBQ0EsWUFBWTtBQUNWLFdBQUssU0FBUztBQUNkLFlBQU0sY0FBYyxTQUFTLGNBQWMseUJBQXlCO0FBQ3BFLFVBQUksYUFBYTtBQUNmLG9CQUFZLE1BQU0sVUFBVTtBQUM1QixjQUFNLGVBQWUsWUFBWSxjQUFjLG9CQUFvQjtBQUNuRSxZQUFJLGNBQWM7QUFDaEIsdUJBQWEsV0FBVztBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBQ2pCQSxJQUFJLFVBQVUsb0JBQUksSUFBSTtBQUN0QixJQUFJLFNBQVMsb0JBQUksUUFBUTtBQUN6QixJQUFJLFdBQVcsb0JBQUksUUFBUTtBQUMzQixJQUFJLGFBQWEsb0JBQUksUUFBUTtBQUM3QixJQUFJLGdCQUFnQixvQkFBSSxRQUFRO0FBQ2hDLElBQUksWUFBWSxvQkFBSSxRQUFRO0FBQzVCLElBQUksVUFBVSxvQkFBSSxRQUFRO0FBQzFCLElBQUksWUFBWSxvQkFBSSxRQUFRO0FBQzVCLElBQUksVUFBVSxvQkFBSSxRQUFRO0FBQzFCLElBQUk7QUFDSixJQUFJLFVBQVU7QUFDZCxJQUFJLFVBQVU7QUFDZCxJQUFJLE1BQU07QUFDVixJQUFJLE1BQU07QUFDVixJQUFJLE1BQU07QUFDVixJQUFJLGtCQUFrQixDQUFDLGVBQWU7QUFDcEMsUUFB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QUFBLElBQ0EsV0FBVyxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBQUEsRUFDakMsQ0FBQztBQUNIO0FBR0EsSUFBSSxjQUFjLENBQUNBLFlBQVc7QUFDNUIsRUFBQUEsUUFBTyxVQUFVLFdBQVcsQ0FBQyxJQUFJLEVBQUMsT0FBTyxXQUFXLFdBQVUsR0FBRyxFQUFDLFFBQVFDLFVBQVMsUUFBUSxVQUFVLGVBQWUsUUFBTyxNQUFNO0FBQy9ILFFBQUksVUFBVSxDQUFDO0FBQ2YsUUFBSSxVQUFVLFNBQVMsVUFBVSxHQUFHO0FBQ2xDLFlBQU0sZ0JBQWdCLFVBQVUsUUFBUSxVQUFVO0FBQ2xELFlBQU0sZ0JBQWdCLFVBQVUsZ0JBQWdCLENBQUM7QUFDakQsWUFBTSxnQkFBZ0I7QUFDdEIsVUFBSSxjQUFjLEtBQUssYUFBYSxHQUFHO0FBQ3JDLGNBQU0sUUFBUSxjQUFjLEtBQUssYUFBYTtBQUM5QyxjQUFNLGlCQUFpQixTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDNUMsY0FBTSxlQUFlLE1BQU0sQ0FBQyxLQUFLO0FBQ2pDLGdCQUFRLFdBQVcsaUJBQWlCLE1BQU0saUJBQWlCLE1BQU07QUFBQSxNQUNuRSxPQUFPO0FBQ0wsZ0JBQVEsS0FBSyw4REFBOEQ7QUFBQSxNQUM3RTtBQUFBLElBQ0YsT0FBTztBQUNMLGNBQVEsS0FBSyx3REFBd0Q7QUFBQSxJQUN2RTtBQUNBLFFBQUksVUFBVSxTQUFTLFFBQVEsR0FBRztBQUNoQyxZQUFNLGNBQWMsVUFBVSxVQUFVLFFBQVEsUUFBUSxJQUFJLENBQUM7QUFDN0Qsb0JBQWMsUUFBUSxTQUFTLGNBQWMsUUFBUSxLQUFLLHNEQUFzRDtBQUFBLElBQ2xIO0FBQ0EsUUFBSSxVQUFVLFNBQVMsZ0NBQWdDLEdBQUc7QUFDeEQsWUFBTSxzQkFBc0IsVUFBVSxVQUFVLFFBQVEsZ0NBQWdDLElBQUksQ0FBQztBQUM3RixjQUFRLGlDQUFpQyxzQkFBc0IsT0FBTztBQUFBLElBQ3hFO0FBQ0EsUUFBSSxPQUFPLFVBQVUsRUFBRSxRQUFRO0FBQzdCLGdCQUFVLEVBQUMsR0FBRyxTQUFTLEdBQUcsU0FBUyxVQUFVLEVBQUM7QUFBQSxJQUNoRDtBQUNBLGdCQUFZLElBQUksT0FBTztBQUFBLEVBQ3pCLENBQUM7QUFDSDtBQUdBLElBQUksaUJBQWlCOzs7QUN0ZnJCLFNBQVMsaUJBQWlCLGVBQWUsTUFBTTtBQUM3QyxTQUFPLE9BQU8sY0FBTztBQUNyQixTQUFPLE9BQU8sTUFBTSwwQkFBMEIsV0FBVyxDQUFDO0FBQzVELENBQUM7IiwKICAibmFtZXMiOiBbIkFscGluZSIsICJBbHBpbmUyIl0KfQo=
