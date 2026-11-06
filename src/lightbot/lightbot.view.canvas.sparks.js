// Little sparks that burst out of a light box when it is turned on.
// `burst()` creates the sparks, `step()` moves them and `draw()` paints them on the game canvas.

var COLORS = ['#fff7ae', '#ffe545', '#ffffff', '#ffb703'];
var COUNT = 18; // sparks per burst
var LIFE = 35; // frames each spark lives (~0.6 s at 60 fps)
var GRAVITY = 0.15; // pulls the sparks down a little every frame

export function createSparks(ctx) {
  var sparks = [];

  function burst(x, y) {
    for (var i = 0; i < COUNT; i++) {
      var angle = Math.random() * Math.PI * 2; // random direction
      var speed = 1 + Math.random() * 2.5;
      sparks.push({
        x: x,
        y: y,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 2, // extra push upwards
        size: 1.5 + Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: LIFE
      });
    }
  }

  function step() {
    var alive = [];
    for (var i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      s.x += s.speedX;
      s.y += s.speedY;
      s.speedY += GRAVITY;
      s.life--;
      if (s.life > 0) alive.push(s); // drop sparks that are done
    }
    sparks = alive;
  }

  function draw() {
    for (var i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      ctx.globalAlpha = s.life / LIFE; // fades out as it gets older
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1; // restore so the rest of the game is not transparent
  }

  return { burst: burst, step: step, draw: draw };
}
