var canvasWrap = document.createElement('div');
var overlay = document.createElement('div');
var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext('2d');
$('#canvas-wrap').prepend(canvas);
var floorLimit = 25;
var pressBarToStart = false;

var startGame = function () {
  var game = new Game(
    new Backgrounds(canvas.height, ctx),
    new Character(200, canvas.height - 85, ctx),
    ctx,
    canvas.width,
    canvas.height
  );
  game.flyControls();
  game.backgrounds.drawSky();
  game.backgrounds.drawClouds();
  game.backgrounds.drawMountains();
  game.backgrounds.drawFloor();
  game.dragon.drawCharacter();
  game._shadow();
  game.music('assets/start-end-music.mp3');
  game.play();
};

// Constructor del juego
function Game (floor, dragon, ctx, width, height) {
  this.width = width;
  this.height = height;
  this.broccolisEaten = 0;
  this.backgrounds = floor;
  this.dragon = dragon;
  this.floorLimit = 25;
  this.context = ctx;
  this.frameNo = 0;
  this.speed = 2;
  this.speedSteak = 7;
  this.acceleration = 0.002;
  this.gameInterval = undefined;
  this.broccoliScore = new Broccoli(60, 35, this.context);

  // Arrays de elementos en el canvas
  this.traps = [];
  this.chickens = [];
  this.broccolis = [];
  this.steaks = [];

  // Para la generación de broccolis y trampas
  this.maxPosition = 0;
  this.minPosition = this.height - 200;
  this.positionRandom = 0;
  this.positionBroccoliIncrement = 0;
  this.positionChicken = this.height - 50;
}
// Asignamos la tecla 'espacio' para cambiar la gravedad y volar!!
Game.prototype.flyControls = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32:
        if (pressBarToStart == false) {
          pressBarToStart = true;
          this.start();
        }
        else if (this.dragon.y > 0) {
          this.dragon.gravity = -0.6;
        }
        else {
          this.dragon.gravity = 0.6;
          this.dragon.y = 0;
        }
        break;
      case 90:
        if (pressBarToStart == false) {
          this.updateGameArea();
          this.play();
          pressBarToStart = true;
        } else {
          this._pauseGame();
          pressBarToStart = false; 
        }
    }
  }.bind(this);

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      case 32:
        this.dragon.gravity = 0.6;
        break;
    }
  }.bind(this);
};

Game.prototype.dragonAnimation = function () {
  if (this.dragon.y < 400) {
    this.dragon.fly = true;
    this.dragon.walk = false;
    this.dragon.eating = false;
  } 
  else if (this.dragon.y > 300) {
    this.dragon.fly = false;
    this.dragon.walk = true;
    this.dragon.eating = false;
  }  
};
// Método para los sets iniciales del juego  
Game.prototype.start = function () {
  this._startScreen();
  this.updateGameArea();
  this.dragon.updateFrame();
  this.stopMusic();
  this._selectMusic();
  this.play();  
};
// Método para parar el juego
Game.prototype._stop = function () {
  this.stopMusic();
  this.music('assets/start-end-music.mp3');
  this.play();
  window.cancelAnimationFrame(this.gameInterval);
  this._stopScreen();
};
Game.prototype._pauseGame = function () {
  window.cancelAnimationFrame(this.gameInterval);
};
// Método para mostrar activar y desactivar la pantalla de inicio.
Game.prototype._startScreen = function () {
  $('#start-screen').toggleClass('show-hide');
};
Game.prototype._stopScreen = function () {
  $('#stop-screen').toggleClass('show-hide');
  $('#distance').text(this.distance);
  $('#broccolis').text(this.broccolisEaten);
};
// Método para ir vaciando el canvas  
Game.prototype._clear = function () {
  this.context.clearRect(0, 0, this.width, this.height);
};
// Método para generar un elemento según los frames(n) indicados
Game.prototype._frameInterval = function (n) {
  if ( (this.frameNo / n) % 1 == 0) { 
    return true; 
  }
  return false;
};
//--------------------------------------------------------------------------------------------------------------
// Linea horizontal de brócolis
Game.prototype._broccolisHorizontalLine = function (quantity) {
  positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Broccoli(this.width + i * 25, positionRandom, this.context)
    );
  }
};

Game.prototype._broccolisThreeLine = function (quantity) {
  /* jshint shadow:true */
  positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
  for (var i = 0; i < (quantity / 3) + 2; i++) {
    this.broccolis.push(
      new Broccoli((this.width + i * 25) - 25, positionRandom, this.context)
    );
  }
  for (var i = 0; i < quantity / 3; i++) {
    this.broccolis.push(
      new Broccoli(this.width + i * 25, positionRandom + 25, this.context)
    );
  }
  for (var i = 0; i < quantity / 3; i++) {
    this.broccolis.push(
      new Broccoli(this.width + i * 25, positionRandom - 25, this.context)
    );
  }
};
// Linea vertical de brócolis
Game.prototype._broccolisVerticalLine = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Broccoli(this.width, this.minPosition + i * -25, this.context)
    );
  }
};
// Diagonal de brócolis hacia abajo
Game.prototype._broccolisDiagonalDown = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Broccoli(this.width + i * 25, this.maxPosition + i * 25, this.context)
    );
  }
};
// Diagonal de brócolis hacia arriba
Game.prototype._broccolisDiagonalUp = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    this.broccolis.push(
      new Broccoli(this.width + i * 25, this.minPosition - i * 25, this.context)
    );
  }
};
// Generador de trampas verticales
Game.prototype._trapHorizontal = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
    this.traps.push(
      new Traps(this.width, positionRandom, this.context, 200, 30, 'assets/bacon-200x30.png')
    );
  }
};
// Trampa vertical
Game.prototype._trapVertical = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
    this.traps.push(
      new Traps(this.width, positionRandom, this.context, 30, 200, 'assets/bacon-30x200.png')
    );
  }
};

// Filete empanado
Game.prototype._steak = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    positionRandom = Math.floor(Math.random() * (this.maxPosition - this.minPosition + 1) + this.minPosition);
    this.steaks.push(
      new Steaks(this.width, positionRandom, this.context)
    );
  }
};
// Generador de pollos
Game.prototype._chickensRandom = function (quantity) {
  for (var i = 0; i < quantity; i++) {
    positionRandom = Math.floor(Math.random() * (100 - 25 + 1) + 25);
    this.chickens.push(
      new Chickens(this.width + i * positionRandom, this.height - 55, this.context, 'assets/chickenBig.png')
    );
  }
};

//----------------------------------------------------------------------------------------------------------------------

// Método para generar las trampas, los pollos y los brócolis
Game.prototype._sceneCreator = function () {
  
  if (this._frameInterval(166) && this.frameNo < 500) { // Scene 01 -> 10"
    if (this.randomNumber == 0) {
      this._broccolisThreeLine(27);
      this._chickensRandom(3);
    } else {
      this._broccolisHorizontalLine(12);
      this._chickensRandom(3);
    }

  } else if (this._frameInterval(125) && this.frameNo > 500 && this.frameNo <= 1000) {   // Scene 02 -> 10"
    if (this.randomNumber == 0) {
      this._trapVertical(1);
      this._chickensRandom(3);
    } else {
      this._trapHorizontal(1);
      this._chickensRandom(3);
    }  

  } else if (this._frameInterval(166) && this.frameNo > 1000 && this.frameNo <= 1500) { // Scene 03 -> 10"
    if (this.randomNumber == 0) {
      this._broccolisHorizontalLine(10);
      this._broccolisHorizontalLine(10);  
    } else {
      this._broccolisThreeLine(27);
      this._broccolisThreeLine(15);
    }
  } else if (this._frameInterval(250) && this.frameNo > 1000 && this.frameNo <= 1500) { // Scene 03.2 -> 10"
    this._steak(2);

  } else if (this._frameInterval(125) && this.frameNo > 1500 && this.frameNo <= 2000) { // Scene 04 -> 10"
    this._trapHorizontal(1);
    this._chickensRandom(4);
  } else if (this._frameInterval(233) && this.frameNo > 1500 && this.frameNo <= 2000) { // Scene 04.2 -> 10"
    this._trapVertical(1);
    this._chickensRandom(4);  

  } else if (this._frameInterval(250) && this.frameNo > 2000 && this.frameNo <= 2500) { // Scene 05 -> 10"
    if (this.randomNumber == 0) {
      this._broccolisDiagonalDown(12); 
      this._steak(3);
    } else {
      this._steak(3);
      this._broccolisDiagonalUp(12);  
    }
  } else if (this._frameInterval(275) && this.frameNo > 2000 && this.frameNo <= 2500) { // Scene 05 -> 10"
    if (this.randomNumber == 0) {
      this._steak(2);
      this._trapVertical(1);
    } else {
      this._steak(4);
      this._trapHorizontal(1);
    }

  } else if (this._frameInterval(250) && this.frameNo > 2500 && this.frameNo <= 3000) { // Scene 06 -> 10"
    if (this.randomNumber == 0) {
      this._broccolisThreeLine(27);
      this._chickensRandom(3);
    } else {
      this._broccolisHorizontalLine(12);
      this._chickensRandom(3);
    }
  } else if (this._frameInterval(250) && this.frameNo > 3000 && this.frameNo <= 3500) { // Scene 07 -> 10"
    if (this.randomNumber == 0) {
      this._broccolisDiagonalDown(12);
      this._steak(3);
    } else {
      this._broccolisDiagonalUp(12);
      this._steak(3);
    }
  
  } else if (this._frameInterval(50) && this.frameNo > 3500) { // Final Scene
      this._steak(3);
      this._chickensRandom(2);
      this._broccolisHorizontalLine(12);
      this._trapHorizontal(1);
  }
  
};
// Método para mover las trampas por el canvas  
Game.prototype._sceneMovement = function () {
  /* jshint shadow:true */
  for (var i = 0, n = this.traps.length; i < n; i += 1) {
    this.traps[i].x -= this.speed;
    this.traps[i].updateFrame();
    this.traps[i].drawTrap();
  }
  for (var i = 0, n = this.steaks.length; i < n; i += 1) {
    this.steaks[i].x -= this.speedSteak;
    this.steaks[i].updateFrame();
    this.steaks[i].drawSteak();
  }
  for (var i = 0, n = this.chickens.length; i < n; i += 1) {
    this.chickens[i].x -= this.speed;
    this.chickens[i].drawChicken();
  }
  for (var i = 0, n = this.broccolis.length; i < n; i += 1) {
    this.broccolis[i].x -= this.speed;
    this.broccolis[i].drawTrap();
  }
  for (var i = 0, n = this.broccoliScore.length; i < n; i += 1) {
    this.broccoliScore[i].updateFrame();
    this.broccoliScore[i].drawTrap();
  }
  
  this.broccoliScore.drawTrap();
  this._emptyBroccolis();
  this._emptyTraps();
  this._emptySteaks();
  
  this.backgrounds.floorX -= this.speed;
  this.backgrounds.mountainsX -= 1;
  this.backgrounds.cloudsX -= 0.5;
};

// Método para las colisiones entre el dragón y los demás elementos.
Game.prototype._proveCrash = function () {
  for (i = 0; i < this.traps.length; i += 1) {
    if (this.dragon.crashWith(this.traps[i])) {
      this._stop();
      this.stopMusic();
    }
  }
  for (i = 0; i < this.steaks.length; i += 1) {
    if (this.dragon.crashWith(this.steaks[i])) {
      this._stop();
      this.stopMusic();
    }
  }
  for (i = 0; i < this.chickens.length; i += 1){
    if (this.dragon.crashWith(this.chickens[i])) {
      this._stop();
      this.stopMusic();
    }
  }
  this.broccolis.forEach(function (broccoli, index) {
    if (this.dragon.eatingBroccolis(broccoli)) {
      this.broccolis.splice(index, 1);
      this.broccolisEaten += 1;
      this.music('assets/broccoli.mp3');
      this.play();
    }
  }.bind(this));
};

Game.prototype._emptyBroccolis = function () {
  this.broccolis.forEach(function (item, index, array) {
    if (item.x < -250) {
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

Game.prototype._emptySteaks = function () {
  this.steaks.forEach(function (item, index, array) {
    if (item.x < -100) {
      array.splice(item, 1);
    }
  });
};

// ScoreBoard ___________________________________________________
Game.prototype.scoreBroccoli = function () {
  ctx.font = '22px Bungee';
  ctx.fillStyle = '#006931';
  if (this.broccolisEaten < 10) {
    ctx.fillText('00' + this.broccolisEaten, 6, 52);
  } else if (this.broccolisEaten >= 10) {
    ctx.fillText('0' + this.broccolisEaten, 6, 52);
  } else if (this.broccolisEaten >= 100) {
    ctx.fillText(this.broccolisEaten, 6, 52);
  }
};

Game.prototype.scoreDistance = function () {
  this.distance = Math.trunc(this.speed * this.frameNo / 60);
  ctx.font = '30px Bungee';
  ctx.fillStyle = '#411e0a';
  if (this.distance < 10) {
    ctx.fillText('000' + this.distance, 5, 30);
  } else if (this.distance >= 10 && this.distance < 100) {
    ctx.fillText('00' + this.distance, 5, 30);
  } else if (this.distance >= 100 && this.distance < 1000) {
    ctx.fillText('0' + this.distance, 5, 30);
  } else if (this.distance >= 1000) {
    ctx.fillText(this.distance, 5, 30);
  }
  ctx.font = '24px Bungee';
  ctx.fillStyle = '#985c35';
  ctx.fillText('M', 91, 30);
};

Game.prototype._shadow = function () {
  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.ellipse(240, 475, 2, 25 * this.dragon.y * 0.004, 90 * Math.PI / 180, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fill();
};

Game.prototype.music = function(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  // this.sound.setAttribute('loop', '');
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.stop = function () {
    this.sound.pause();
  };
};

Game.prototype._selectMusic = function () {
  if (this.randomMusic == 0) {
    this.music('assets/54-56.mp3');
  } else if (this.randomMusic == 1) {
    this.music('assets/flymetothemoon.mp3');
  } else if (this.randomMusic == 2) {
    this.music('assets/icanfly.mp3');
  } else if (this.randomMusic == 3) {
    this.music('assets/volar.mp3');
  }
};

Game.prototype.play = function () {
  this.sound.play();
};

Game.prototype.stopMusic = function () {
  this.sound.pause();
};

//__________________________________________________________________________________________________________________________
// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del método start del constructor.
Game.prototype.updateGameArea = function () {
  this.gameInterval = window.requestAnimationFrame(this.updateGameArea.bind(this));
  this._proveCrash();
  
  this._clear();

  this.frameNo += 1;
  this.randomNumber = Math.floor(Math.random() * 2);
  this.randomMusic = Math.floor(Math.random() * 4);
  this.speed += this.acceleration;
  this.speedSteak += this.acceleration;
  
  this.backgrounds.drawSky();
  this.backgrounds.drawClouds();
  this.backgrounds.drawMountains();
  this.backgrounds.drawFloor();

  this._sceneCreator();
  this._sceneMovement();
  
  this.dragonAnimation();
  this.dragon.drawCharacter();
  this._shadow();
  this.dragon.newPos();
  this.dragon.limits(canvas.height - floorLimit);
  
  this.scoreBroccoli();
  this.scoreDistance();
}; 