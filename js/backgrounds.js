function Backgrounds(canvasHeight, ctx) {
  
  this.canvasHeight = canvasHeight;
  this.ctx = ctx;
  this.backgroundWidth = 5000;
  this.backgroundHeight = 500;

  this.floor = new Image();
  this.floor.src = 'assets/floor.png';
  this.floorX = 0;

  this.mountains = new Image();
  this.mountains.src = 'assets/mountains.png';
  this.mountainsX = 0;

  this.sky = new Image();
  this.sky.src = 'assets/sky.png';
  this.skyX = 0;

  this.clouds = new Image();
  this.clouds.src = 'assets/clouds.png';
  this.cloudsX = 0;
}

Backgrounds.prototype.drawFloor = function () {
  this.ctx.drawImage(this.floor, this.floorX, this.canvasHeight - this.backgroundHeight);
  this.ctx.drawImage(this.floor, this.floorX + this.backgroundWidth, this.canvasHeight - this.backgroundHeight);
  if (this.floorX <= -5000) {
    this.floorX = 0;
  }
};

Backgrounds.prototype.drawMountains = function () {
  this.ctx.drawImage(this.mountains, this.mountainsX, this.canvasHeight - this.backgroundHeight);
  this.ctx.drawImage(this.mountains, this.mountainsX + this.backgroundWidth, this.canvasHeight - this.backgroundHeight);
  if (this.mountainsX <= -5000) {
    this.mountainsX = 0;
  }
};

Backgrounds.prototype.drawSky = function () {
  this.ctx.drawImage(this.sky, this.skyX, this.canvasHeight - this.backgroundHeight);
  this.ctx.drawImage(this.sky, this.skyX + this.backgroundWidth, this.canvasHeight - this.backgroundHeight);
};

Backgrounds.prototype.drawClouds = function () {
  this.ctx.drawImage(this.clouds, this.cloudsX, this.canvasHeight - this.backgroundHeight);
  this.ctx.drawImage(this.clouds, this.cloudsX + this.backgroundWidth, this.canvasHeight - this.backgroundHeight);
};