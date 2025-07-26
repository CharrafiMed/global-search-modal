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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL21vZGFsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY2hhcnJhZmltZWQvYWxwaW5lLWFuaW1hdGlvbi9kaXN0L21vZHVsZS5lc20uanMiLCAiLi4vcmVzb3VyY2VzL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb2RhbFN0b3JlKCkge1xuICByZXR1cm4ge1xuICAgIGlzT3BlbjogZmFsc2UsXG4gICAgc2hvd01vZGFsKCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIH0sXG4gICAgaGlkZU1vZGFsKCkgeyAgXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgY29uc3Qgc2VhcmNoRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpLWdsb2JhbC1zZWFyY2gtZmllbGRcIik7XG4gICAgICBpZiAoc2VhcmNoRmllbGQpIHtcbiAgICAgICAgc2VhcmNoRmllbGQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gc2VhcmNoRmllbGQucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9c2VhcmNoXVwiKTtcbiAgICAgICAgaWYgKGlucHV0RWxlbWVudCkge1xuICAgICAgICAgIGlucHV0RWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cbiIsICIvLyBub2RlX21vZHVsZXMvQGZvcm1raXQvYXV0by1hbmltYXRlL2luZGV4Lm1qc1xudmFyIHBhcmVudHMgPSBuZXcgU2V0KCk7XG52YXIgY29vcmRzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBzaWJsaW5ncyA9IG5ldyBXZWFrTWFwKCk7XG52YXIgYW5pbWF0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG52YXIgaW50ZXJzZWN0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG52YXIgaW50ZXJ2YWxzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBvcHRpb25zID0gbmV3IFdlYWtNYXAoKTtcbnZhciBkZWJvdW5jZXMgPSBuZXcgV2Vha01hcCgpO1xudmFyIGVuYWJsZWQgPSBuZXcgV2Vha1NldCgpO1xudmFyIHJvb3Q7XG52YXIgc2Nyb2xsWCA9IDA7XG52YXIgc2Nyb2xsWSA9IDA7XG52YXIgVEdUID0gXCJfX2FhX3RndFwiO1xudmFyIERFTCA9IFwiX19hYV9kZWxcIjtcbnZhciBORVcgPSBcIl9fYWFfbmV3XCI7XG52YXIgaGFuZGxlTXV0YXRpb25zID0gKG11dGF0aW9uczIpID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSBnZXRFbGVtZW50cyhtdXRhdGlvbnMyKTtcbiAgaWYgKGVsZW1lbnRzKSB7XG4gICAgZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IGFuaW1hdGUoZWwpKTtcbiAgfVxufTtcbnZhciBoYW5kbGVSZXNpemVzID0gKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS50YXJnZXQgPT09IHJvb3QpXG4gICAgICB1cGRhdGVBbGxQb3MoKTtcbiAgICBpZiAoY29vcmRzLmhhcyhlbnRyeS50YXJnZXQpKVxuICAgICAgdXBkYXRlUG9zKGVudHJ5LnRhcmdldCk7XG4gIH0pO1xufTtcbmZ1bmN0aW9uIG9ic2VydmVQb3NpdGlvbihlbCkge1xuICBjb25zdCBvbGRPYnNlcnZlciA9IGludGVyc2VjdGlvbnMuZ2V0KGVsKTtcbiAgb2xkT2JzZXJ2ZXIgPT09IG51bGwgfHwgb2xkT2JzZXJ2ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9sZE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgbGV0IHJlY3QgPSBjb29yZHMuZ2V0KGVsKTtcbiAgbGV0IGludm9jYXRpb25zID0gMDtcbiAgY29uc3QgYnVmZmVyID0gNTtcbiAgaWYgKCFyZWN0KSB7XG4gICAgcmVjdCA9IGdldENvb3JkcyhlbCk7XG4gICAgY29vcmRzLnNldChlbCwgcmVjdCk7XG4gIH1cbiAgY29uc3Qge29mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHR9ID0gcm9vdDtcbiAgY29uc3Qgcm9vdE1hcmdpbnMgPSBbXG4gICAgcmVjdC50b3AgLSBidWZmZXIsXG4gICAgb2Zmc2V0V2lkdGggLSAocmVjdC5sZWZ0ICsgYnVmZmVyICsgcmVjdC53aWR0aCksXG4gICAgb2Zmc2V0SGVpZ2h0IC0gKHJlY3QudG9wICsgYnVmZmVyICsgcmVjdC5oZWlnaHQpLFxuICAgIHJlY3QubGVmdCAtIGJ1ZmZlclxuICBdO1xuICBjb25zdCByb290TWFyZ2luID0gcm9vdE1hcmdpbnMubWFwKChweCkgPT4gYCR7LTEgKiBNYXRoLmZsb29yKHB4KX1weGApLmpvaW4oXCIgXCIpO1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgKytpbnZvY2F0aW9ucyA+IDEgJiYgdXBkYXRlUG9zKGVsKTtcbiAgfSwge1xuICAgIHJvb3QsXG4gICAgdGhyZXNob2xkOiAxLFxuICAgIHJvb3RNYXJnaW5cbiAgfSk7XG4gIG9ic2VydmVyLm9ic2VydmUoZWwpO1xuICBpbnRlcnNlY3Rpb25zLnNldChlbCwgb2JzZXJ2ZXIpO1xufVxuZnVuY3Rpb24gdXBkYXRlUG9zKGVsKSB7XG4gIGNsZWFyVGltZW91dChkZWJvdW5jZXMuZ2V0KGVsKSk7XG4gIGNvbnN0IG9wdGlvbnNPclBsdWdpbiA9IGdldE9wdGlvbnMoZWwpO1xuICBjb25zdCBkZWxheSA9IGlzUGx1Z2luKG9wdGlvbnNPclBsdWdpbikgPyA1MDAgOiBvcHRpb25zT3JQbHVnaW4uZHVyYXRpb247XG4gIGRlYm91bmNlcy5zZXQoZWwsIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb24gPSBhbmltYXRpb25zLmdldChlbCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IChjdXJyZW50QW5pbWF0aW9uID09PSBudWxsIHx8IGN1cnJlbnRBbmltYXRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1cnJlbnRBbmltYXRpb24uZmluaXNoZWQpO1xuICAgICAgY29vcmRzLnNldChlbCwgZ2V0Q29vcmRzKGVsKSk7XG4gICAgICBvYnNlcnZlUG9zaXRpb24oZWwpO1xuICAgIH0gY2F0Y2gge1xuICAgIH1cbiAgfSwgZGVsYXkpKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUFsbFBvcygpIHtcbiAgY2xlYXJUaW1lb3V0KGRlYm91bmNlcy5nZXQocm9vdCkpO1xuICBkZWJvdW5jZXMuc2V0KHJvb3QsIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHBhcmVudHMuZm9yRWFjaCgocGFyZW50KSA9PiBmb3JFYWNoKHBhcmVudCwgKGVsKSA9PiBsb3dQcmlvcml0eSgoKSA9PiB1cGRhdGVQb3MoZWwpKSkpO1xuICB9LCAxMDApKTtcbn1cbmZ1bmN0aW9uIHBvbGwoZWwpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW50ZXJ2YWxzLnNldChlbCwgc2V0SW50ZXJ2YWwoKCkgPT4gbG93UHJpb3JpdHkodXBkYXRlUG9zLmJpbmQobnVsbCwgZWwpKSwgMmUzKSk7XG4gIH0sIE1hdGgucm91bmQoMmUzICogTWF0aC5yYW5kb20oKSkpO1xufVxuZnVuY3Rpb24gbG93UHJpb3JpdHkoY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiByZXF1ZXN0SWRsZUNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKCgpID0+IGNhbGxiYWNrKCkpO1xuICB9IGVsc2Uge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgfVxufVxudmFyIG11dGF0aW9ucztcbnZhciByZXNpemU7XG52YXIgc3VwcG9ydGVkQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgXCJSZXNpemVPYnNlcnZlclwiIGluIHdpbmRvdztcbmlmIChzdXBwb3J0ZWRCcm93c2VyKSB7XG4gIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIG11dGF0aW9ucyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGhhbmRsZU11dGF0aW9ucyk7XG4gIHJlc2l6ZSA9IG5ldyBSZXNpemVPYnNlcnZlcihoYW5kbGVSZXNpemVzKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgIHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICBzY3JvbGxYID0gd2luZG93LnNjcm9sbFg7XG4gIH0pO1xuICByZXNpemUub2JzZXJ2ZShyb290KTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRzKG11dGF0aW9uczIpIHtcbiAgY29uc3Qgb2JzZXJ2ZWROb2RlcyA9IG11dGF0aW9uczIucmVkdWNlKChub2RlcywgbXV0YXRpb24pID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4ubm9kZXMsXG4gICAgICAuLi5BcnJheS5mcm9tKG11dGF0aW9uLmFkZGVkTm9kZXMpLFxuICAgICAgLi4uQXJyYXkuZnJvbShtdXRhdGlvbi5yZW1vdmVkTm9kZXMpXG4gICAgXTtcbiAgfSwgW10pO1xuICBjb25zdCBvbmx5Q29tbWVudE5vZGVzT2JzZXJ2ZWQgPSBvYnNlcnZlZE5vZGVzLmV2ZXJ5KChub2RlKSA9PiBub2RlLm5vZGVOYW1lID09PSBcIiNjb21tZW50XCIpO1xuICBpZiAob25seUNvbW1lbnROb2Rlc09ic2VydmVkKVxuICAgIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIG11dGF0aW9uczIucmVkdWNlKChlbGVtZW50cywgbXV0YXRpb24pID0+IHtcbiAgICBpZiAoZWxlbWVudHMgPT09IGZhbHNlKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChtdXRhdGlvbi50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICB0YXJnZXQobXV0YXRpb24udGFyZ2V0KTtcbiAgICAgIGlmICghZWxlbWVudHMuaGFzKG11dGF0aW9uLnRhcmdldCkpIHtcbiAgICAgICAgZWxlbWVudHMuYWRkKG11dGF0aW9uLnRhcmdldCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb24udGFyZ2V0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGQgPSBtdXRhdGlvbi50YXJnZXQuY2hpbGRyZW4uaXRlbShpKTtcbiAgICAgICAgICBpZiAoIWNoaWxkKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgaWYgKERFTCBpbiBjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YXJnZXQobXV0YXRpb24udGFyZ2V0LCBjaGlsZCk7XG4gICAgICAgICAgZWxlbWVudHMuYWRkKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbi5yZW1vdmVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjaGlsZCA9IG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpXTtcbiAgICAgICAgICBpZiAoREVMIGluIGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzLmFkZChjaGlsZCk7XG4gICAgICAgICAgICB0YXJnZXQobXV0YXRpb24udGFyZ2V0LCBjaGlsZCk7XG4gICAgICAgICAgICBzaWJsaW5ncy5zZXQoY2hpbGQsIFtcbiAgICAgICAgICAgICAgbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nLFxuICAgICAgICAgICAgICBtdXRhdGlvbi5uZXh0U2libGluZ1xuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfSwgbmV3IFNldCgpKTtcbn1cbmZ1bmN0aW9uIHRhcmdldChlbCwgY2hpbGQpIHtcbiAgaWYgKCFjaGlsZCAmJiAhKFRHVCBpbiBlbCkpXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsLCBUR1QsIHt2YWx1ZTogZWx9KTtcbiAgZWxzZSBpZiAoY2hpbGQgJiYgIShUR1QgaW4gY2hpbGQpKVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgVEdULCB7dmFsdWU6IGVsfSk7XG59XG5mdW5jdGlvbiBhbmltYXRlKGVsKSB7XG4gIHZhciBfYTtcbiAgY29uc3QgaXNNb3VudGVkID0gZWwuaXNDb25uZWN0ZWQ7XG4gIGNvbnN0IHByZUV4aXN0aW5nID0gY29vcmRzLmhhcyhlbCk7XG4gIGlmIChpc01vdW50ZWQgJiYgc2libGluZ3MuaGFzKGVsKSlcbiAgICBzaWJsaW5ncy5kZWxldGUoZWwpO1xuICBpZiAoYW5pbWF0aW9ucy5oYXMoZWwpKSB7XG4gICAgKF9hID0gYW5pbWF0aW9ucy5nZXQoZWwpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FuY2VsKCk7XG4gIH1cbiAgaWYgKE5FVyBpbiBlbCkge1xuICAgIGFkZChlbCk7XG4gIH0gZWxzZSBpZiAocHJlRXhpc3RpbmcgJiYgaXNNb3VudGVkKSB7XG4gICAgcmVtYWluKGVsKTtcbiAgfSBlbHNlIGlmIChwcmVFeGlzdGluZyAmJiAhaXNNb3VudGVkKSB7XG4gICAgcmVtb3ZlKGVsKTtcbiAgfSBlbHNlIHtcbiAgICBhZGQoZWwpO1xuICB9XG59XG5mdW5jdGlvbiByYXcoc3RyKSB7XG4gIHJldHVybiBOdW1iZXIoc3RyLnJlcGxhY2UoL1teMC05LlxcLV0vZywgXCJcIikpO1xufVxuZnVuY3Rpb24gZ2V0U2Nyb2xsT2Zmc2V0KGVsKSB7XG4gIGxldCBwID0gZWwucGFyZW50RWxlbWVudDtcbiAgd2hpbGUgKHApIHtcbiAgICBpZiAocC5zY3JvbGxMZWZ0IHx8IHAuc2Nyb2xsVG9wKSB7XG4gICAgICByZXR1cm4ge3g6IHAuc2Nyb2xsTGVmdCwgeTogcC5zY3JvbGxUb3B9O1xuICAgIH1cbiAgICBwID0gcC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiB7eDogMCwgeTogMH07XG59XG5mdW5jdGlvbiBnZXRDb29yZHMoZWwpIHtcbiAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB7eCwgeX0gPSBnZXRTY3JvbGxPZmZzZXQoZWwpO1xuICByZXR1cm4ge1xuICAgIHRvcDogcmVjdC50b3AgKyB5LFxuICAgIGxlZnQ6IHJlY3QubGVmdCArIHgsXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufVxuZnVuY3Rpb24gZ2V0VHJhbnNpdGlvblNpemVzKGVsLCBvbGRDb29yZHMsIG5ld0Nvb3Jkcykge1xuICBsZXQgd2lkdGhGcm9tID0gb2xkQ29vcmRzLndpZHRoO1xuICBsZXQgaGVpZ2h0RnJvbSA9IG9sZENvb3Jkcy5oZWlnaHQ7XG4gIGxldCB3aWR0aFRvID0gbmV3Q29vcmRzLndpZHRoO1xuICBsZXQgaGVpZ2h0VG8gPSBuZXdDb29yZHMuaGVpZ2h0O1xuICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgY29uc3Qgc2l6aW5nID0gc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJib3gtc2l6aW5nXCIpO1xuICBpZiAoc2l6aW5nID09PSBcImNvbnRlbnQtYm94XCIpIHtcbiAgICBjb25zdCBwYWRkaW5nWSA9IHJhdyhzdHlsZXMucGFkZGluZ1RvcCkgKyByYXcoc3R5bGVzLnBhZGRpbmdCb3R0b20pICsgcmF3KHN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgKyByYXcoc3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgICBjb25zdCBwYWRkaW5nWCA9IHJhdyhzdHlsZXMucGFkZGluZ0xlZnQpICsgcmF3KHN0eWxlcy5wYWRkaW5nUmlnaHQpICsgcmF3KHN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKSArIHJhdyhzdHlsZXMuYm9yZGVyTGVmdFdpZHRoKTtcbiAgICB3aWR0aEZyb20gLT0gcGFkZGluZ1g7XG4gICAgd2lkdGhUbyAtPSBwYWRkaW5nWDtcbiAgICBoZWlnaHRGcm9tIC09IHBhZGRpbmdZO1xuICAgIGhlaWdodFRvIC09IHBhZGRpbmdZO1xuICB9XG4gIHJldHVybiBbd2lkdGhGcm9tLCB3aWR0aFRvLCBoZWlnaHRGcm9tLCBoZWlnaHRUb10ubWFwKE1hdGgucm91bmQpO1xufVxuZnVuY3Rpb24gZ2V0T3B0aW9ucyhlbCkge1xuICByZXR1cm4gVEdUIGluIGVsICYmIG9wdGlvbnMuaGFzKGVsW1RHVF0pID8gb3B0aW9ucy5nZXQoZWxbVEdUXSkgOiB7ZHVyYXRpb246IDI1MCwgZWFzaW5nOiBcImVhc2UtaW4tb3V0XCJ9O1xufVxuZnVuY3Rpb24gZ2V0VGFyZ2V0KGVsKSB7XG4gIGlmIChUR1QgaW4gZWwpXG4gICAgcmV0dXJuIGVsW1RHVF07XG4gIHJldHVybiB2b2lkIDA7XG59XG5mdW5jdGlvbiBpc0VuYWJsZWQoZWwpIHtcbiAgY29uc3QgdGFyZ2V0MiA9IGdldFRhcmdldChlbCk7XG4gIHJldHVybiB0YXJnZXQyID8gZW5hYmxlZC5oYXModGFyZ2V0MikgOiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGZvckVhY2gocGFyZW50LCAuLi5jYWxsYmFja3MpIHtcbiAgY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhwYXJlbnQsIG9wdGlvbnMuaGFzKHBhcmVudCkpKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZCA9IHBhcmVudC5jaGlsZHJlbi5pdGVtKGkpO1xuICAgIGlmIChjaGlsZCkge1xuICAgICAgY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhjaGlsZCwgb3B0aW9ucy5oYXMoY2hpbGQpKSk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBnZXRQbHVnaW5UdXBsZShwbHVnaW5SZXR1cm4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGx1Z2luUmV0dXJuKSlcbiAgICByZXR1cm4gcGx1Z2luUmV0dXJuO1xuICByZXR1cm4gW3BsdWdpblJldHVybl07XG59XG5mdW5jdGlvbiBpc1BsdWdpbihjb25maWcpIHtcbiAgcmV0dXJuIHR5cGVvZiBjb25maWcgPT09IFwiZnVuY3Rpb25cIjtcbn1cbmZ1bmN0aW9uIHJlbWFpbihlbCkge1xuICBjb25zdCBvbGRDb29yZHMgPSBjb29yZHMuZ2V0KGVsKTtcbiAgY29uc3QgbmV3Q29vcmRzID0gZ2V0Q29vcmRzKGVsKTtcbiAgaWYgKCFpc0VuYWJsZWQoZWwpKVxuICAgIHJldHVybiBjb29yZHMuc2V0KGVsLCBuZXdDb29yZHMpO1xuICBsZXQgYW5pbWF0aW9uO1xuICBpZiAoIW9sZENvb3JkcylcbiAgICByZXR1cm47XG4gIGNvbnN0IHBsdWdpbk9yT3B0aW9ucyA9IGdldE9wdGlvbnMoZWwpO1xuICBpZiAodHlwZW9mIHBsdWdpbk9yT3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc3QgZGVsdGFYID0gb2xkQ29vcmRzLmxlZnQgLSBuZXdDb29yZHMubGVmdDtcbiAgICBjb25zdCBkZWx0YVkgPSBvbGRDb29yZHMudG9wIC0gbmV3Q29vcmRzLnRvcDtcbiAgICBjb25zdCBbd2lkdGhGcm9tLCB3aWR0aFRvLCBoZWlnaHRGcm9tLCBoZWlnaHRUb10gPSBnZXRUcmFuc2l0aW9uU2l6ZXMoZWwsIG9sZENvb3JkcywgbmV3Q29vcmRzKTtcbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke2RlbHRhWH1weCwgJHtkZWx0YVl9cHgpYFxuICAgIH07XG4gICAgY29uc3QgZW5kID0ge1xuICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKDAsIDApYFxuICAgIH07XG4gICAgaWYgKHdpZHRoRnJvbSAhPT0gd2lkdGhUbykge1xuICAgICAgc3RhcnQud2lkdGggPSBgJHt3aWR0aEZyb219cHhgO1xuICAgICAgZW5kLndpZHRoID0gYCR7d2lkdGhUb31weGA7XG4gICAgfVxuICAgIGlmIChoZWlnaHRGcm9tICE9PSBoZWlnaHRUbykge1xuICAgICAgc3RhcnQuaGVpZ2h0ID0gYCR7aGVpZ2h0RnJvbX1weGA7XG4gICAgICBlbmQuaGVpZ2h0ID0gYCR7aGVpZ2h0VG99cHhgO1xuICAgIH1cbiAgICBhbmltYXRpb24gPSBlbC5hbmltYXRlKFtzdGFydCwgZW5kXSwge1xuICAgICAgZHVyYXRpb246IHBsdWdpbk9yT3B0aW9ucy5kdXJhdGlvbixcbiAgICAgIGVhc2luZzogcGx1Z2luT3JPcHRpb25zLmVhc2luZ1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IFtrZXlmcmFtZXNdID0gZ2V0UGx1Z2luVHVwbGUocGx1Z2luT3JPcHRpb25zKGVsLCBcInJlbWFpblwiLCBvbGRDb29yZHMsIG5ld0Nvb3JkcykpO1xuICAgIGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oa2V5ZnJhbWVzKTtcbiAgICBhbmltYXRpb24ucGxheSgpO1xuICB9XG4gIGFuaW1hdGlvbnMuc2V0KGVsLCBhbmltYXRpb24pO1xuICBjb29yZHMuc2V0KGVsLCBuZXdDb29yZHMpO1xuICBhbmltYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImZpbmlzaFwiLCB1cGRhdGVQb3MuYmluZChudWxsLCBlbCkpO1xufVxuZnVuY3Rpb24gYWRkKGVsKSB7XG4gIGlmIChORVcgaW4gZWwpXG4gICAgZGVsZXRlIGVsW05FV107XG4gIGNvbnN0IG5ld0Nvb3JkcyA9IGdldENvb3JkcyhlbCk7XG4gIGNvb3Jkcy5zZXQoZWwsIG5ld0Nvb3Jkcyk7XG4gIGNvbnN0IHBsdWdpbk9yT3B0aW9ucyA9IGdldE9wdGlvbnMoZWwpO1xuICBpZiAoIWlzRW5hYmxlZChlbCkpXG4gICAgcmV0dXJuO1xuICBsZXQgYW5pbWF0aW9uO1xuICBpZiAodHlwZW9mIHBsdWdpbk9yT3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgYW5pbWF0aW9uID0gZWwuYW5pbWF0ZShbXG4gICAgICB7dHJhbnNmb3JtOiBcInNjYWxlKC45OClcIiwgb3BhY2l0eTogMH0sXG4gICAgICB7dHJhbnNmb3JtOiBcInNjYWxlKDAuOTgpXCIsIG9wYWNpdHk6IDAsIG9mZnNldDogMC41fSxcbiAgICAgIHt0cmFuc2Zvcm06IFwic2NhbGUoMSlcIiwgb3BhY2l0eTogMX1cbiAgICBdLCB7XG4gICAgICBkdXJhdGlvbjogcGx1Z2luT3JPcHRpb25zLmR1cmF0aW9uICogMS41LFxuICAgICAgZWFzaW5nOiBcImVhc2UtaW5cIlxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IFtrZXlmcmFtZXNdID0gZ2V0UGx1Z2luVHVwbGUocGx1Z2luT3JPcHRpb25zKGVsLCBcImFkZFwiLCBuZXdDb29yZHMpKTtcbiAgICBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKGtleWZyYW1lcyk7XG4gICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgfVxuICBhbmltYXRpb25zLnNldChlbCwgYW5pbWF0aW9uKTtcbiAgYW5pbWF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJmaW5pc2hcIiwgdXBkYXRlUG9zLmJpbmQobnVsbCwgZWwpKTtcbn1cbmZ1bmN0aW9uIGNsZWFuVXAoZWwsIHN0eWxlcykge1xuICB2YXIgX2E7XG4gIGVsLnJlbW92ZSgpO1xuICBjb29yZHMuZGVsZXRlKGVsKTtcbiAgc2libGluZ3MuZGVsZXRlKGVsKTtcbiAgYW5pbWF0aW9ucy5kZWxldGUoZWwpO1xuICAoX2EgPSBpbnRlcnNlY3Rpb25zLmdldChlbCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNjb25uZWN0KCk7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChERUwgaW4gZWwpXG4gICAgICBkZWxldGUgZWxbREVMXTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIE5FVywge3ZhbHVlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcbiAgICBpZiAoc3R5bGVzICYmIGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIGZvciAoY29uc3Qgc3R5bGUgaW4gc3R5bGVzKSB7XG4gICAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IFwiXCI7XG4gICAgICB9XG4gICAgfVxuICB9LCAwKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZShlbCkge1xuICB2YXIgX2E7XG4gIGlmICghc2libGluZ3MuaGFzKGVsKSB8fCAhY29vcmRzLmhhcyhlbCkpXG4gICAgcmV0dXJuO1xuICBjb25zdCBbcHJldiwgbmV4dF0gPSBzaWJsaW5ncy5nZXQoZWwpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIERFTCwge3ZhbHVlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcbiAgY29uc3QgZmluYWxYID0gd2luZG93LnNjcm9sbFg7XG4gIGNvbnN0IGZpbmFsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICBpZiAobmV4dCAmJiBuZXh0LnBhcmVudE5vZGUgJiYgbmV4dC5wYXJlbnROb2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIG5leHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIG5leHQpO1xuICB9IGVsc2UgaWYgKHByZXYgJiYgcHJldi5wYXJlbnROb2RlKSB7XG4gICAgcHJldi5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKTtcbiAgfSBlbHNlIHtcbiAgICAoX2EgPSBnZXRUYXJnZXQoZWwpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBwZW5kQ2hpbGQoZWwpO1xuICB9XG4gIGlmICghaXNFbmFibGVkKGVsKSlcbiAgICByZXR1cm4gY2xlYW5VcChlbCk7XG4gIGNvbnN0IFt0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHRdID0gZGVsZXRlUG9zaXRpb24oZWwpO1xuICBjb25zdCBvcHRpb25zT3JQbHVnaW4gPSBnZXRPcHRpb25zKGVsKTtcbiAgY29uc3Qgb2xkQ29vcmRzID0gY29vcmRzLmdldChlbCk7XG4gIGlmIChmaW5hbFggIT09IHNjcm9sbFggfHwgZmluYWxZICE9PSBzY3JvbGxZKSB7XG4gICAgYWRqdXN0U2Nyb2xsKGVsLCBmaW5hbFgsIGZpbmFsWSwgb3B0aW9uc09yUGx1Z2luKTtcbiAgfVxuICBsZXQgYW5pbWF0aW9uO1xuICBsZXQgc3R5bGVSZXNldCA9IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIHRvcDogYCR7dG9wfXB4YCxcbiAgICBsZWZ0OiBgJHtsZWZ0fXB4YCxcbiAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YCxcbiAgICBtYXJnaW46IFwiMFwiLFxuICAgIHBvaW50ZXJFdmVudHM6IFwibm9uZVwiLFxuICAgIHRyYW5zZm9ybU9yaWdpbjogXCJjZW50ZXJcIixcbiAgICB6SW5kZXg6IFwiMTAwXCJcbiAgfTtcbiAgaWYgKCFpc1BsdWdpbihvcHRpb25zT3JQbHVnaW4pKSB7XG4gICAgT2JqZWN0LmFzc2lnbihlbC5zdHlsZSwgc3R5bGVSZXNldCk7XG4gICAgYW5pbWF0aW9uID0gZWwuYW5pbWF0ZShbXG4gICAgICB7XG4gICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0cmFuc2Zvcm06IFwic2NhbGUoLjk4KVwiLFxuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9XG4gICAgXSwge2R1cmF0aW9uOiBvcHRpb25zT3JQbHVnaW4uZHVyYXRpb24sIGVhc2luZzogXCJlYXNlLW91dFwifSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgW2tleWZyYW1lcywgb3B0aW9uczJdID0gZ2V0UGx1Z2luVHVwbGUob3B0aW9uc09yUGx1Z2luKGVsLCBcInJlbW92ZVwiLCBvbGRDb29yZHMpKTtcbiAgICBpZiAoKG9wdGlvbnMyID09PSBudWxsIHx8IG9wdGlvbnMyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zMi5zdHlsZVJlc2V0KSAhPT0gZmFsc2UpIHtcbiAgICAgIHN0eWxlUmVzZXQgPSAob3B0aW9uczIgPT09IG51bGwgfHwgb3B0aW9uczIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMyLnN0eWxlUmVzZXQpIHx8IHN0eWxlUmVzZXQ7XG4gICAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCBzdHlsZVJlc2V0KTtcbiAgICB9XG4gICAgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbihrZXlmcmFtZXMpO1xuICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gIH1cbiAgYW5pbWF0aW9ucy5zZXQoZWwsIGFuaW1hdGlvbik7XG4gIGFuaW1hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsIGNsZWFuVXAuYmluZChudWxsLCBlbCwgc3R5bGVSZXNldCkpO1xufVxuZnVuY3Rpb24gYWRqdXN0U2Nyb2xsKGVsLCBmaW5hbFgsIGZpbmFsWSwgb3B0aW9uc09yUGx1Z2luKSB7XG4gIGNvbnN0IHNjcm9sbERlbHRhWCA9IHNjcm9sbFggLSBmaW5hbFg7XG4gIGNvbnN0IHNjcm9sbERlbHRhWSA9IHNjcm9sbFkgLSBmaW5hbFk7XG4gIGNvbnN0IHNjcm9sbEJlZm9yZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zY3JvbGxCZWhhdmlvcjtcbiAgY29uc3Qgc2Nyb2xsQmVoYXZpb3IgPSBnZXRDb21wdXRlZFN0eWxlKHJvb3QpLnNjcm9sbEJlaGF2aW9yO1xuICBpZiAoc2Nyb2xsQmVoYXZpb3IgPT09IFwic21vb3RoXCIpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSBcImF1dG9cIjtcbiAgfVxuICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFggKyBzY3JvbGxEZWx0YVgsIHdpbmRvdy5zY3JvbGxZICsgc2Nyb2xsRGVsdGFZKTtcbiAgaWYgKCFlbC5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybjtcbiAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcbiAgbGV0IGxhc3RIZWlnaHQgPSBwYXJlbnQuY2xpZW50SGVpZ2h0O1xuICBsZXQgbGFzdFdpZHRoID0gcGFyZW50LmNsaWVudFdpZHRoO1xuICBjb25zdCBzdGFydFNjcm9sbCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghaXNQbHVnaW4ob3B0aW9uc09yUGx1Z2luKSkge1xuICAgICAgICBjb25zdCBkZWx0YVkgPSBsYXN0SGVpZ2h0IC0gcGFyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgZGVsdGFYID0gbGFzdFdpZHRoIC0gcGFyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAoc3RhcnRTY3JvbGwgKyBvcHRpb25zT3JQbHVnaW4uZHVyYXRpb24gPiBwZXJmb3JtYW5jZS5ub3coKSkge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICBsZWZ0OiB3aW5kb3cuc2Nyb2xsWCAtIGRlbHRhWCxcbiAgICAgICAgICAgIHRvcDogd2luZG93LnNjcm9sbFkgLSBkZWx0YVlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsYXN0SGVpZ2h0ID0gcGFyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICBsYXN0V2lkdGggPSBwYXJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgc21vb3RoU2Nyb2xsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNjcm9sbEJlaGF2aW9yID0gc2Nyb2xsQmVmb3JlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgc21vb3RoU2Nyb2xsKCk7XG59XG5mdW5jdGlvbiBkZWxldGVQb3NpdGlvbihlbCkge1xuICBjb25zdCBvbGRDb29yZHMgPSBjb29yZHMuZ2V0KGVsKTtcbiAgY29uc3QgW3dpZHRoLCAsIGhlaWdodF0gPSBnZXRUcmFuc2l0aW9uU2l6ZXMoZWwsIG9sZENvb3JkcywgZ2V0Q29vcmRzKGVsKSk7XG4gIGxldCBvZmZzZXRQYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIChnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09IFwic3RhdGljXCIgfHwgb2Zmc2V0UGFyZW50IGluc3RhbmNlb2YgSFRNTEJvZHlFbGVtZW50KSkge1xuICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIGlmICghb2Zmc2V0UGFyZW50KVxuICAgIG9mZnNldFBhcmVudCA9IGRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IHBhcmVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KTtcbiAgY29uc3QgcGFyZW50Q29vcmRzID0gY29vcmRzLmdldChvZmZzZXRQYXJlbnQpIHx8IGdldENvb3JkcyhvZmZzZXRQYXJlbnQpO1xuICBjb25zdCB0b3AgPSBNYXRoLnJvdW5kKG9sZENvb3Jkcy50b3AgLSBwYXJlbnRDb29yZHMudG9wKSAtIHJhdyhwYXJlbnRTdHlsZXMuYm9yZGVyVG9wV2lkdGgpO1xuICBjb25zdCBsZWZ0ID0gTWF0aC5yb3VuZChvbGRDb29yZHMubGVmdCAtIHBhcmVudENvb3Jkcy5sZWZ0KSAtIHJhdyhwYXJlbnRTdHlsZXMuYm9yZGVyTGVmdFdpZHRoKTtcbiAgcmV0dXJuIFt0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHRdO1xufVxuZnVuY3Rpb24gYXV0b0FuaW1hdGUoZWwsIGNvbmZpZyA9IHt9KSB7XG4gIGlmIChtdXRhdGlvbnMgJiYgcmVzaXplKSB7XG4gICAgY29uc3QgbWVkaWFRdWVyeSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIik7XG4gICAgY29uc3QgaXNEaXNhYmxlZER1ZVRvUmVkdWNlTW90aW9uID0gbWVkaWFRdWVyeS5tYXRjaGVzICYmICFpc1BsdWdpbihjb25maWcpICYmICFjb25maWcuZGlzcmVzcGVjdFVzZXJNb3Rpb25QcmVmZXJlbmNlO1xuICAgIGlmICghaXNEaXNhYmxlZER1ZVRvUmVkdWNlTW90aW9uKSB7XG4gICAgICBlbmFibGVkLmFkZChlbCk7XG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShlbCkucG9zaXRpb24gPT09IFwic3RhdGljXCIpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihlbC5zdHlsZSwge3Bvc2l0aW9uOiBcInJlbGF0aXZlXCJ9KTtcbiAgICAgIH1cbiAgICAgIGZvckVhY2goZWwsIHVwZGF0ZVBvcywgcG9sbCwgKGVsZW1lbnQpID0+IHJlc2l6ZSA9PT0gbnVsbCB8fCByZXNpemUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc2l6ZS5vYnNlcnZlKGVsZW1lbnQpKTtcbiAgICAgIGlmIChpc1BsdWdpbihjb25maWcpKSB7XG4gICAgICAgIG9wdGlvbnMuc2V0KGVsLCBjb25maWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5zZXQoZWwsIHtkdXJhdGlvbjogMjUwLCBlYXNpbmc6IFwiZWFzZS1pbi1vdXRcIiwgLi4uY29uZmlnfSk7XG4gICAgICB9XG4gICAgICBtdXRhdGlvbnMub2JzZXJ2ZShlbCwge2NoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgcGFyZW50cy5hZGQoZWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgcGFyZW50OiBlbCxcbiAgICBlbmFibGU6ICgpID0+IHtcbiAgICAgIGVuYWJsZWQuYWRkKGVsKTtcbiAgICB9LFxuICAgIGRpc2FibGU6ICgpID0+IHtcbiAgICAgIGVuYWJsZWQuZGVsZXRlKGVsKTtcbiAgICB9LFxuICAgIGlzRW5hYmxlZDogKCkgPT4gZW5hYmxlZC5oYXMoZWwpXG4gIH0pO1xufVxuXG4vLyBzcmMvaW5kZXguanNcbnZhciBzcmNfZGVmYXVsdCA9IChBbHBpbmUpID0+IHtcbiAgQWxwaW5lLmRpcmVjdGl2ZShcImFuaW1hdGVcIiwgKGVsLCB7dmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbn0sIHtBbHBpbmU6IEFscGluZTIsIGVmZmVjdCwgZXZhbHVhdGUsIGV2YWx1YXRlTGF0ZXIsIGNsZWFudXB9KSA9PiB7XG4gICAgbGV0IGNvbmZpZ3MgPSB7fTtcbiAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiZHVyYXRpb25cIikpIHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uSW5kZXggPSBtb2RpZmllcnMuaW5kZXhPZihcImR1cmF0aW9uXCIpO1xuICAgICAgY29uc3QgZHVyYXRpb25WYWx1ZSA9IG1vZGlmaWVyc1tkdXJhdGlvbkluZGV4ICsgMV07XG4gICAgICBjb25zdCBkdXJhdGlvblJlZ2V4ID0gL14oXFxkKykobXN8cyk/JC87XG4gICAgICBpZiAoZHVyYXRpb25SZWdleC50ZXN0KGR1cmF0aW9uVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gZHVyYXRpb25SZWdleC5leGVjKGR1cmF0aW9uVmFsdWUpO1xuICAgICAgICBjb25zdCBkdXJhdGlvbk51bWJlciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uVW5pdCA9IG1hdGNoWzJdIHx8IFwibXNcIjtcbiAgICAgICAgY29uZmlncy5kdXJhdGlvbiA9IGR1cmF0aW9uVW5pdCA9PT0gXCJzXCIgPyBkdXJhdGlvbk51bWJlciAqIDFlMyA6IGR1cmF0aW9uTnVtYmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiSW52YWxpZCBkdXJhdGlvbiBmb3JtYXQuIFVzZSBkaWdpdHMgZm9sbG93ZWQgYnkgJ21zJyBvciAncycuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiZWFzaW5nXCIpKSB7XG4gICAgICBjb25zdCBlYXNpbmdWYWx1ZSA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihcImVhc2luZ1wiKSArIDFdO1xuICAgICAgZWFzaW5nVmFsdWUgPyBjb25maWdzLmVhc2luZyA9IGVhc2luZ1ZhbHVlIDogY29uc29sZS53YXJuKCdUaGUgXCJlYXNpbmdcIiBtb2RpZmllciB3YXMgc3BlY2lmaWVkIHdpdGhvdXQgYSB2YWx1ZS4nKTtcbiAgICB9XG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImRpc3Jlc3BlY3R1c2VybW90aW9ucHJlZmVyZW5jZVwiKSkge1xuICAgICAgY29uc3QgdXNlck1vdGlvblByZWZWYWx1ZSA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihcImRpc3Jlc3BlY3R1c2VybW90aW9ucHJlZmVyZW5jZVwiKSArIDFdO1xuICAgICAgY29uZmlncy5kaXNyZXNwZWN0VXNlck1vdGlvblByZWZlcmVuY2UgPSB1c2VyTW90aW9uUHJlZlZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoU3RyaW5nKGV4cHJlc3Npb24pLmxlbmd0aCkge1xuICAgICAgY29uZmlncyA9IHsuLi5jb25maWdzLCAuLi5ldmFsdWF0ZShleHByZXNzaW9uKX07XG4gICAgfVxuICAgIGF1dG9BbmltYXRlKGVsLCBjb25maWdzKTtcbiAgfSk7XG59O1xuXG4vLyBidWlsZHMvbW9kdWxlLmpzXG52YXIgbW9kdWxlX2RlZmF1bHQgPSBzcmNfZGVmYXVsdDtcbmV4cG9ydCB7XG4gIG1vZHVsZV9kZWZhdWx0IGFzIGRlZmF1bHRcbn07XG4iLCAiaW1wb3J0IG1vZGFsU3RvcmUgZnJvbSBcIi4vbW9kYWxcIjtcbmltcG9ydCBBbmltYXRlIGZyb20gJ0BjaGFycmFmaW1lZC9hbHBpbmUtYW5pbWF0aW9uJ1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhbHBpbmU6aW5pdFwiLCAoKSA9PiB7XG4gIEFscGluZS5wbHVnaW4oQW5pbWF0ZSlcbiAgd2luZG93LkFscGluZS5zdG9yZShcImdsb2JhbFNlYXJjaE1vZGFsU3RvcmVcIiwgbW9kYWxTdG9yZSgpKTtcbn0pO1xuXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZSxTQUFSLGFBQThCO0FBQ25DLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFlBQVk7QUFDVixXQUFLLFNBQVM7QUFBQSxJQUNoQjtBQUFBLElBQ0EsWUFBWTtBQUNWLFdBQUssU0FBUztBQUNkLFlBQU0sY0FBYyxTQUFTLGNBQWMseUJBQXlCO0FBQ3BFLFVBQUksYUFBYTtBQUNmLG9CQUFZLE1BQU0sVUFBVTtBQUM1QixjQUFNLGVBQWUsWUFBWSxjQUFjLG9CQUFvQjtBQUNuRSxZQUFJLGNBQWM7QUFDaEIsdUJBQWEsV0FBVztBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBQ2pCQSxJQUFJLFVBQVUsb0JBQUksSUFBSTtBQUN0QixJQUFJLFNBQVMsb0JBQUksUUFBUTtBQUN6QixJQUFJLFdBQVcsb0JBQUksUUFBUTtBQUMzQixJQUFJLGFBQWEsb0JBQUksUUFBUTtBQUM3QixJQUFJLGdCQUFnQixvQkFBSSxRQUFRO0FBQ2hDLElBQUksWUFBWSxvQkFBSSxRQUFRO0FBQzVCLElBQUksVUFBVSxvQkFBSSxRQUFRO0FBQzFCLElBQUksWUFBWSxvQkFBSSxRQUFRO0FBQzVCLElBQUksVUFBVSxvQkFBSSxRQUFRO0FBQzFCLElBQUk7QUFDSixJQUFJLFVBQVU7QUFDZCxJQUFJLFVBQVU7QUFDZCxJQUFJLE1BQU07QUFDVixJQUFJLE1BQU07QUFDVixJQUFJLE1BQU07QUFDVixJQUFJLGtCQUFrQixDQUFDLGVBQWU7QUFDcEMsUUFBTSxXQUFXLFlBQVksVUFBVTtBQUN2QyxNQUFJLFVBQVU7QUFDWixhQUFTLFFBQVEsQ0FBQyxPQUFPLFFBQVEsRUFBRSxDQUFDO0FBQUEsRUFDdEM7QUFDRjtBQUNBLElBQUksZ0JBQWdCLENBQUMsWUFBWTtBQUMvQixVQUFRLFFBQVEsQ0FBQyxVQUFVO0FBQ3pCLFFBQUks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
