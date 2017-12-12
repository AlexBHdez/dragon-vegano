// // Defino las propiedades básicas de los obstáculos.
// function Chickens(x, y, ctx) {
//   this.x = x;
//   this.y = y;
//   this.ctx = ctx;

//   this.spriteWidth = 1040;
//   this.spriteHeight = 80;
//   this.spriteRows = 1;
//   this.spriteColumns = 9;
//   this.spriteWalk = 1;
//   this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
//   this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
//   this.currentFrame = 0;
//   this.srcX = 0;
//   this.srcY = 0;
//   this.frameCount = 9;
//   this.walk = true;
//   this.chickenImage = new Image();
//   this.chickenImage.src = 'assets/chicken-walk.png';
// }

// // Dibujo el obstáculo -> updateGameArea
// Chickens.prototype.updateFrame = function () {
//   this.currentFrame = ++this.currentFrame % this.frameCount;
//   this.srcX = this.currentFrame * this.spriteFrameWidth;
//   this.frameInterval = window.requestAnimationFrame(this.updateFrame.bind(this));
// };

// Chickens.prototype.drawChicken = function () {
//   this.ctx.drawImage(this.chickenImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteFrameWidth, this.spriteFrameHeight);
// };

// Defino las propiedades básicas de los obstáculos.
function Chickens(width, height, color, x, y, ctx) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.ctx = ctx;

  this.direction = true;
  this.speed = 3;
  this.acceleration = 0.004;
}

// Dibujo el obstáculo -> updateGameArea
Chickens.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.speed += this.acceleration;
};

// Definimos colisiones entre los componentes
Chickens.prototype.crashWith = function (otherComponent) {
  var myLeft = this.x;
  var myRight = this.x + (this.width);
  var myTop = this.y;
  var myBottom = this.y + (this.height);

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

Chickens.prototype.moveRandom = function () {
  if (this.direction == true) {
    this.x -= this.speed;
  }
};


