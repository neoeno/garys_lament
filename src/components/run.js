import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../stores';
import App from '../containers/App';
import * as UIObserver from '../lib/UIObserver';

const store = configureStore();

UIObserver.observe(window);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
