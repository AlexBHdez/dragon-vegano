var canvas = document.createElement('canvas');

canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext('2d');
// Función para empezar el juego e insertar el personaje
document.body.insertBefore(canvas, document.body.childNodes[0]);
$('canvas').attr('id', 'gameArea');

// Define el área de juego y la inserta en el body.
function Game (dragon, ctx, width, height) {
  this.width = width;
  this.height = height;
  this.counterBrocolis = 0;
  this.dragon = dragon;
  this.trampaArray = [];
  this.pollosArray = [];
  this.brocoliArray = [];
  this.context = ctx;
  this.frameNo = 0;
  this.gameInterval = undefined;
};
  
Game.prototype.start = function () {
  this.dragon.flyControls();
  this.counterBrocolis = 0;
  this.gameInterval = setInterval(this.updateGameArea.bind(this), 20);
};
  
Game.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height);
};

Game.prototype.stop = function () {
  clearInterval(this.gameInterval);
};

Game.prototype.frameInterval = function (n) {
  if ((this.frameNo / n) % 1 == 0) { 
    return true; 
  }
  return false;
};

Game.prototype.proveCrash = function () {
    for (i = 0; i < this.trampaArray.length; i += 1) {
      if ( this.dragon.crashWith(this.trampaArray[i])) {
        this.stop();
      } 
    }
    for (i = 0; i < this.pollosArray.length; i += 1) {
      if (this.dragon.crashWith(this.pollosArray[i])) {
        this.stop();
      }
    }
    
    this.brocoliArray.forEach(function (brocoli, index){
      

      if (this.dragon.crashWith(brocoli)) {
        
        this.brocoliArray.splice(index, 1);
        console.log("hit", this.brocoliArray)
        this.counterBrocolis += 1;
        console.log("counterBrocolis", this.counterBrocolis);
      }
    }.bind(this));
};

Game.prototype.trampasGenerate = function () {
    var yPosition;
    if (this.frameNo == 1 || this.frameInterval(150)) {
      yPosition = Math.floor(Math.random() * 500) - this.dragon.height;
      this.trampaArray.push(new Obstacles(200, 20, "black", 1000, yPosition, this.context));
    }
    if (this.frameNo == 1 || this.frameInterval(200)) {
      yPosition = this.height - 20;
      this.trampaArray.push(new Obstacles(100, 20, "yellow", 1000, yPosition, this.context));
    }
    if (this.frameNo == 1 || this.frameInterval(50)) {
      yPosition = Math.floor(Math.random() * 500) - this.dragon.height;
      this.brocoliArray.push(new Brocoli(20, 20, "green", 1000, yPosition, this.context));
    }
};
  
Game.prototype.trampasMove = function () {
    for (var i = 0; i < this.trampaArray.length; i += 1) {
      this.trampaArray[i].x += -4;
      this.trampaArray[i].update();
    }
    for (var i = 0; i < this.pollosArray.length; i += 1) {
      this.pollosArray[i].x += -2;
      this.pollosArray[i].update();
    }
    for (var i = 0; i < this.brocoliArray.length; i += 1) {
      this.brocoliArray[i].x += -4;
      this.brocoliArray[i].update();
    }
};



// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del gameArea.
Game.prototype.updateGameArea = function () {
  // Pasamos la colisión por cada uno de las trampas del array.
  this.proveCrash();
  // Vaciamos el canvas y aumentamos el frameNo
  this.clear();
  this.frameNo += 1;
  // Por cada n frames, añadimos una trampa al array
  this.trampasGenerate();
  // Movemos cada una de las trampas del array
  this.trampasMove();
  // Actualizamos el movimiento del dragón
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