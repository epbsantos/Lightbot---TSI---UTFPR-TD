// Canvas renderer + main simulation tick (60fps); drives `app.step()` and `app.draw()`.
import { launchConfetti } from "./lightbot.view.canvas.confetti.js";
import { createSparks } from "./lightbot.view.canvas.sparks.js";

export function canvasView(app, canvas) {
  var lightBot = app;
  // set the rendering context
  lightBot.ctx = canvas.getContext('2d');

  // sparks shown when a light is turned on
  var sparks = createSparks(lightBot.ctx);

  // refresh rate and rendering loop
  var fps = 60;
  var fpsDelay = 1000 / fps;
  var renderTimer = null;

  // distance between lowest point in the map and the bottom edge
  var offsetY = 100;

  // create projection
  lightBot.projection = new lightBot.Projection(canvas.height, canvas.width / 2, offsetY);

  // create canvas background pattern
  var bg = null;

  var tmp = new Image();
  tmp.src = 'img/pattern.png';
  tmp.onload = function() {
    bg = lightBot.ctx.createPattern(tmp, 'repeat');
  };

  function update() {
    // check if we can execute the next bot instruction here?
    if (lightBot.bot.isInExecutionMode() && lightBot.bot.isReadyForNextInstruction() && lightBot.bot.hasNextInstruction()) {
      var oldPos = Object.assign({}, lightBot.bot.currentPos); // copy old position
      var instruction = lightBot.bot.executeNextInstruction(); // execute the next instruction
      var newPos = lightBot.bot.currentPos; // get the new position
      lightBot.bot.animate(instruction, oldPos, newPos);
      playInstructionSfx(instruction, oldPos, newPos);
      spawnLightSparks(instruction, newPos);
      highlightInstruction(instruction);
    }
    // remove the highlight once the program stops running
    if (highlighted && !lightBot.bot.isInExecutionMode()) highlightInstruction(null);
    // check if map has been completed here
    if (lightBot.map.ready() && lightBot.map.state.allLightsOn()) {

      // stop the bot
      lightBot.bot.clearExecutionQueue();

      // award medals
      var medal = lightBot.medals.awardMedal();
      lightBot.medals.display(medal); // show medal dialog
      launchConfetti(document.getElementById('levelCompleteDialog'), getConfettiStyle(medal)); // confetti on top of the dialog

      // award achievements
      var achievements = lightBot.achievements.awardAchievements();
      lightBot.achievements.display(achievements);

      // celebrate with sound effects
      playSfx('levelComplete');
      if (achievements && achievements.length > 0) {
        setTimeout(function() { playSfx('achievement'); }, 900);
      }

      // set the map as complete
      lightBot.map.complete();

      // return to map selection screen
    }
    lightBot.step();
    lightBot.draw();
  }

  function playSfx(name) {
    var media = lightBot.ui && lightBot.ui.media;
    if (media && typeof media.playSfx === 'function') media.playSfx(name);
  }

  // Plays a sound effect matching what the instruction just did.
  function playInstructionSfx(instruction, oldPos, newPos) {
    if (!instruction) return;
    var moved = oldPos.x !== newPos.x || oldPos.y !== newPos.y;
    switch (instruction.name) {
      case 'light': {
        var tile = lightBot.map.getMapRef()[newPos.x][newPos.y];
        if (tile instanceof lightBot.LightBox) playSfx(tile.lightOn ? 'lightOn' : 'lightOff');
        break;
      }
      case 'jump':
        playSfx(moved ? 'jump' : 'bump');
        break;
      case 'walk':
        playSfx(moved ? 'walk' : 'bump');
        break;
      case 'turnLeft':
        playSfx('turnLeft');
        break;
      case 'turnRight':
        playSfx('turnRight');
        break;
      default:
        break;
    }
  }

  // Highlights the program instruction that is running now (null removes the highlight).
  var highlighted = null;
  function highlightInstruction(instruction) {
    if (highlighted) highlighted.classList.remove('lb-running');
    highlighted = instruction && instruction.element ? instruction.element : null;
    if (highlighted) {
      highlighted.classList.add('lb-running');
      highlighted.scrollIntoView({ block: 'nearest' }); // keep it visible in long programs
    }
  }

  // Picks the confetti style for the medal; level 0 is the tutorial and has no medal.
  function getConfettiStyle(medal) {
    if (Number(lightBot.map.getLevelNumber()) === 0) return 'party';
    switch (medal) {
      case lightBot.medals.gold: return 'gold';
      case lightBot.medals.silver: return 'silver';
      case lightBot.medals.bronze: return 'bronze';
      default: return 'noMedal';
    }
  }

  // Bursts sparks from the center of the top of a light box that was just turned on.
  function spawnLightSparks(instruction, pos) {
    if (!instruction || instruction.name !== 'light') return;
    var tile = lightBot.map.getMapRef()[pos.x][pos.y];
    if (!(tile instanceof lightBot.LightBox) || !tile.lightOn) return;
    var edge = tile.getEdgeLength();
    var center = lightBot.projection.project((tile.x + 0.5) * edge, tile.getHeight() * edge, (tile.y + 0.5) * edge);
    sparks.burst(center.x, center.y);
  }

  function step() {
    lightBot.bot.step();
    lightBot.map.step();
    sparks.step();
  }

  function draw() {
    //clear main canvas
    lightBot.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    lightBot.ctx.fillStyle = bg;
    lightBot.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the map and the bot in the correct order
    switch (lightBot.bot.direction) {
      case lightBot.directions.se:
        for (var i = lightBot.map.getLevelSize().x - 1; i >= 0; i--) {
          for (var j = lightBot.map.getLevelSize().y - 1; j >= 0; j--) {
            lightBot.map.getMapRef()[i][j].draw();
            if (lightBot.bot.currentPos.x === i && lightBot.bot.currentPos.y === j) {
              lightBot.bot.draw();
            }
          }
        }
        break;
      case lightBot.directions.nw:
        for (i = lightBot.map.getLevelSize().x - 1; i >= 0; i--) {
          for (j = lightBot.map.getLevelSize().y - 1; j >= 0; j--) {
            lightBot.map.getMapRef()[i][j].draw();
            switch (lightBot.bot.getAnimation().name) {
              case lightBot.bot.animations.jumpUp.name:
              case lightBot.bot.animations.jumpDown.name:
                if (lightBot.bot.getMovement().dZ !== 0 && lightBot.bot.getCurrentStep() / lightBot.bot.getAnimation().duration <= 0.5) {
                  if (lightBot.bot.currentPos.x === i && lightBot.bot.currentPos.y === j+1) {
                    lightBot.bot.draw();
                  }
                } else {
                  if (lightBot.bot.currentPos.x === i && lightBot.bot.currentPos.y === j) {
                    lightBot.bot.draw();
                  }
                }
                break;
              case lightBot.bot.animations.walk.name:
                if (lightBot.bot.getMovement().dZ !== 0 && lightBot.bot.currentPos.x === i && lightBot.bot.currentPos.y === j+1) {
                  lightBot.bot.draw();
                } else if (lightBot.bot.currentPos.x === i && lightBot.bot.currentPos.y === j) {
                  lightBot.bot.draw();
                }
                break;
              default:
                if (lightBot.bot.currentPos.x === i && lightBot.bot.currentPos.y === j) {
                  lightBot.bot.draw();
                }
                break;
            }
          }
        }
        break;
      case lightBot.directions.ne:
        for (i = lightBot.map.getLevelSize().y - 1; i >= 0; i--) {
          for (j = lightBot.map.getLevelSize().x - 1; j >= 0; j--) {
            lightBot.map.getMapRef()[j][i].draw();
            switch (lightBot.bot.getAnimation().name) {
              case lightBot.bot.animations.jumpUp.name:
              case lightBot.bot.animations.jumpDown.name:
                if (lightBot.bot.getMovement().dX !== 0 && lightBot.bot.getCurrentStep() / lightBot.bot.getAnimation().duration <= 0.5) {
                  if (lightBot.bot.currentPos.x === j+1 && lightBot.bot.currentPos.y === i) {
                    lightBot.bot.draw();
                  }
                } else {
                  if (lightBot.bot.currentPos.x === j && lightBot.bot.currentPos.y === i) {
                    lightBot.bot.draw();
                  }
                }
                break;
              case lightBot.bot.animations.walk.name:
                if (lightBot.bot.getMovement().dX !== 0 && lightBot.bot.currentPos.x === j+1 && lightBot.bot.currentPos.y === i) {
                  lightBot.bot.draw();
                } else if (lightBot.bot.currentPos.x === j && lightBot.bot.currentPos.y === i) {
                  lightBot.bot.draw();
                }
                break;
              default:
                if (lightBot.bot.currentPos.x === j && lightBot.bot.currentPos.y === i) {
                  lightBot.bot.draw();
                }
                break;
            }
          }
        }
        break;
      case lightBot.directions.sw:
        for (i = lightBot.map.getLevelSize().y - 1; i >= 0; i--) {
          for (j = lightBot.map.getLevelSize().x - 1; j >= 0; j--) {
            lightBot.map.getMapRef()[j][i].draw();
            if (lightBot.bot.currentPos.x === j && lightBot.bot.currentPos.y === i) {
              lightBot.bot.draw();
            }
          }
        }
        break;
      default:
        console.error('canvasView draw: unknown direction "' + lightBot.bot.direction + '"');
        break;
    }

    // sparks go last so they appear on top of the map and the bot
    sparks.draw();

  }


  lightBot.step = step;
  lightBot.draw = draw;

  function stop() {
    if (renderTimer == null) return;
    window.clearInterval(renderTimer);
    renderTimer = null;
  }

  function start() {
    if (renderTimer != null) return;
    renderTimer = window.setInterval(update, fpsDelay);
  }

  return {
    stop: stop,
    start: start
  };
};
