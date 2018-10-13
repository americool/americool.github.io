import { IPageState } from '../../interfaces';
import { deleteItemFromHash } from '../../utilities';
import { ActionKeys, ActionTypes } from './actions';


import { uniqueId } from 'lodash';

export const initialState = {
  objects: {}
};

export default function reducer(state: IPageState = initialState, action: ActionTypes): IPageState {
  switch (action.type) {
    case ActionKeys.AddObject:
      return { ...state, objects: { ...state.objects, [uniqueId()]: action.payload } }
    case ActionKeys.DeleteObject:
      return { ...state, objects: deleteItemFromHash(state.objects, (state.currentObject as string)) }
    case ActionKeys.EditObject:
      return {
        ...state,
        objects: { ...state.objects, [(state.currentObject as string)]: {...state.objects[(state.currentObject as string)],
          layout: action.payload } },
        currentObject: undefined
      }
    case ActionKeys.SetObject:
      return { ...state, currentObject: action.payload }
    default:
      return state;
    }
  }
