import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import combinedReducer from '../reducers/combinedReducer';

const middlewares = [thunk];

export default function configureStore(initialState = {}) {
  const store = createStore(
    combinedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    module.hot.accept('../reducers/combinedReducer', () => {
      store.replaceReducer(require('../reducers/combinedReducer').default);
    });
  }
  return store;
}
