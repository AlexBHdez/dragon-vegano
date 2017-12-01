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
};

// Dibuja el jugador y la trampa
var dragon = new Character(30, 30, 'red', 100, 500);
var trampa = new Obstacles(100, 30, 'green', 1000, 200);

// Actualiza el área de juego (canvas) cada 20ms, indicado en el setInterval del gameArea.
function updateGameArea () {

  gameArea.clear();

  dragon.newPos();
  dragon.update();
  dragon.limits();

  trampa.update();
  trampa.newPos();

  if (dragon.crashWith(trampa)) {
    gameArea.stop();
  }
}