function Character(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedY = 0;
  this.color = color;

  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.bounce = 0.6;
}

Character.prototype.update = function () {
  // Dibujo el personaje -> updateGameArea
  ctx = gameArea.context;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Character.prototype.newPos = function () {
  // Propiedades de velocidad de X e Y (gravedad) -> updateGameArea
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
};

Character.prototype.limits = function () {
  var floor = gameArea.canvas.height - this.height;
  
  if (this.y > floor) {
    this.y = floor;
    this.gravitySpeed = -(this.gravitySpeed * this.bounce);
  }
  if (this.y < 0) {
    this.y = 0;
  }
};

Character.prototype.fly = function () {
  document.onkeydown = function (e) {
    
    switch (e.keyCode) {
      case 32:
        if(this.y > 0) {
          this.gravity = -0.2;
        } 
        else {
            this.gravity = 0.1;
            this.y = 0;
        }
        break;
    }
  }.bind(this);

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      case 32:
        this.gravity = 0.1;
        break;
    }
  }.bind(this);
};