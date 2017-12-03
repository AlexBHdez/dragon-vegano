// Variables globales para crear el canvas y insertarlo en el body con el id gameArea
var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext('2d');
document.body.insertBefore(canvas, document.body.childNodes[0]);
$('canvas').attr('id', 'gameArea');

// Constructor del juego
function Game (dragon, ctx, width, height) {
  this.width = width;
  this.height = height;
  this.counterBrocolis = 0;
  this.dragon = dragon;
  this.traps = [];
  this.chickens = [];
  this.broccolis = [];
  this.context = ctx;
  this.frameNo = 0;
  this.gameInterval = undefined;
};
// Método para los sets iniciales del juego  
Game.prototype.start = function () {
  this.dragon.flyControls();
  this.broccolisEaten = 0;
  this.gameInterval = setInterval(this.updateGameArea.bind(this), 20);
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
      if ( this.dragon.crashWith(this.traps[i])) {
        this._stop();
      } 
    }
    for (i = 0; i < this.chickens.length; i += 1) {
      if (this.dragon.crashWith(this.chickens[i])) {
        this._stop();
      }
    }
    
    this.broccolis.forEach(function (broccoli, index){
      if (this.dragon.crashWith(broccoli)) {
        
        this.broccolis.splice(index, 1);
        console.log("hit", this.broccolis)
        this.broccolisEaten += 1;
        console.log("counterBrocolis", this.broccolisEaten);
      }
    }.bind(this));
};
// Método para generar las trampas, los pollos y los brócolis
Game.prototype._trapsGenerate = function () {
    var yPosition;
    if (this.frameNo == 1 || this._frameInterval(150)) {
      yPosition = Math.floor(Math.random() * 500) - this.dragon.height;
      this.traps.push(new Obstacles(200, 20, "black", 1000, yPosition, this.context));
    }
    if (this.frameNo == 1 || this._frameInterval(200)) {
      yPosition = this.height - 20;
      this.traps.push(new Obstacles(100, 20, "yellow", 1000, yPosition, this.context));
    }
    if (this.frameNo == 1 || this._frameInterval(50)) {
      yPosition = Math.floor(Math.random() * 500) - this.dragon.height;
      this.broccolis.push(new Brocoli(20, 20, "green", 1000, yPosition, this.context));
    }
};
// Método para mover las trampas por el canvas  
Game.prototype._trapsMovement = function () {
    for (var i = 0; i < this.traps.length; i += 1) {
      this.traps[i].x += -4;
      this.traps[i].update();
    }
    for (var i = 0; i < this.chickens.length; i += 1) {
      this.chickens[i].x += -2;
      this.chickens[i].update();
    }
    for (var i = 0; i < this.broccolis.length; i += 1) {
      this.broccolis[i].x += -4;
      this.broccolis[i].update();
    }
};



// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del método start del constructor.
Game.prototype.updateGameArea = function () {
  this._proveCrash();
  
  this._clear();
  this.frameNo += 1;
  
  this._trapsGenerate();
  this._trapsMovement();
  
  this.dragon.newPos();
  this.dragon.update();
  this.dragon.limits(canvas.height);  
};

function startGame() {
  var game = new Game(
    new Character(30, 30, 'red', 100, 500, ctx),
    ctx,
    canvas.width,
    canvas.height
  );
  game.start();
}