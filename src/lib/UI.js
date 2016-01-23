import key from 'key';

export let isMovementKey = keycode => {
  return key.is(key.code.arrow.up, keycode)
    || key.is(key.code.arrow.right, keycode)
    || key.is(key.code.arrow.down, keycode)
    || key.is(key.code.arrow.left, keycode);
};

export let isActionKey = keycode => {
  return key.is(key.code.special.space, keycode) || key.is(key.code.special.enter, keycode);
};

export let keyToMovement = keycode => {
  if (key.is(key.code.arrow.up, keycode)) {
    return {x: 0, y: -1};
  } else if (key.is(key.code.arrow.right, keycode)) {
    return {x: 1, y: 0};
  } else if (key.is(key.code.arrow.down, keycode)) {
    return {x: 0, y: 1};
  } else if (key.is(key.code.arrow.left, keycode)) {
    return {x: -1, y: 0};
  }
};

export let activeKeyToMovement = activeKey => {
  if (activeKey === key.code.arrow.up.code) {
    return {x: 0, y: -1};
  } else if (activeKey === key.code.arrow.right.code) {
    return {x: 1, y: 0};
  } else if (activeKey === key.code.arrow.down.code) {
    return {x: 0, y: 1};
  } else if (activeKey === key.code.arrow.left.code) {
    return {x: -1, y: 0};
  } else {
    return {x: 0, y: 0};
  }
};
