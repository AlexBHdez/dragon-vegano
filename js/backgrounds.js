function Floor(ctx) {
  
  this.ctx = ctx;

  this.image = new Image();
  this.image.src = 'assets/dragon-vegano-floor.png';
}

Floor.prototype.drawBackground = function () {
  this.ctx.drawImage(this.image, 0, 400);
};

