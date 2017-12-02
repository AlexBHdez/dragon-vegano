// Defino las propiedas básicas del brócoli
function Brocoli(width, height, color, x, y, ctx) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.ctx = ctx;
}

// Dibujo el brócoli --> updateGameArea
Brocoli.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Brocoli.prototype.eatBrocoli = function () {
  var myLeft = this.x;
  // var myRight = this.x + (this.width);
  var myTop = this.y;
  var myBottom = this.y + (this.height);

  // var otherLeft = otherComponent.x;
  var otherRight = otherComponent.x + (otherComponent.width);
  var otherTop = otherComponent.y;
  var otherBottom = otherComponent.y + (otherComponent.height);

  var crash = true;

  if (myBottom < otherTop || myTop > otherBottom || myLeft > otherRight) {
    crash = false;
  }
  return crash;
};