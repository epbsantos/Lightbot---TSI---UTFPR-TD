// Tile type: a box that can be lit/unlit. Extends `Box`.

export function createBadBox(params) {
  var Box = params && params.Box ? params.Box : null;
  if (!Box) throw new Error("createBadBox: missing Box");

  function Badbox(height, x, y) {
    this.badOn = false;
    this.height = height;
    this.x = x;
    this.y = y;
    this.toggleBad = function() {
      if (this.badOn) {
        this.badOn = false;
      } else {
        this.badOn = true;
      }
    };
    this.reset = function() {
      this.badOn = false;
    };
  }


  Badbox.prototype = new Box();
  Badbox.prototype.constructor = Badbox;
  return Badbox;
}
