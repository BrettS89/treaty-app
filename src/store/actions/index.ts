export interface AnyAction {
  type: number;
  payload?: any;
}

export enum ActionTypes {
  SET_APP_LOADING,
  SET_USER,
}
