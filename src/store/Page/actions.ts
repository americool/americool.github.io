import { ILayout, IPageObjectProps } from '../../interfaces';

export enum ActionKeys {
  AddObject = 'Page/Add',
  DeleteObject = 'Page/Delete',
  EditObject = 'Page/Edit',
  SetObject = 'Page/SetObject'
}

export type ActionTypes =
  | IAddObject
  | IDeleteObject
  | IEditObject
  | ISetObject;

export interface IAddObject {
  type: ActionKeys.AddObject
  payload: IPageObjectProps;
}

export interface IDeleteObject {
  type: ActionKeys.DeleteObject
  payload: null;
}

export interface IEditObject {
  type: ActionKeys.EditObject
  payload: ILayout;
}

export interface ISetObject {
  type: ActionKeys.SetObject
  payload: string;
}


export function addObject(object: IPageObjectProps) {
  return { payload: object, type: ActionKeys.AddObject }
}

export function deleteObject() {
  return { payload: null, type: ActionKeys.DeleteObject }
}

export function editObject(layout: ILayout) {
  return { payload: layout, type: ActionKeys.EditObject }
}

export function setCurrentObject(id: string) {
  return { payload: id, type: ActionKeys.SetObject}
}
