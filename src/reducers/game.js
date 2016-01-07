/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import maps from '../game/maps';
import { getObjectByName, canWalkTo, getFacingTalker, isPortalAtPosition } from '../lib/Tiled';
import { isShowingModal, movePosition, followPortal, faceMovementDirection, stepModalStateMachine } from '../lib/Game';

const player = getObjectByName('Player')(maps.lounge);
const initialState = {
  x: Math.floor(player.x / maps.lounge.tilewidth),
  y: Math.floor(player.y / maps.lounge.tileheight),
  modalTextIndex: null,
  facing: 'south',
  map: 'lounge',
  modalState: 'HIDDEN',
  animateScreen: true
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case 'MOVE': {
      if (isShowingModal(state)) { return state; }

      let targetPosition = movePosition(state)(action.movement);

      if (isPortalAtPosition(maps[nextState.map])(targetPosition)) {
        Object.assign(nextState, followPortal(maps)(state)(targetPosition));
        nextState.animateScreen = false;
      } else if (canWalkTo(targetPosition)(maps[nextState.map])) {
        Object.assign(nextState, targetPosition);
        nextState.animateScreen = true;
      }

      Object.assign(nextState, faceMovementDirection(action.movement));

      return nextState;
    } break;
    case 'ACT': {
      let talker = getFacingTalker(maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
      if (!talker) { return state; }

      Object.assign(nextState, stepModalStateMachine(state)(talker));

      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
