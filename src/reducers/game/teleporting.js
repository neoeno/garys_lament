import * as Game from '../../lib/Game';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      switch(nextState.gameStateTick) {
        case 16: {
          let [x, y] = nextState.teleportingViaPortal.properties.position.split(',').map(s => parseInt(s));
          nextState.screenTransitionState = 'HIDE';
          nextState.map = nextState.teleportingViaPortal.properties.map;
          Object.assign(nextState, {x, y});
          nextState.facing = nextState.teleportingViaPortal.properties.facing;
          nextState.screenTransitionState = 'FADE_IN';
        } break;
        case 32: {
          nextState.screenTransitionState = 'SHOW';

          if (nextState.teleportingViaPortal.properties.walk == 'true') {
            let secondaryMovement = Game.directionToMovement(nextState.teleportingViaPortal.properties.facing);
            let secondaryTargetPosition = Game.movePosition(nextState)(secondaryMovement);
            Object.assign(nextState, Game.transitionGameState('WALKING'));
            Object.assign(nextState, secondaryTargetPosition);
          } else {
            Object.assign(nextState, Game.transitionGameState('STANDING'));
          }
        }
      }

      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return nextState;
    }
  }
}
