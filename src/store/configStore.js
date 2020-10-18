import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReduser/rootReducer';
import { logger } from '../utils/logger';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        logger,
      ),
    ),
  );

  return store;
}