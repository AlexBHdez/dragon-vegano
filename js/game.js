// Variables globales para crear el canvas y insertarlo en el body con el id gameArea
var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.body.childNodes[0]);
$('canvas').attr('id', 'gameArea');
$('canvas').attr('moz-opaque', '');

// Constructor del juego
function Game (floor, dragon, ctx, width, height) {
  this.width = width;
  this.height = height;
  this.counterBrocolis = 0;
  this.floor = floor;
  this.dragon = dragon;
  this.context = ctx;
  this.frameNo = 0;
  this.speed = 2;
  this.acceleration = 0.002;
  this.gameInterval = undefined;

  // Arrays de elementos en el canvas
  this.traps = [];
  this.chickens = [];
  this.broccolis = [];

  // Para la generación de brocolis y trampas
  this.maxPosition = 50;
  this.minPosition = this.height - 100;
  this.positionRandom = 0;
  this.positionBroccoliIncrement = 0;
  this.positionChicken = this.height - 50;
}
// Método para los sets iniciales del juego  
Game.prototype.start = function () {
  this.dragon.flyControls();
  this.broccolisEaten = 0;
  this.updateGameArea();
  this.dragon.updateFrame();
};
// Método para ir vaciando el canvas  
Game.prototype._clear = function () {
  this.context.clearRect(0, 0, this.width, this.height);
};
// Método para parar el juego
Game.prototype._stop = function () {
  clearInterval(this.gameInterval);
};
// Método para generar un elemento según los frames(n) indicados
Game.prototype._frameInterval = function (n) {
  if ((this.frameNo / n) % 1 == 0) { 
    return true; 
  }
  return false;
};
// Método para las colisiones entre el dragón y los demás elementos.
Game.prototype._proveCrash = function () {
  for (i = 0; i < this.traps.length; i += 1) {
    if ( this.dragon.crashWith(this.traps[i]) ) {
      this._stop();
    } 
  }
  for (i = 0; i < this.chickens.length; i += 1) {
    if ( this.dragon.crashWith(this.chickens[i]) ) {
      this._stop();
    }
  }  
  this.broccolis.forEach(function (broccoli, index){
    if ( this.dragon.crashWith(broccoli) ) {
      this.broccolis.splice(index, 1);
      this.broccolisEaten += 1;
      console.log("counterBrocolis", this.broccolisEaten);
    }
  }.bind(this));
};
// Linea horizontal de brócolis
Game.prototype._broccolisHorizontalLine = function (quantity) {
  positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Brocoli(this.width + i * 25, positionRandom, this.context)
    );
  }
};

Game.prototype._broccolisThreeLine = function (quantity) {
  /* jshint shadow:true */
  positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
  for (var i = 0; i < (quantity / 3) + 2; i++) {
    this.broccolis.push(
      new Brocoli((this.width + i * 25) - 25, positionRandom, this.context)
    );
  }
  for (var i = 0; i < quantity / 3; i++) {
    this.broccolis.push(
      new Brocoli(this.width + i * 25, positionRandom + 25, this.context)
    );
  }
  for (var i = 0; i < quantity / 3; i++) {
    this.broccolis.push(
      new Brocoli(this.width + i * 25, positionRandom - 25, this.context)
    );
  }
};
// Linea vertical de brócolis
Game.prototype._broccolisVerticalLine = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Brocoli(this.width, this.minPosition + i * -25, this.context)
    );
  }
};
// Diagonal de brócolis hacia abajo
Game.prototype._broccolisDiagonalDown = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Brocoli(this.width + i * 25, this.maxPosition + i * 25, this.context)
    );
  }
};
// Diagonal de brócolis hacia arriba
Game.prototype._broccolisDiagonalUp = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Brocoli(this.width + i * 25, this.minPosition - i * 25, this.context)
    );
  }
};
// Generador de trampas verticales
Game.prototype._trapHorizontal = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
    this.traps.push(
      new Traps(this.width, positionRandom, this.context)
    );
  }
};
// Generador de pollos
Game.prototype._chickensRandom = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    positionRandom = Math.floor(Math.random() * (100 - 25 + 1) + 25);
    this.chickens.push(
      new Chickens(20, 20, 'yellow', this.width + i * positionRandom, this.positionChicken, this.context)
    );
  }
};
// Método para generar las trampas, los pollos y los brócolis
Game.prototype._sceneCreator = function () {
  
  if (this._frameInterval(166) && this.frameNo <= 500) { // Scene 01 -> 10"
    this._broccolisThreeLine(27);

  } else if (this._frameInterval(166) && this.frameNo <= 1000) {   // Scene 02 -> 10"
    this._trapHorizontal(1);

  } else if (this._frameInterval(250) && this.frameNo <= 1500) { // Scene 03 -> 10"
    
    
  } else if (this._frameInterval(300) && this.frameNo <= 1500) { // Scene 03.2 -> 10"
    

  } else if (this._frameInterval(250) && this.frameNo <= 2000) { // Scene 04 -> 10"
    
  } else if (this._frameInterval(250) && this.frameNo <= 2500) { // Scene 05 -> 10"
    
  } else if (this._frameInterval(250) && this.frameNo <= 3000) { // Scene 06 -> 10"
    
  } else if (this._frameInterval(50) && this.frameNo > 3500) { // Final Scene
    
  }
  
};
// Método para mover las trampas por el canvas  
Game.prototype._sceneMovement = function () {
  /* jshint shadow:true */
  for (var i = 0; i < this.traps.length; i += 1) {
    this.traps[i].x -= this.speed;
    this.traps[i].updateFrame();
    this.traps[i].drawTrap();
  }
  for (var i = 0; i < this.chickens.length; i += 1) {
    this.chickens[i].x -= this.speed;
    this.chickens[i].update();
  }
  for (var i = 0; i < this.broccolis.length; i += 1) {
    this.broccolis[i].x -= this.speed;
    this.broccolis[i].updateFrame();
    this.broccolis[i].drawTrap();
  }
  this._emptyBroccolis();
};

Game.prototype._emptyBroccolis = function () {
  this.broccolis.forEach(function (item, index, array) {
    if (item.x < -150) {
      array.splice(item, 1);
    }
  });
};

Game.prototype._emptyTraps = function () {
  this.traps.forEach(function (item, index, array) {
    if (item.x < -200) {
      array.splice(item, 1);
    }
  });
};

// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del método start del constructor.
Game.prototype.updateGameArea = function () {
  this.gameInterval = window.requestAnimationFrame(this.updateGameArea.bind(this));
  this._proveCrash();
  
  this._clear();
  this.frameNo += 1;
  this.speed += this.acceleration;
  
  this.floor.drawBackground();

  this._sceneCreator();
  this._sceneMovement();
  
  this.dragon.newPos();
  this.dragon.drawCharacter();
  this.dragon.limits(canvas.height - 25); 
};

function startGame() {
  var game = new Game(
    new Floor(ctx),
    new Character(100, 200, ctx),
    ctx,
    canvas.width,
    canvas.height
  );
  game.start();
}