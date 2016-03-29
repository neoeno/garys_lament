import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import * as UIObserver from './lib/UIObserver';
import { tick } from './actions/game';

const store = configureStore();

UIObserver.observe(window)(store.dispatch);

let gameLoop = () => {
  store.dispatch(tick());
  window.requestAnimationFrame(gameLoop);
};
gameLoop();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
