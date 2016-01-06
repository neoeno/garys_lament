/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import maps from '../game/maps';
import { getObjectByName, canWalkTo, getFacingTalker, isPortalAtPosition } from '../lib/Tiled';
import { isShowingModal, movePosition, followPortal, faceMovementDirection } from '../lib/Game';

const player = getObjectByName('Player')(maps.lounge);
const initialState = {
  x: Math.floor(player.x / maps.lounge.tilewidth),
  y: Math.floor(player.y / maps.lounge.tileheight),
  acting: false,
  showTextIndex: null,
  facing: 'south',
  map: 'lounge'
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'MOVE': {
      if (isShowingModal(state)) { return state; }

      let targetPosition = movePosition(state)(action.movement);

      if (isPortalAtPosition(maps[nextState.map])(targetPosition)) {
        Object.assign(nextState, followPortal(maps)(state)(targetPosition));
      } else if (canWalkTo(targetPosition)(maps[nextState.map])) {
        Object.assign(nextState, targetPosition);
      }

      Object.assign(nextState, faceMovementDirection(action.movement));

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
