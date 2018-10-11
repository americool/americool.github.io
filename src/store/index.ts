import { combineReducers, createStore } from 'redux';
import mainReducer  from './main/reducer';
import configureMiddleware from './middleware';

import { IMainState } from '../interfaces';

export interface IRootState {
  main: IMainState;
}

export const rootReducer = combineReducers<IRootState>({
  main: mainReducer
});

export function configureStore(initialState?: IRootState) {
  const middleware = configureMiddleware();

  const store = initialState
    ? createStore(rootReducer, initialState, middleware)
    : createStore(rootReducer, middleware);

    return store;
}
