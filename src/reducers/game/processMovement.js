import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';
import * as UI from '../../lib/UI';

export default function(nextState) {
  let movement = UI.activeKeyToMovement(nextState.movementKeyPressed);
  if (movement.x == 0 && movement.y == 0) {
    Object.assign(nextState, Game.transitionGameState('STANDING'));
    nextState.walking = false;
  } else {
    let targetPosition = Game.movePosition(nextState)(movement);
    nextState.facing = Game.movementToDirection(movement);
    nextState.walking = true;

    if (Tiled.isPortalAtPosition(episodes[nextState.episode].maps[nextState.map])(targetPosition)) {
      if (Game.movementToDirection(movement) == 'north') {
        nextState.movingFromPosition = {x: nextState.x, y: nextState.y};
        Object.assign(nextState, targetPosition);
      } else {
        nextState.screenTransitionState = 'FADE_OUT';
      }

      nextState.teleportingViaPortal = Tiled.getPortalAtPosition(episodes[nextState.episode].maps[nextState.map])(targetPosition);
      Object.assign(nextState, Game.transitionGameState('TELEPORTING'));

    } else if (Tiled.canWalkTo(targetPosition)(episodes[nextState.episode].maps[nextState.map])) {
      nextState.movingFromPosition = {x: nextState.x, y: nextState.y};
      Object.assign(nextState, targetPosition);
      Object.assign(nextState, Game.transitionGameState('WALKING'));
    } else {
      Object.assign(nextState, Game.transitionGameState('STANDING'));
    }
  }

  return nextState;
}
