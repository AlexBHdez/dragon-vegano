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
  this.fly = false;
  this.eating = false;
  this.characterImage = new Image();
  this.characterImage.src = 'assets/walk.png';
  
}
// Dibujo el personaje
Character.prototype.drawCharacter = function () {
  this.ctx.drawImage(this.characterImage, this.srcX, this.srcY, this.spriteFrameWidth, this.spriteFrameHeight, this.x, this.y, this.spriteFrameWidth, this.spriteFrameHeight);
};
Character.prototype.updateFrame = function () {
  this.currentFrame = ++this.currentFrame % this.frameCount;
  this.srcX = this.currentFrame * this.spriteFrameWidth;

  // Como falla la animación del vuelo, de momento, comento esto y dejo sólo que ande.
  // if (this.fly == true) {
  //   this.drawEating();
  // } else if (this.walk == true) {
  //   this.drawWalk();
  // }
  this.drawWalk();

  this.frameInterval = window.requestAnimationFrame(this.updateFrame.bind(this));
};

Character.prototype.drawWalk = function () {
  this.spriteWidth = 1860;
  this.spriteColumns = 26;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.frameCount = 26;
  this.characterImage.src = 'assets/walk.png';
};

Character.prototype.drawEating = function () {
  this.spriteWidth = 1056;
  this.spriteColumns = 11;
  this.spriteFrameWidth = this.spriteWidth / this.spriteColumns;
  this.spriteFrameHeight = this.spriteHeight / this.spriteRows;
  this.frameCount = 11;
  this.characterImage.src = 'assets/eating.png';
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
  var myLeft = this.x + 25;
  var myRight = this.x + this.spriteFrameWidth - 25;
  var myTop = this.y + 25;
  var myBottom = this.y + this.spriteFrameHeight - 25;

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

Character.prototype.eatingBroccolis = function (broccoli) {
  var myLeft = this.x;
  var myRight = this.x + this.spriteFrameWidth - 25;
  var myTop = this.y + 10;
  var myBottom = this.y + this.spriteFrameHeight/3;

  var broccoliLeft = broccoli.x;
  var broccoliRight = broccoli.x + (broccoli.spriteFrameWidth);
  var broccoliTop = broccoli.y;
  var broccoliBottom = broccoli.y + (broccoli.spriteFrameHeight);

  var eating = true;

  if ( myBottom < broccoliTop || myTop > broccoliBottom || myRight < broccoliLeft || myLeft > broccoliRight ) {
    eating = false;
  }
  return eating;
};