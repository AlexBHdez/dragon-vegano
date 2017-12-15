// Defino las propiedades básicas del personaje.
function Character(x, y, ctx) {
  
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  
  this.speedY = 0;
  this.gravity = 0.6;
  this.gravitySpeed = 0;
  this.bounce = 0.3;


  this.spriteWidth = 1860;
  this.spriteHeight = 60;
  this.spriteRows = 1;
  this.spriteColumns = 26;
  this.spriteWalk = 1;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.srcX = 0;
  this.srcY = 0;
  this.frameCount = 26;
  this.walk = true;
  this.characterImage = new Image();
  this.characterImage.src = 'assets/dragon-walk.png';
  
}
// Dibujo el personaje
Character.prototype.drawCharacter = function () {
  this.ctx.drawImage(this.characterImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteFrameWidth, this.spriteFrameHeight);
};
Character.prototype.updateFrame = function () {
  this.currentFrame = ++this.currentFrame % this.frameCount;
  this.srcX = this.currentFrame * this.spriteFrameWidth;
  this.frameInterval = window.requestAnimationFrame(this.updateFrame.bind(this));
};

Character.prototype.drawWalk = function () {
  this.spriteWidth = 1860;
  this.spriteColumns = 26;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.frameCount = 26;
  this.walk = true;
  this.characterImage.src = 'assets/dragon-walk.png';
};

Character.prototype.drawFly = function () {
  this.spriteWidth = 1086;
  this.spriteHeight = 50;
  this.spriteColumns = 11;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.currentFrame = 0;
  this.frameCount = 11;
  this.walk = true;
  this.characterImage.src = 'assets/dragon-fly.png';
};

// Añadimos la gravedad a la posición del personaje
Character.prototype.newPos = function () {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
};

// Ponemos límites de suelo y techo y añadimos el rebote (que sólo debería existir cuando muera)
Character.prototype.limits = function (height) {
  var floor = height - this.spriteFrameHeight;
  var roof = height - height;
  
  if (this.y > floor) {
    this.y = floor;
    this.gravitySpeed = -(this.gravitySpeed * this.bounce);
  }
  if (this.y < roof) {
    this.y = roof;
  }
};

// Definimos colisiones entre los componentes
Character.prototype.crashWith = function (otherComponent) {
  var myLeft = this.x;
  var myRight = this.x + this.spriteFrameWidth;
  var myTop = this.y;
  var myBottom = this.y + this.spriteFrameHeight;

  var otherLeft = otherComponent.x;
  var otherRight = otherComponent.x + (otherComponent.spriteFrameWidth);
  var otherTop = otherComponent.y;
  var otherBottom = otherComponent.y + (otherComponent.spriteFrameHeight);

  var crash = true;

  if ( myBottom < otherTop || myTop > otherBottom || myRight < otherLeft || myLeft > otherRight ) {
    crash = false;
  }
  return crash;
};