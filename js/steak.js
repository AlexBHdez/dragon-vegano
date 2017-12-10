function Steaks(x, y, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;

  this.spriteWidth = 530;
  this.spriteHeight = 50;
  this.spriteRows = 1;
  this.spriteColums = 4;
  this.spriteWalk = 1;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColums;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.frameCount = 4;
  this.walk = true;
  this.characterImage = new Image();
  this.characterImage.src = 'assets/steak-530x50.png';
}

Steaks.prototype.updateFrame = function () {
  this.frameInterval = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.srcX = this.currentFrame * this.spriteFrameWidth;
  }.bind(this), 30);
};

Steaks.prototype.drawSteak = function () {
  this.ctx.drawImage(this.characterImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteFrameWidth, this.spriteFrameHeight);
};

Steaks.prototype.crashWith = function (otherComponent) {
  var myLeft = this.x;
  var myRight = this.x + this.spriteFrameWidth;
  var myTop = this.y;
  var myBottom = this.y + this.spriteFrameHeight;

  var otherLeft = otherComponent.x;
  var otherRight = otherComponent.x + (otherComponent.width);
  var otherTop = otherComponent.y;
  var otherBottom = otherComponent.y + (otherComponent.height);

  var crash = true;

  if (myBottom < otherTop || myTop > otherBottom || myRight < otherLeft || myLeft > otherRight) {
    crash = false;
  }
  return crash;
};