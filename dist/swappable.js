// resources/js/swappable.js
function swappable() {
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
    }
  };
}
export {
  swappable as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL3N3YXBwYWJsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gdGhpcyBjb2RlIHdhcyB3cml0dGVuIGJlZm9yZSBtYWtpbmcgdGhlIHNlZWFyY2ggY29tcG9uZW50IG5vdCBsYXp5IGxvYWRlZCBjb21wb25lbnRcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN3YXBwYWJsZSgpIHtcclxuICByZXR1cm4ge1xyXG4gICAgc3RhcnRZOiAwLFxyXG4gICAgY3VycmVudFk6IDAsXHJcbiAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgQWxwaW5lLmVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZWwucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGhpcy5kaXN0YW5jZX1weClgO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBnZXQgZGlzdGFuY2UoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vdmluZyA/IE1hdGgubWF4KDAsIHRoaXMuY3VycmVudFkgLSB0aGlzLnN0YXJ0WSkgOiAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVNb3ZpbmdTdGFydChldmVudCkge1xyXG4gICAgICB0aGlzLm1vdmluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3RhcnRZID0gdGhpcy5jdXJyZW50WSA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVXaGlsZU1vdmluZyhldmVudCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRZID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZU1vdmluZ0VuZCgpIHtcclxuICAgICAgaWYgKHRoaXMuZGlzdGFuY2UgPiAxMDApIHtcclxuICAgICAgICBBbHBpbmUuc3RvcmUoXCJnbG9iYWxTZWFyY2hNb2RhbFN0b3JlXCIpLmhpZGVNb2RhbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVlLFNBQVIsWUFBNkI7QUFDbEMsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUNMLGFBQU8sT0FBTyxNQUFNO0FBQ2xCLGFBQUssSUFBSSxjQUFjLGNBQWMsTUFBTSxZQUFZLGNBQWMsS0FBSyxRQUFRO0FBQUEsTUFDcEYsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLElBQUksV0FBVztBQUNiLGFBQU8sS0FBSyxTQUFTLEtBQUssSUFBSSxHQUFHLEtBQUssV0FBVyxLQUFLLE1BQU0sSUFBSTtBQUFBLElBQ2xFO0FBQUEsSUFFQSxrQkFBa0IsT0FBTztBQUN2QixXQUFLLFNBQVM7QUFDZCxXQUFLLFNBQVMsS0FBSyxXQUFXLE1BQU0sUUFBUSxDQUFDLEVBQUU7QUFBQSxJQUNqRDtBQUFBLElBQ0Esa0JBQWtCLE9BQU87QUFDdkIsV0FBSyxXQUFXLE1BQU0sUUFBUSxDQUFDLEVBQUU7QUFBQSxJQUNuQztBQUFBLElBQ0Esa0JBQWtCO0FBQ2hCLFVBQUksS0FBSyxXQUFXLEtBQUs7QUFDdkIsZUFBTyxNQUFNLHdCQUF3QixFQUFFLFVBQVU7QUFBQSxNQUNuRDtBQUNBLFdBQUssU0FBUztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
