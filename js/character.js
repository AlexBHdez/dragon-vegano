// Defino las propiedades básicas del personaje.
function Character(width, height, color, x, y, ctx) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.speedY = 0;

  this.gravity = 0.8;
  this.gravitySpeed = 0;
  this.bounce = 0.6;

  this.ctx = ctx;
}

// Dibujo el personaje -> updateGameArea
Character.prototype.update = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

// Añadimos la gravedad a la posición del personaje -> updateGameArea
Character.prototype.newPos = function () {
  this.gravitySpeed += this.gravity;
  this.y += this.speedY + this.gravitySpeed;
};

// Ponemos límites de suelo y techo y añadimos el rebote (que sólo debería existir cuando muera)
Character.prototype.limits = function (height) {
  var floor = height - this.height;
  var roof = height - height;
  
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

// Definimos colisiones entre los componentes
Character.prototype.crashWith = function (otherComponent) {
  var myLeft = this.x;
  var myRight = this.x + (this.width);
  var myTop = this.y;
  var myBottom = this.y + (this.height);

  var otherLeft = otherComponent.x;
  var otherRight = otherComponent.x + (otherComponent.width);
  var otherTop = otherComponent.y;
  var otherBottom = otherComponent.y + (otherComponent.height);

  var crash = true;

  if ( myBottom < otherTop || myTop > otherBottom || myRight < otherLeft || myLeft > otherRight ) {
    crash = false;
  }
  return crash;
};