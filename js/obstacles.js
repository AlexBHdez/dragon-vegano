// Defino las propiedades básicas de los obstáculos.
function Obstacles(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
}  

// Dibujo el obstáculo -> updateGameArea
Obstacles.prototype.update = function () {
  ctx = gameArea.context;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

// Movimiento de la trampa -> updateGameArea
Obstacles.prototype.newPos = function () {
  this.x -= 4;
};

// Definimos colisiones entre los componentes
Obstacles.prototype.crashWith = function (otherComponent) {
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