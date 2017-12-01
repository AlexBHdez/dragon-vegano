$(document).ready(function () {
  // Inicia el juego
  startGame();
  // Llama a la función de actualización, que a su vez es ejecutada cada setInterval del gameArea
  updateGameArea();
});