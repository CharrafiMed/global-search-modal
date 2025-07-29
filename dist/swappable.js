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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVzb3VyY2VzL2pzL3N3YXBwYWJsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gdGhpcyBjb2RlIHdhcyB3cml0dGVuIGJlZm9yZSBtYWtpbmcgdGhlIHNlZWFyY2ggY29tcG9uZW50IG5vdCBsYXp5IGxvYWRlZCBjb21wb25lbnRcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dhcHBhYmxlKCkge1xuICByZXR1cm4ge1xuICAgIHN0YXJ0WTogMCxcbiAgICBjdXJyZW50WTogMCxcbiAgICBtb3Zpbmc6IGZhbHNlLFxuICAgIGluaXQoKSB7XG4gICAgICBBbHBpbmUuZWZmZWN0KCgpID0+IHtcbiAgICAgICAgdGhpcy4kZWwucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGhpcy5kaXN0YW5jZX1weClgO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXQgZGlzdGFuY2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb3ZpbmcgPyBNYXRoLm1heCgwLCB0aGlzLmN1cnJlbnRZIC0gdGhpcy5zdGFydFkpIDogMDtcbiAgICB9LFxuXG4gICAgaGFuZGxlTW92aW5nU3RhcnQoZXZlbnQpIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RhcnRZID0gdGhpcy5jdXJyZW50WSA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICB9LFxuICAgIGhhbmRsZVdoaWxlTW92aW5nKGV2ZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRZID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xuICAgIH0sXG4gICAgaGFuZGxlTW92aW5nRW5kKCkge1xuICAgICAgaWYgKHRoaXMuZGlzdGFuY2UgPiAxMDApIHtcbiAgICAgICAgQWxwaW5lLnN0b3JlKFwiZ2xvYmFsU2VhcmNoTW9kYWxTdG9yZVwiKS5oaWRlTW9kYWwoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFZSxTQUFSLFlBQTZCO0FBQ2xDLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFDTCxhQUFPLE9BQU8sTUFBTTtBQUNsQixhQUFLLElBQUksY0FBYyxjQUFjLE1BQU0sWUFBWSxjQUFjLEtBQUssUUFBUTtBQUFBLE1BQ3BGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxJQUFJLFdBQVc7QUFDYixhQUFPLEtBQUssU0FBUyxLQUFLLElBQUksR0FBRyxLQUFLLFdBQVcsS0FBSyxNQUFNLElBQUk7QUFBQSxJQUNsRTtBQUFBLElBRUEsa0JBQWtCLE9BQU87QUFDdkIsV0FBSyxTQUFTO0FBQ2QsV0FBSyxTQUFTLEtBQUssV0FBVyxNQUFNLFFBQVEsQ0FBQyxFQUFFO0FBQUEsSUFDakQ7QUFBQSxJQUNBLGtCQUFrQixPQUFPO0FBQ3ZCLFdBQUssV0FBVyxNQUFNLFFBQVEsQ0FBQyxFQUFFO0FBQUEsSUFDbkM7QUFBQSxJQUNBLGtCQUFrQjtBQUNoQixVQUFJLEtBQUssV0FBVyxLQUFLO0FBQ3ZCLGVBQU8sTUFBTSx3QkFBd0IsRUFBRSxVQUFVO0FBQUEsTUFDbkQ7QUFDQSxXQUFLLFNBQVM7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
