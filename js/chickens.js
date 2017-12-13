function Chickens(x, y, ctx, src) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;

  this.spriteWidth = 542;
  this.spriteHeight = 30;
  this.spriteRows = 1;
  this.spriteColumns = 20;
  this.spriteWalk = 1;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.frameCount = 20;
  this.walk = true;
  this.chickenImage = new Image();
  this.chickenImage.src = src;
}

Chickens.prototype.drawChicken = function () {
  this.ctx.drawImage(this.chickenImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteFrameWidth, this.spriteFrameHeight);
};

// Chickens.prototype.updateFrame = function () {
//   this.currentFrame = ++this.currentFrame % this.frameCount;
//   this.srcX = this.currentFrame * this.spriteFrameWidth;
//   this.frameInterval = setInterval(function () {
//     this.updateFrame();
//   }.bind(this), 50);
// };


