/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import flatMap from '../game/flatMap.json';
import { getObjectByName, canWalkTo } from '../lib/Tiled';

const player = getObjectByName(flatMap)('Player');
const initialState = {
  x: Math.floor(player.x / flatMap.tilewidth),
  y: Math.floor(player.y / flatMap.tileheight)
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'MOVE_PLAYER': {
      Object.assign(nextState, {
        x: nextState.x + action.movement.x,
        y: nextState.y + action.movement.y
      });

      if (!canWalkTo(flatMap)({x: nextState.x, y: nextState.y})) { return state; }

      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
