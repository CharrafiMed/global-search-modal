// this code was written before making the seearch component not lazy loaded component

export default function swappable() {
  return {
    startY: 0,
    currentY: 0,
    moving: false,
    init() {
      Alpine.effect(() => {
        this.$el.parentElement.parentElement.style.transform = `translateY(${this.distance}px)`;
      });
    },
    get distance() {
      return this.moving ? Math.max(0, this.currentY - this.startY) : 0;
    },

    handleMovingStart(event) {
      this.moving = true;
      this.startY = this.currentY = event.touches[0].clientY;
    },
    handleWhileMoving(event) {
      this.currentY = event.touches[0].clientY;
    },
    handleMovingEnd() {
      if (this.distance > 100) {
        Alpine.store("globalSearchModalStore").hideModal();
      }
      this.moving = false;
    },
  };
}
