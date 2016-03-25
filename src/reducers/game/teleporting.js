import * as Game from '../../lib/Game';

export default function(nextState, action) {
  switch (action.type) {
    case 'END_FADE_OUT': {
      let [x, y] = nextState.teleportingViaPortal.properties.position.split(',').map(s => parseInt(s));
      nextState.screenTransitionState = 'HIDE';
      nextState.map = nextState.teleportingViaPortal.properties.map;
      Object.assign(nextState, {x, y});
      nextState.facing = nextState.teleportingViaPortal.properties.facing;
      nextState.screenTransitionState = 'FADE_IN';

      return nextState;
    } break;
    case 'END_FADE_IN': {
      nextState.screenTransitionState = 'SHOW';

      if (nextState.teleportingViaPortal.properties.walk == 'true') {
        let secondaryMovement = Game.directionToMovement(nextState.teleportingViaPortal.properties.facing);
        let secondaryTargetPosition = Game.movePosition(nextState)(secondaryMovement);
        nextState.gameState = 'WALKING';
        Object.assign(nextState, secondaryTargetPosition);
      } else {
        nextState.gameState = 'STANDING';
      }

      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return nextState;
    }
  }
}
