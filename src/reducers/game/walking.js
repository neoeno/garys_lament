import * as Game from '../../lib/Game';
import processMovement from './processMovement';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      switch(nextState.gameStateTick) {
        case 17: {
          Object.assign(nextState, Game.popState(nextState));

          if (Game.activeState(nextState) == 'STANDING') {
            return processMovement(nextState);
          } else {
            return nextState;
          }
        } break;
        default: {
          return nextState;
        }
      }
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return nextState;
    }
  }
}
