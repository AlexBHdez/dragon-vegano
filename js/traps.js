// Defino las propiedades básicas de las trampas.
function Traps(x, y, ctx, width, height, imagesrc) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;

  this.spriteWidth = width;
  this.spriteHeight = height;
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
  this.trapImage = new Image();
  this.trapImage.src = imagesrc;
}  

// Dibujo la trampa -> updateGameArea
Traps.prototype.updateFrame = function () {
  this.frameInterval = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.srcX = this.currentFrame * this.spriteFrameWidth;  
  }.bind(this), 30);
};

Traps.prototype.drawTrap = function () {
  this.ctx.drawImage(this.trapImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
};


