$(document).ready(function () {
  
  startGame();

  $('#start-screen').click(function () {
    $('#text-info').toggleClass('show-hide');
  });

  $('.fa-times-circle').click(function () {
    $('#text-info').toggleClass('show-hide');
  });

  $('#fly-again').click(function () {
    location.reload();
  });

});