function Shadow (ctx) {

  this.ctx = ctx;
}

Shadow.prototype.drawShadow = function () {
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(200, 100, 100, 10);
  this.frameInterval = window.requestAnimationFrame(this.shadow.bind(this));
};