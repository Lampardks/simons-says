'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store/configureStore';
import '@babel/polyfill';
import './assets/scss/main_global.scss';

window.addEventListener('unhandledrejection', event => {
  console.log(event.promise);
  console.log(event.reason);
});

const store = configureStore();
const { dispatch } = store;

document.addEventListener('app.dispatch', ({ detail = {} }) => {
  if (detail.type) {
    dispatch(detail);
  }
});

const REACT_ROOT = document.getElementById('root');

let render = () => {
  const App = require('./components/App').default;

  ReactDOM.render(<App store={store} />, REACT_ROOT);
};

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    const renderApp = render;

    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
      }
    };

    module.hot.accept('./components/App', () =>
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(REACT_ROOT);
        render();
      }),
    );
  }
}

render();
