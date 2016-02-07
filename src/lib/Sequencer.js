import movementIntentSequence from '../sequences/movementIntentSequence';

let intercepts = {
  'TRIGGER_MOVEMENT': movementIntentSequence
};

export default store => {
  let fakeStore = {
    subscribe: store.subscribe,
    getState: store.getState,
    dispatch: action => {
      if (intercepts[action.type]) {
        intercepts[action.type](fakeStore)(action);
      } else {
        store.dispatch(action);
      }
    }
  };
  return fakeStore;
};
