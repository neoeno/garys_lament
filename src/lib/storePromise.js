import { isMatch } from 'lodash';

export default store => match => {
  return new Promise(resolve => {
    let unsubscribe = store.subscribe(() => {
      if (isMatch(store.getState().game, match)) {
        unsubscribe();
        resolve();
      }
    });
  });
};
