
var dragon;
var trampaArray = [];
var pollosArray = [];
var brocoliArray = [];

// Función para empezar el juego e insertar el personaje
function startGame () {
  dragon = new Character(30, 30, 'red', 100, 500);
  gameArea.start();
}

// Define el área de juego y la inserta en el body.
var gameArea = {
  counterBrocolis: 0,
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    $('canvas').attr('id', 'gameArea');

    this.frameNo = 0;
    dragon.flyControls();
    this.counterBrocolis = 0;
    
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
    for (i = 0; i < trampaArray.length; i += 1) {
      if (dragon.crashWith(trampaArray[i])) {
        gameArea.stop();
      } 
    }
    for (i = 0; i < pollosArray.length; i += 1) {
      if (dragon.crashWith(pollosArray[i])) {
        gameArea.stop();
      }
    }
    // for (i = 0; i < brocoliArray.length; i += 1) {
    //   if (dragon.crashWith(brocoliArray[i])) {
    //     brocoliArray.splice(brocoliArray[i], 1);
    //     gameArea.counterBrocolis++;
    //     console.log(gameArea.counterBrocolis);
    //   }
    // }
    brocoliArray.forEach(function (brocoli, index){
      console.log("counterBrocolis: ", this.counterBrocolis)
      if (dragon.crashWith(brocoli)) {
        
        brocoliArray.splice(index, 1);
        
        console.log("hit", brocoliArray)
        this.counterBrocolis += 1;
        // console.log(gameArea.counterBrocolis);
      }
    });
  },
  trampasGenerate: function () {
    var yPosition;
    if (gameArea.frameNo == 1 || gameArea.frameInterval(150)) {
      yPosition = Math.floor(Math.random() * 500) - dragon.height;
      trampaArray.push(new Obstacles(200, 20, "black", 1000, yPosition));
    }
    if (gameArea.frameNo == 1 || gameArea.frameInterval(200)) {
      yPosition = gameArea.canvas.height - 20;
      trampaArray.push(new Obstacles(100, 20, "yellow", 1000, yPosition));
    }
    if (gameArea.frameNo == 1 || gameArea.frameInterval(50)) {
      yPosition = Math.floor(Math.random() * 500) - dragon.height;
      brocoliArray.push(new Brocoli(20, 20, "green", 1000, yPosition));
    }
  },
  trampasMove: function () {
    for (i = 0; i < trampaArray.length; i += 1) {
      trampaArray[i].x += -4;
      trampaArray[i].update();
    }
    for (i = 0; i < pollosArray.length; i += 1) {
      pollosArray[i].x += -2;
      pollosArray[i].update();
    }
    for (i = 0; i < brocoliArray.length; i += 1) {
      brocoliArray[i].x += -4;
      brocoliArray[i].update();
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
  gameArea.trampasGenerate();
  // Movemos cada una de las trampas del array
  gameArea.trampasMove();
  // Actualizamos el movimiento del dragón
  dragon.newPos();
  dragon.update();
  dragon.limits();
}
