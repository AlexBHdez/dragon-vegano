function Backgrounds(ctx) {
  
  this.ctx = ctx;

  this.image = new Image();
  this.image.src = 'assets/dragon-vegano-floor.png';
}

Backgrounds.prototype.drawBackground = function () {
  this.ctx.drawImage(this.image, 0, 450);
};

