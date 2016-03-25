import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';
import * as UI from '../../lib/UI';

export default function(nextState) {
  let movement = UI.activeKeyToMovement(nextState.movementKeyPressed);
  if (movement.x == 0 && movement.y == 0) {
    nextState.gameState = 'STANDING';
    nextState.walking = false;
  } else {
    let targetPosition = Game.movePosition(nextState)(movement);
    nextState.facing = Game.movementToDirection(movement);
    nextState.walking = true;

    if (Tiled.isPortalAtPosition(episodes[nextState.episode].maps[nextState.map])(targetPosition)) {
      if (Game.movementToDirection(movement) == 'north') {
        Object.assign(nextState, targetPosition);
      } else {
        nextState.screenTransitionState = 'FADE_OUT';
      }

      nextState.teleportingViaPortal = Tiled.getPortalAtPosition(episodes[nextState.episode].maps[nextState.map])(targetPosition);
      nextState.gameState = 'TELEPORTING';

    } else if (Tiled.canWalkTo(targetPosition)(episodes[nextState.episode].maps[nextState.map])) {
      Object.assign(nextState, targetPosition);
      nextState.gameState = 'WALKING';
    } else {
      nextState.gameState = 'STANDING';
    }
  }

  return nextState;
}
