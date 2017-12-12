// Defino las propiedades básicas de los obstáculos.
function Chickens(x, y, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;

  this.spriteWidth = 1040;
  this.spriteHeight = 80;
  this.spriteRows = 1;
  this.spriteColumns = 9;
  this.spriteWalk = 1;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.frameCount = 9;
  this.walk = true;
  this.chickenImage = new Image();
  this.chickenImage.src = 'assets/chicken-walk.png';
}

// Dibujo el obstáculo -> updateGameArea
Chickens.prototype.updateFrame = function () {
  this.currentFrame = ++this.currentFrame % this.frameCount;
  this.srcX = this.currentFrame * this.spriteFrameWidth;
  this.frameInterval = window.requestAnimationFrame(this.updateFrame.bind(this));
};

Chickens.prototype.drawChicken = function () {
  this.ctx.drawImage(this.chickenImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteFrameWidth, this.spriteFrameHeight);
};

Chickens.prototype.update = function () {
  this.ctx.fillStyle = 'red';
  this.ctx.rect(1000, 450, 20, 20);
};




