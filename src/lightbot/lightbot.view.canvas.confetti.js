// Confetti celebration shown when a level is completed.
// Creates a temporary full-screen <canvas> inside `container`, animates falling
// paper pieces for a few seconds and then removes the canvas.
// The style (colors, amount and shape) changes with the medal the player earned.

var STYLES = {
  gold: {
    colors: ['#ffd700', '#ffec8b', '#f5c400', '#fff8dc'],
    pieces: 180,
    shape: 'star'
  },
  silver: {
    colors: ['#c0c0c0', '#e8e8e8', '#a9b4bd', '#ffffff'],
    pieces: 130,
    shape: 'rect'
  },
  bronze: {
    colors: ['#cd7f32', '#e3a869', '#a0522d', '#f0c08a'],
    pieces: 90,
    shape: 'rect'
  },
  noMedal: {
    colors: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c'],
    pieces: 50,
    shape: 'circle'
  },
  // used where there is no medal to show (tutorial level)
  party: {
    colors: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c'],
    pieces: 120,
    shape: 'rect'
  }
};

var DURATION = 3000; // total time in ms
var FADE_TIME = 500; // last ms where the confetti fades out

// draws a 5-point star centered on (0, 0)
function drawStar(ctx, radius) {
  ctx.beginPath();
  for (var i = 0; i < 10; i++) {
    // even points are the tips, odd points are the inner corners
    var r = i % 2 === 0 ? radius : radius / 2;
    var angle = (Math.PI / 5) * i - Math.PI / 2;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
}

export function launchConfetti(container, styleName) {
  if (!container) return;
  var style = STYLES[styleName] || STYLES.party;

  var canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none'; // clicks go through to the dialog buttons
  canvas.style.zIndex = '1000';
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  // create the paper pieces with random position, size, color, speed and spin
  var pieces = [];
  for (var i = 0; i < style.pieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5, // start above the screen at different heights
      width: 6 + Math.random() * 6,
      height: 8 + Math.random() * 8,
      color: style.colors[Math.floor(Math.random() * style.colors.length)],
      speedX: -1.5 + Math.random() * 3,
      speedY: 3 + Math.random() * 3,
      angle: Math.random() * Math.PI * 2,
      spin: -0.2 + Math.random() * 0.4
    });
  }

  var start = null;
  function frame(now) {
    if (start === null) start = now;
    var elapsed = now - start;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // fully visible at first, then fades out during the last FADE_TIME ms
    ctx.globalAlpha = Math.min(1, Math.max(0, (DURATION - elapsed) / FADE_TIME));

    for (var j = 0; j < pieces.length; j++) {
      var p = pieces[j];
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      if (style.shape === 'star') {
        drawStar(ctx, p.height * 0.7);
      } else if (style.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      }
      ctx.restore();
    }

    if (elapsed < DURATION) {
      window.requestAnimationFrame(frame);
    } else {
      canvas.remove();
    }
  }
  window.requestAnimationFrame(frame);
}
