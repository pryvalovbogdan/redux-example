import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './modules';
import { Provider } from 'react-redux';
import { configureStore } from './store/configStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById("root"));