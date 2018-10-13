import { combineReducers, createStore } from 'redux';
import pageReducer  from './Page/reducer';
import configureMiddleware from './middleware';

import { IPageState } from '../interfaces';

export interface IRootState {
  page: IPageState;
}

export const rootReducer = combineReducers<IRootState>({
  page: pageReducer
});

export function configureStore(initialState?: IRootState) {
  const middleware = configureMiddleware();

  const store = initialState
    ? createStore(rootReducer, initialState, middleware)
    : createStore(rootReducer, middleware);

    return store;
}
