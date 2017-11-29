$(document).ready(function () {

  var dragon;

  function startGame() {
    gameArea.start();
    dragon = new Character (40, 80, 'green', 10, 220);
  }

  var gameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
      this.canvas.width = 1000;
      this.canvas.height = 500;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      $('canvas').attr('id', 'gameArea');
    },
  };

  function Character (width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  startGame();








});  