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
      const id = uniqueId();
      return { ...state, objects: { ...state.objects, [id]: action.payload }, currentObject: id }
    case ActionKeys.DeleteObject:
      return { ...state,
        currentObject: undefined,
        objects: deleteItemFromHash(state.objects, (state.currentObject as string)) }
    case ActionKeys.EditObject:
      return {
        ...state,
        objects: { ...state.objects, [(state.currentObject as string)]: {...state.objects[(state.currentObject as string)],
          layout: action.payload } },
      }
    case ActionKeys.SetObject:
      return { ...state, currentObject: action.payload }
    default:
      return state;
    }
  }
