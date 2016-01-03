/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import flatMap from '../game/flatMap.json';
import { getObjectByName, canWalkTo, isFacingTalker } from '../lib/Tiled';

const player = getObjectByName('Player')(flatMap);
const initialState = {
  x: Math.floor(player.x / flatMap.tilewidth),
  y: Math.floor(player.y / flatMap.tileheight),
  facing: 'south'
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
    case 'MOVE_PLAYER': {
      let targetPosition = {
        x: nextState.x + action.movement.x,
        y: nextState.y + action.movement.y
      };

      if (canWalkTo(targetPosition)(flatMap)) {
        Object.assign(nextState, targetPosition);
      }

      Object.assign(nextState, {
        facing: movementToFacing(action.movement),
        acting: false
      });

      return nextState;
    } break;
    case 'ACT': {
      if (isFacingTalker(flatMap)({x: nextState.x, y: nextState.y})(nextState.facing)) {
        nextState.acting = !nextState.acting;
      }
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
