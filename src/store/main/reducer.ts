import { IMainState } from '../../interfaces';
import { ActionKeys, ActionTypes } from './actions';

export const initialState = {
  test: false
};

export default function reducer(state: IMainState = initialState, action: ActionTypes): IMainState {
  switch (action.type) {
    case ActionKeys.SwitchTest:
      return { ...state, test: action.payload }
    default:
      return state;
    }
  }
