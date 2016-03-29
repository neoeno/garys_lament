import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';
import * as UI from '../../lib/UI';

export let moveTo = state => targetPosition => {
  return Object.assign({
    movingFromPosition: {x: state.x, y: state.y}
  }, targetPosition, Game.pushState(state)('WALKING'));
};

let followPortal = nextState => portal => {
  return Object.assign({
    teleportingViaPortal: portal
  }, Game.pushState(nextState)('TELEPORTING'));
};

export default function(nextState) {
  let movement = UI.activeKeyToMovement(nextState.movementKeyPressed);
  
  if (movement.x == 0 && movement.y == 0) {
    nextState.walking = false;
  } else {
    let targetPosition = Game.movePosition(nextState)(movement);
    nextState.facing = Game.movementToDirection(movement);
    nextState.walking = true;

    if (Tiled.isPortalAtPosition(episodes[nextState.episode].maps[nextState.map])(targetPosition)) {
      let portal = Tiled.getPortalAtPosition(episodes[nextState.episode].maps[nextState.map])(targetPosition);
      Object.assign(nextState, followPortal(nextState)(portal));

      if (Game.movementToDirection(movement) == 'north') {
        Object.assign(nextState, moveTo(nextState)(targetPosition));
      }

    } else if (Tiled.canWalkTo(targetPosition)(episodes[nextState.episode].maps[nextState.map])) {
      Object.assign(nextState, moveTo(nextState)(targetPosition));
    }
  }

  return nextState;
}
