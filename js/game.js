
var dragon;
var trampaArray = [];

// Función para empezar el juego e insertar el personaje
function startGame () {
  dragon = new Character(30, 30, 'red', 100, 500);
  gameArea.start();
}

// Define el área de juego y la inserta en el body.
var gameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    $('canvas').attr('id', 'gameArea');

    this.frameNo = 0;
    dragon.flyControls();
    
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },  
  frameInterval: function everyinterval(n) {
  if ((gameArea.frameNo / n) % 1 == 0) { 
    return true; 
  }
    return false;
  },
  proveCrash : function () {
    var yPosition;
    for (i = 0; i < trampaArray.length; i += 1) {
      if (dragon.crashWith(trampaArray[i])) {
        myGameArea.stop();
      } 
    }
  },
  trampaGenerate: function () {
    if (gameArea.frameNo == 1 || gameArea.frameInterval(150)) {
      yPosition = Math.floor(Math.random() * 500) - dragon.height;
      trampaArray.push(new Obstacles(200, 20, "green", 1000, yPosition));
    }
  },
  trampaMove: function () {
    for (i = 0; i < trampaArray.length; i += 1) {
      trampaArray[i].x += -4;
      trampaArray[i].update();
    }
  },
};

// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del gameArea.
function updateGameArea () {
  // Pasamos la colisión por cada uno de las trampas del array.
  gameArea.proveCrash();
  // Vaciamos el canvas y aumentamos el frameNo
  gameArea.clear();
  gameArea.frameNo += 1;
  // Por cada n frames, añadimos una trampa al array
  gameArea.trampaGenerate();
  // Movemos cada una de las trampas del array
  gameArea.trampaMove();
  // Actualizamos el movimiento del dragón
  dragon.newPos();
  dragon.update();
  dragon.limits();
}
