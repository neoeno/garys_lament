export let tickGameState = state => {
  return {
    gameStateTick: state.gameStateTick + 1
  };
};

export let activeState = state => state.gameState[0];

export let pushState = ({gameState}) => newState => ({gameState: [newState, ...gameState], gameStateTick: 0});

export let popState = ({gameState}) => ({gameState: gameState.slice(1), gameStateTick: 0});

export let isShowingModal = state => {
  return state.modalState !== 'HIDDEN';
};

export let isMoving = state => {
  return !!state.moving;
};

export let isControlsDisabled = state => {
  return !!state.controlsDisabled;
};

export let movePosition = ({x, y}) => movement => {
  return {
    x: x + movement.x,
    y: y + movement.y
  };
};

export let directionToMovement = facing => {
  if (facing == 'north') {
    return {y: -1, x: 0};
  } else if (facing == 'east') {
    return {y: 0, x: 1};
  } else if (facing == 'south') {
    return {y: 1, x: 0};
  } else if (facing == 'west') {
    return {y: 0, x: -1};
  }
};

export let movementToDirection = movement => {
  if (movement.y == -1) {
    return 'north';
  } else if (movement.x == 1) {
    return 'east';
  } else if (movement.y == 1) {
    return 'south';
  } else if (movement.x == -1) {
    return 'west';
  }
};

export let isMovingBlocked = state => (
  isShowingModal(state) || isMoving(state) || isControlsDisabled(state));
