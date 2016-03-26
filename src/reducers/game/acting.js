import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';
import * as Text from '../../lib/Text';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      if (nextState.actKeyPressed) {
        nextState.actKeyPressed = false;

        let talker = Tiled.getFacingTalker(episodes[nextState.episode].maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
        if (!talker) { return nextState; }
        let text = episodes[nextState.episode].texts[nextState.map][talker.properties.text];
        let textMachine = Text.makeTextMachine(text);

        Object.assign(nextState, Game.stepModalStateMachine(nextState)(textMachine));
        if (nextState.modalState == 'HIDDEN') {
          Object.assign(nextState, Game.popState(nextState));
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
