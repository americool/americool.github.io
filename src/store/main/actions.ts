export enum ActionKeys {
  SwitchTest = 'Main/SwitchTest'
}

export type ActionTypes =
  | ISwitchTest;

export interface ISwitchTest {
  type: ActionKeys.SwitchTest
  payload: boolean;
}


export function switchTest(setting: boolean) {
  return { payload: setting, type: ActionKeys.SwitchTest }
}
