function Broccoli(x, y, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;

  this.spriteWidth = 20;
  this.spriteHeight = 20;
  this.spriteRows = 1;
  this.spriteColumns = 1;
  this.spriteRotate = 1;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.frameCount = 1;
  this.rotate = true;
  this.brocoliImage = new Image();
  this.brocoliImage.src = 'assets/broccoli.png';
}

Broccoli.prototype.drawTrap = function () {
  this.ctx.drawImage(this.brocoliImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
};