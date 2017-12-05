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
  this.speed = 3;
  this.gameInterval = undefined;
}
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
      this.broccolisEaten += 1;
      console.log("counterBrocolis", this.broccolisEaten);
    }
  }.bind(this));
};
// Método para generar las trampas, los pollos y los brócolis
Game.prototype._trapsGenerate = function () {
  var x = this.width;
  var positionChicken = this.height - 20;
  var positionY;
  var maxPosition = 50;
  var minPosition = this.height - 100;
  var positionRandom;
  var positionFixed = 150;
  
  if (this._frameInterval(250) && this.frameNo <= 500) { // Scene 01 -> 10"
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionRandom, this.context)
    );
  } else if (this._frameInterval(250) && this.frameNo <= 1000) {   // Scene 02 -> 10"
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionRandom - 22, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionRandom - 44, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionRandom - 66, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionRandom - 66, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionRandom - 44, this.context),
      new Brocoli(20, 20, "green", this.width + 132, positionRandom - 22, this.context),
      new Brocoli(20, 20, "green", this.width + 154, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 77, positionRandom - 22, this.context),
      new Brocoli(20, 20, "green", this.width + 77, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 77, positionRandom + 22, this.context),
      new Brocoli(20, 20, "green", this.width + 77, positionRandom + 44, this.context)
    );
    this.chickens.push(
      new Obstacles(20, 20, 'yellow', this.width, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 22, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 44, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 66, positionChicken, this.context)
    ); 
  } else if (this._frameInterval(250) && this.frameNo <= 1500) { // Scene 03 -> 10"
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.traps.push(
      new Obstacles(500, 10, 'black', this.width, positionRandom - 100, this.context)
    );
    
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionRandom, this.context)
    );
  } else if (this._frameInterval(250) && this.frameNo <= 2000) { // Scene 04 -> 10"
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionRandom, this.context),

      new Brocoli(20, 20, "green", this.width + 200, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 222, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 244, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 266, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 288, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 310, positionRandom, this.context),

      new Brocoli(20, 20, "green", this.width + 400, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 422, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 444, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 466, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 488, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width + 510, positionRandom, this.context)
    );
    this.traps.push(
      new Obstacles(250, 10, 'black', this.width, positionRandom - 50, this.context),
      new Obstacles(250, 10, 'black', this.width + 300, positionRandom + 50, this.context)
    );
    this.chickens.push(
      new Obstacles(20, 20, 'yellow', this.width, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 22, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 44, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 66, positionChicken, this.context)
    );
  } else if (this._frameInterval(250) && this.frameNo <= 2500) { // Scene 05 -> 10"
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionRandom, this.context),
      new Brocoli(20, 20, "green", this.width, positionRandom + 22, this.context),
      new Brocoli(20, 20, "green", this.width, positionRandom + 44, this.context),
      new Brocoli(20, 20, "green", this.width, positionRandom + 66, this.context),
      new Brocoli(20, 20, "green", this.width, positionRandom + 88, this.context),
      new Brocoli(20, 20, "green", this.width, positionRandom + 110, this.context)
    );
    this.traps.push(
      new Obstacles(10, 250, 'black', this.width + 100, positionRandom - 50, this.context)
    );
    this.chickens.push(
      new Obstacles(20, 20, 'yellow', this.width, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 22, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 80, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 120, positionChicken, this.context)
    );
  } else if (this._frameInterval(250) && this.frameNo <= 3000) { // Scene 06 -> 10"
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 200, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 222, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 244, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 266, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 288, positionFixed, this.context),
      new Brocoli(20, 20, "green", this.width + 310, positionFixed, this.context),

      new Brocoli(20, 20, "green", this.width, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 200, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 222, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 244, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 266, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 288, positionFixed + 100, this.context),
      new Brocoli(20, 20, "green", this.width + 310, positionFixed + 100, this.context),

      new Brocoli(20, 20, "green", this.width, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 22, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 44, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 66, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 88, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 110, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 200, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 222, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 244, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 266, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 288, positionFixed + 200, this.context),
      new Brocoli(20, 20, "green", this.width + 310, positionFixed + 200, this.context)
    );
    this.traps.push(
      new Obstacles(330, 10, 'black', this.width, positionRandom - 50, this.context),
      new Obstacles(330, 10, 'black', this.width, positionRandom + 50, this.context),
      new Obstacles(330, 10, 'black', this.width, positionRandom + 150, this.context),
      new Obstacles(330, 10, 'black', this.width, positionRandom + 250, this.context)
    );
    this.chickens.push(
      new Obstacles(20, 20, 'yellow', this.width, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 50, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 80, positionChicken, this.context),
      new Obstacles(20, 20, 'yellow', this.width + 140, positionChicken, this.context)
    );
  } else if (this._frameInterval(50) && this.frameNo > 3500) { // Final Scene
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.broccolis.push(
      new Brocoli(20, 20, "green", this.width, positionRandom, this.context)
    );
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.traps.push(
      new Obstacles(100, 10, 'black', this.width + 50, positionRandom, this.context)
    );
    positionRandom = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition);
    this.chickens.push(
      new Obstacles(20, 20, 'yellow', this.width + 100, positionChicken, this.context)
    );
  }
  
};
// Método para mover las trampas por el canvas  
Game.prototype._trapsMovement = function () {
  /* jshint shadow:true */
  for (var i = 0; i < this.traps.length; i += 1) {
    this.traps[i].x -= this.speed;
    this.traps[i].update();
  }
  for (var i = 0; i < this.chickens.length; i += 1) {
    this.chickens[i].x -= this.speed;
    this.chickens[i].update();
  }
  for (var i = 0; i < this.broccolis.length; i += 1) {
    this.broccolis[i].x -= this.speed;
    this.broccolis[i].update();
  }
};

// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del método start del constructor.
Game.prototype.updateGameArea = function () {
  this._proveCrash();
  
  this._clear();
  this.frameNo += 1;
  this.speed += 0.001;
  
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