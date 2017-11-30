// Dibuja el jugador
var dragon = new Character(30, 30, 'red', 10, 200);

// Define el área de juego y la inserta en el body.
var gameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    $('canvas').attr('id', 'gameArea');
    dragon.fly();
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },  
};

// Actualiza el área de juego (canvas).
function updateGameArea () {
  gameArea.clear();
  dragon.newPos();
  dragon.update();
  dragon.limits();  
}