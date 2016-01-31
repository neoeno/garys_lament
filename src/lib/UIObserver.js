import key from 'key';
import Rx from 'rx';

import movementControlsChange from '../actions/game/movementControlsChange';
import triggerMovement from '../actions/game/triggerMovement';
import act from '../actions/game/act';

const ARROWS = key.code.arrow;
const ACTIONS = {
  space: key.code.special.space,
  enter: key.code.special.enter
};

export let observe = dom => dispatch => {
  let arrowStatus = {
    [ARROWS.up.code]: 0,
    [ARROWS.right.code]: 0,
    [ARROWS.down.code]: 0,
    [ARROWS.left.code]: 0
  };

  let arrayify = (a) => Array.isArray(a) ? a : [a];

  let eventStreamForKeyCode = eventName => keyCodes => {
    return Rx.Observable
      .fromEvent(dom, eventName)
      .filter((evt) => !evt.repeat)
      .pluck('keyCode')
      .filter(code => arrayify(keyCodes).indexOf(code) !== -1);
  };

  let keyStateStream = keyCode => {
    return eventStreamForKeyCode('keydown')(keyCode)
      .map(() => 1)
      .merge(eventStreamForKeyCode('keyup')(keyCode)
        .map(() => 0))
      .distinctUntilChanged();
  };

  let keysStatusStream = keys => {
    return eventStreamForKeyCode('keydown')(keys)
      .map((code) => ({[code]: 1}))
      .merge(
        eventStreamForKeyCode('keyup')(keys)
          .map((code) => ({[code]: 0})))
      .scan((memo, o) => Object.assign(memo, o), arrowStatus);
  };

  let keyDownStream = keyCodes => {
    let keyDown = keyCode => keyStateStream(keyCode).filter((a) => a).map(() => keyCode);
    return keyCodes
      .reduce((observable, keyCode) => observable.merge(keyDown(keyCode)), keyDown(keyCodes.pop()));
  };

  let actionKeyStateStream = keyStateStream(ACTIONS.space.code)
    .merge(keyStateStream(ACTIONS.enter.code))
    .distinctUntilChanged()
    .filter((status) => status);

  actionKeyStateStream.subscribe((controlsStatus) => dispatch(act(controlsStatus)));

  let arrowStateStream = keyDownStream([ARROWS.up.code, ARROWS.right.code, ARROWS.down.code, ARROWS.left.code])
    .combineLatest(keysStatusStream([ARROWS.up.code, ARROWS.right.code, ARROWS.down.code, ARROWS.left.code]));

  // This bit is ugly as hell but my Rx abilities aren't enough to conver it yet
  // We'll get there. It does have the correct behaviour (almost) now, though.

  arrowStateStream.subscribe((state) => {
    let key = state[1][state[0]] ? state[0] : null;
    dispatch(movementControlsChange(key));
    dispatch(triggerMovement());
  });
};
