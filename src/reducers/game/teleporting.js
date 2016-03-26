import * as Game from '../../lib/Game';
import { moveTo } from './processMovement';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      switch(nextState.gameStateTick) {
        case 16: {
          let [x, y] = nextState.teleportingViaPortal.properties.position.split(',').map(s => parseInt(s));
          nextState.map = nextState.teleportingViaPortal.properties.map;
          Object.assign(nextState, {x, y});
          nextState.facing = nextState.teleportingViaPortal.properties.facing;
          nextState.walking = false;
        } break;
        case 44: {
          Object.assign(nextState, Game.popState(nextState));
          if (nextState.teleportingViaPortal.properties.walk == 'true') {
            let secondaryMovement = Game.directionToMovement(nextState.teleportingViaPortal.properties.facing);
            let secondaryTargetPosition = Game.movePosition(nextState)(secondaryMovement);
            nextState.walking = true;
            Object.assign(nextState, moveTo(nextState)(secondaryTargetPosition));
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
