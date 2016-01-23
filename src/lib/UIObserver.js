import key from 'key';
import Rx from 'rx';

const ARROWS = key.code.arrow;

export let observe = dom => {
  let eventStreamForKeyCode = eventName => keyCode => {
    return Rx.Observable
             .fromEvent(dom, eventName)
             .pluck('keyCode')
             .filter(code => code === keyCode);
  };

  let keyStatus = keyCode => {
    return eventStreamForKeyCode('keydown')(keyCode)
             .map(() => 1)
             .merge(eventStreamForKeyCode('keyup')(keyCode)
                      .map(() => 0))
             .distinctUntilChanged()
             .map(status => ({[keyCode]: status}));
  };

  let arrowStatus = {
    [ARROWS.up.code]: 0,
    [ARROWS.right.code]: 0,
    [ARROWS.down.code]: 0,
    [ARROWS.left.code]: 0
  };

  keyStatus(ARROWS.up.code)
    .merge(keyStatus(ARROWS.right.code))
    .merge(keyStatus(ARROWS.down.code))
    .merge(keyStatus(ARROWS.left.code))
    .scan((memo, o) => Object.assign(memo, o), arrowStatus)
    .subscribe((status) => console.log(status));
};
