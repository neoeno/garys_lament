import processMovement from './processMovement';
import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';
import * as Text from '../../lib/Text';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      return processMovement(nextState);
    } break;
    case 'ACT': {
      let talker = Tiled.getFacingTalker(episodes[nextState.episode].maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
      if (!talker) { return nextState; }
      let text = episodes[nextState.episode].texts[nextState.map][talker.properties.text];
      let textMachine = Text.makeTextMachine(text);

      Object.assign(nextState, Game.stepModalStateMachine(nextState)(textMachine));
      nextState.gameState = 'ACTING';

      return nextState;
    } break;
    default: {
      return nextState;
    }
  }
}
