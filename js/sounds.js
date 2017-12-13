function Sounds(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// Sounds.prototype.play = function () {
//   this.sound.play();
// };

// Sounds.prototype.stop = function () {
//   this.sounds.pause();
// };


// function sound(src) {
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function () {
//     this.sound.play();
//   }
//   this.stop = function () {
//     this.sound.pause();
//   }
// } 