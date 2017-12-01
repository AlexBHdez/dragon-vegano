
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
  }
};

// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del gameArea.
function updateGameArea () {
  // Pasamos la colisión por cada uno de las trampas del array.
  var x, y;
  for (i = 0; i < trampaArray.length; i += 1) {
    if (dragon.crashWith(trampaArray[i])) {
      myGameArea.stop();
      return;
    } 
  }
  // Vaciamos el canvas y aumentamos el frameNo
  gameArea.clear();
  gameArea.frameNo += 1;
  // Por cada 150 frames, añadimos una trampa al array
  if (gameArea.frameNo == 1 || gameArea.frameInterval(150)) {
    x = gameArea.canvas.width;
    y = gameArea.canvas.height - 200;
    trampaArray.push(new Obstacles(10, 200, "green", x, y));
  }
  // Movemos cada uno de las trampas del array
  for (i = 0; i < trampaArray.length; i += 1) {
    trampaArray[i].x += -1;
    trampaArray[i].update();
  }
  // Actualizamos el movimiento del dragón
  dragon.newPos();
  dragon.update();
  dragon.limits();
}
