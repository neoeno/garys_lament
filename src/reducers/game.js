/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import maps from '../game/maps';
import texts from '../game/texts';
import * as Tiled from '../lib/Tiled';
import * as Game from '../lib/Game';
import * as UI from '../lib/UI';
import * as Text from '../lib/Text';

const player = Tiled.getObjectByName('Player')(maps.lounge);
const initialState = {
  x: Math.floor(player.x / maps.lounge.tilewidth),
  y: Math.floor(player.y / maps.lounge.tileheight),
  modalText: null,
  modalTextState: null,
  facing: 'south',
  map: 'lounge',
  modalState: 'HIDDEN',
  screenTransitionState: 'SHOW',
  disableMovementTweening: false,
  walking: false,
  moving: false
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case 'MOVEMENT_CONTROLS_CHANGE': {
      nextState.movementKeyPressed = action.keyState;
      return nextState;
    } break;
    case 'MOVEMENT_FINISHED': {
      nextState.moving = false;

      // if (Tiled.isPortalAtPosition(maps[nextState.map])(nextState)) {
      //   let portal = Tiled.getPortalAtPosition(maps[nextState.map])(nextState);
      //   Object.assign(nextState, Game.followPortal(maps)(state.map)(portal));
      // }

      return nextState;
    } break;
    case 'TRIGGER_MOVEMENT': {
      if (Game.isShowingModal(nextState)) { return nextState; }
      if (Game.isTeleporting(nextState)) { return nextState; }
      if (Game.isMoving(nextState)) { return nextState; }

      let movement = UI.activeKeyToMovement(nextState.movementKeyPressed);

      Object.assign(nextState, Game.faceMovementDirection(movement));
      Object.assign(nextState, Game.walkingStatus(movement));

      let targetPosition = Game.movePosition(nextState)(movement);

      if (Tiled.canWalkTo(targetPosition)(maps[nextState.map])) {
        Object.assign(nextState, Game.movingStatus(movement));
        Object.assign(nextState, targetPosition);
      } else if (Game.movementToFacing(movement) !== 'north') {
        // ^ if we're moving north we let the walk happen first
        if (Tiled.isPortalAtPosition(maps[nextState.map])(targetPosition)) {
          Object.assign(nextState, Game.followPortal(maps)(nextState)(movement));
        }
      }

      return nextState;
    } break;
    case 'TELEPORT': {
      Object.assign(nextState, Game.followPortal(maps)(state.map)(action.portal));
      return nextState;
    } break;
    case 'ACT': {
      let talker = Tiled.getFacingTalker(maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
      if (!talker) { return state; }
      let text = texts[nextState.map][talker.properties.text];
      let textMachine = Text.makeTextMachine(text);

      Object.assign(nextState, Game.stepModalStateMachine(state)(textMachine));
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
