// Map state checks (win condition helpers, etc.).

export function createMapState(params) {
  if (!params) throw new Error("createMapState: missing params");
  var map = params.map;
  var LightBox = params.LightBox;
  var BadBox = params.BadBox;
  if (!map) throw new Error("createMapState: missing map");
  if (!LightBox) throw new Error("createMapState: missing LightBox");
  if (!BadBox) throw new Error("createMapState: missing BadBox");

  var state = {
    allLightsOn: function() {
      for (var i = 0; i < map.getLevelSize().x; i++) {
        for (var j = 0; j < map.getLevelSize().y; j++) {
          if (map.getMapRef()[i][j] instanceof LightBox && !map.getMapRef()[i][j].lightOn) {
            return false;
          }
          if (map.getMapRef()[i][j] instanceof BadBox && map.getMapRef()[i][j].badOn) {
            return false;
          }
        }
      }
      return true;
    }
  };

  return state;
}
