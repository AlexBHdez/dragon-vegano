function Backgrounds(canvasHeight, ctx) {
  
  this.canvasHeight = canvasHeight;
  this.ctx = ctx;
  this.x = 0;
  this.backgroundWidth = 5000;

  this.floor = new Image();
  this.floor.src = 'assets/floor.png';
  this.floorHeight = 198;

  this.mountains = new Image();
  this.mountains.src = 'assets/mountains.png';
  this.mountainsHeight = 371;

  this.sky = new Image();
  this.sky.src = 'assets/sky.png';
  this.skyHeight = 500;
}

Backgrounds.prototype.drawBackground = function () {
  this.ctx.drawImage(this.floor, this.x, this.canvasHeight - this.floorHeight);
  this.ctx.drawImage(this.floor, this.x + this.backgroundWidth, this.canvasHeight - this.floorHeight);
  this._repeatBackground();
};

Backgrounds.prototype.drawMountains = function () {
  this.ctx.drawImage(this.mountains, this.x, this.canvasHeight - this.mountainsHeight);
  this.ctx.drawImage(this.mountains, this.x + this.backgroundWidth, this.canvasHeight - this.mountainsHeight);
  this._repeatBackground();
};

Backgrounds.prototype.drawSky = function () {
  this.ctx.drawImage(this.sky, this.x, this.canvasHeight - this.skyHeight);
  this.ctx.drawImage(this.sky, this.x + this.backgroundWidth, this.canvasHeight - this.skyHeight);
  this._repeatBackground();
};

Backgrounds.prototype._repeatBackground = function () {
  if (this.x <= -5000) {
    this.x = 0;
  }
};

Backgrounds.prototype.moveBackground = function () {

};