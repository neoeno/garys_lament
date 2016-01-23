const redux = require('redux');
const thunk = require('redux-thunk');
const reducers = require('../reducers');

module.exports = function(initialState) {
  const createStoreWithMiddleware = redux.applyMiddleware(
    thunk
  )(redux.createStore);

  const store = createStoreWithMiddleware(reducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
