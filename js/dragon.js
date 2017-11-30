// Defino las propiedades básicas del personaje.
function Character(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.speedY = 0;

  this.gravity = 0.8;
  this.gravitySpeed = 0;
  this.bounce = 0.6;
}

// Dibujo el personaje -> updateGameArea
Character.prototype.update = function () {
  ctx = gameArea.context;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

// Añadimos la gravedad a la posición del personaje -> updateGameArea
Character.prototype.newPos = function () {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
};

// Ponemos límites de suelo y techo y añadimos el rebote (que sólo debería existir cuando muera)
Character.prototype.limits = function () {
  var floor = gameArea.canvas.height - this.height;
  var roof = gameArea.canvas.height - gameArea.canvas.height;
  
  if (this.y > floor) {
    this.y = floor;
    this.gravitySpeed = -(this.gravitySpeed * this.bounce);
  }
  if (this.y < roof) {
    this.y = roof;
  }
};

// Asignamos la tecla 'espacio' para cambiar la gravedad y volar!!
Character.prototype.flyControls = function () {
  document.onkeydown = function (e) {
    
    switch (e.keyCode) {
      case 32:
        if(this.y > 0) {
          this.gravity = -0.8;
        } 
        else {
            this.gravity = 0.8;
            this.y = 0;
        }
        break;
    }
  }.bind(this);

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      case 32:
        this.gravity = 0.8;
        break;
    }
  }.bind(this);
};