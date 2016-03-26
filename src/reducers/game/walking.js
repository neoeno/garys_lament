import processMovement from './processMovement';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      switch(nextState.gameStateTick) {
        case 17: {
          return processMovement(nextState);
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
