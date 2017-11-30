$(document).ready(function () {
  // Inicia el juego
  gameArea.start();
  // Llama a la función de actualización, que a su vez es ejecutada cada setInterval del gameArea
  updateGameArea();
});