/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import maps from '../game/maps';
import * as Tiled from '../lib/Tiled';
import * as Game from '../lib/Game';

const player = Tiled.getObjectByName('Player')(maps.lounge);
const initialState = {
  x: Math.floor(player.x / maps.lounge.tilewidth),
  y: Math.floor(player.y / maps.lounge.tileheight),
  modalTextIndex: null,
  facing: 'south',
  map: 'lounge',
  modalState: 'HIDDEN',
  screenTransitionState: 'SHOW',
  disableMovementTweening: false,
  walking: false
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case 'MOVE': {
      let targetPosition = Game.movePosition(state)(action.movement);

      if (Tiled.canWalkTo(targetPosition)(maps[nextState.map])) {
        Object.assign(nextState, targetPosition);
      }

      Object.assign(nextState, Game.faceMovementDirection(action.movement));
      Object.assign(nextState, Game.walkingStatus(action.movement));
      nextState.disableMovementTweening = false;

      return nextState;
    } break;
    case 'TELEPORT': {
      Object.assign(nextState, Game.followPortal(maps)(state.map)(action.portal));
      return nextState;
    } break;
    case 'ACT': {
      let talker = Tiled.getFacingTalker(maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
      if (!talker) { return state; }

      Object.assign(nextState, Game.stepModalStateMachine(state)(talker));
      nextState.disableMovementTweening = true;
      nextState.walking = false;

      return nextState;
    } break;
    case 'FADE_OUT': {
      Object.assign(nextState, {screenTransitionState: 'FADE_OUT'});
      return nextState;
    } break;
    case 'FADE_IN': {
      Object.assign(nextState, {screenTransitionState: 'SHOW'});
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
