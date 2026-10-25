class b {
  constructor(e, t) {
    this.containerGetter = e, this.wrapperGetter = t, this.resizeObserver = null, this.boundCheck = this.checkOverflow.bind(this);
  }
  start() {
    this.stop();
    const e = this.containerGetter(), t = this.wrapperGetter();
    !e || !t || (typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(this.boundCheck), this.resizeObserver.observe(e), this.resizeObserver.observe(t)), window.addEventListener("resize", this.boundCheck, { passive: !0 }), setTimeout(this.boundCheck, 0));
  }
  checkOverflow() {
    const e = this.containerGetter(), t = this.wrapperGetter();
    if (!e || !t) return;
    const s = e.clientWidth || 0, i = t.scrollWidth || 0;
    t.style.justifyContent = i > s ? "start" : "";
  }
  stop() {
    if (this.resizeObserver) {
      try {
        this.resizeObserver.disconnect();
      } catch {
      }
      this.resizeObserver = null;
    }
    window.removeEventListener("resize", this.boundCheck);
  }
}
class p {
  constructor(e, t = {}) {
    this.options = { ...t }, this.lightbox = e, this.thumbsContainer = null, this.thumbsWrapper = null, this.boundUpdateCurrentThumb = this.updateCurrentThumb.bind(this), this.overflowManager = new b(
      () => this.thumbsContainer,
      () => this.thumbsWrapper
    ), this.lightbox.on("init", () => {
      this.initPlugin(this.lightbox.pswp);
    });
  }
  initPlugin(e) {
    const t = this.lightbox.options.gallery;
    if (!t) {
      console.warn("PhotoSwipeThumbs: No gallery found in lightbox options");
      return;
    }
    e.on("initialLayout", () => {
      const s = e.element;
      if (!s) {
        console.warn("PhotoSwipeThumbs: PhotoSwipe container not found");
        return;
      }
      this.thumbsContainer = document.createElement("div"), this.thumbsContainer.classList.add("pswp__thumbs"), this.thumbsWrapper = document.createElement("div"), this.thumbsWrapper.classList.add("pswp__thumbs-wrapper"), this.thumbsContainer.appendChild(this.thumbsWrapper), s.appendChild(this.thumbsContainer);
      const i = typeof t == "string" ? document.querySelector(t) : t;
      if (!i) {
        console.warn("PhotoSwipeThumbs: Gallery element not found", t);
        return;
      }
      i.querySelectorAll("a").forEach((h, u) => {
        const a = h.getAttribute("data-pswp-thumb") || h.href;
        if (a) {
          const r = document.createElement("button"), n = document.createElement("img");
          n.src = a, r.classList.add("pswp__thumb"), n.classList.add("pswp__thumb-img"), n.dataset.index = u, r.appendChild(n), r.addEventListener("click", () => {
            e.goTo(u);
          }), this.thumbsWrapper.appendChild(r);
        }
      });
      const l = e.currIndex || 0;
      this.updateCurrentThumb(l), this.overflowManager.start();
    }), this.lightbox.on("contentActivate", ({ content: s }) => {
      this.updateCurrentThumb(s.index);
    });
  }
  updateCurrentThumb(e) {
    if (!this.thumbsContainer) return;
    this.thumbsContainer.querySelectorAll(".pswp__thumb").forEach((s, i) => {
      const o = i === e;
      s.classList.toggle("pswp__thumb--active", o), o && s.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    });
  }
  destroy() {
    this.thumbsContainer && (this.thumbsContainer.querySelectorAll(".pswp__thumb").forEach((t) => {
      t.removeEventListener("click", this.boundUpdateCurrentThumb);
    }), this.thumbsContainer.remove(), this.thumbsContainer = null), this.overflowManager && this.overflowManager.stop();
  }
}
export {
  p as default
};
