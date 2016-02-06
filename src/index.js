import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import * as UIObserver from './lib/UIObserver';
import configureSequencer from './lib/Sequencer';

const store = configureStore();
const sequencer = configureSequencer(store);
window.sequencer = sequencer;

UIObserver.observe(window)(sequencer.dispatch);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
