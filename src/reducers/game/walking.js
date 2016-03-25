import processMovement from './processMovement';

export default function(nextState, action) {
  switch (action.type) {
    case 'FINISH_WALKING': {
      return processMovement(nextState);
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return nextState;
    }
  }
}
