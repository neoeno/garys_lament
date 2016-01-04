/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import maps from '../game/maps';
import { getObjectByName, canWalkTo, getFacingTalker, isPortalAtPosition, getPortalAtPosition, getPortalToMap } from '../lib/Tiled';

const player = getObjectByName('Player')(maps.lounge);
const initialState = {
  x: Math.floor(player.x / maps.lounge.tilewidth),
  y: Math.floor(player.y / maps.lounge.tileheight),
  acting: 0,
  showTextIndex: null,
  facing: 'south',
  map: 'lounge'
};

let movementToFacing = movement => {
  if (movement.y == -1) {
    return 'north';
  } else if (movement.x == 1) {
    return 'east';
  } else if (movement.y == 1) {
    return 'south';
  } else if (movement.x == -1) {
    return 'west';
  } else {
    return 'south';
  }
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'MOVE': {
      if (nextState.showTextIndex !== null) { return state; }

      let targetPosition = {
        x: nextState.x + action.movement.x,
        y: nextState.y + action.movement.y
      };

      if (isPortalAtPosition(maps[nextState.map])(targetPosition)) {
        let currentMap = nextState.map;
        let nextMap = getPortalAtPosition(maps[currentMap])(targetPosition).properties.portalTo;
        let {x, y} = getPortalToMap(maps[nextMap])(currentMap);
        nextState.map = nextMap;
        nextState.x = x/16;
        nextState.y = y/16;
      } else if (canWalkTo(targetPosition)(maps[nextState.map])) {
        Object.assign(nextState, targetPosition);
      }

      nextState.facing = movementToFacing(action.movement);

      return nextState;
    } break;
    case 'ACT': {
      let talker = getFacingTalker(maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);

      if (nextState.acting) {
        nextState.acting = false;
      } else {
        if (talker && talker.properties.text.split('//').length > nextState.showTextIndex) {
          nextState.acting = true;
          nextState.showTextIndex = nextState.showTextIndex + 1;
        } else {
          nextState.acting = false;
          nextState.showTextIndex = null;
        }
      }

      return nextState;
    } break;
    case 'ACT_FINISHED': {
      nextState.acting = false;
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
