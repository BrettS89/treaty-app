export interface AnyAction {
  type: number;
  payload?: any;
}

export enum ActionTypes {
  CLOSE_SNACKBAR,
  SET_APP_LOADING,
  SET_APP_ERROR,
  SET_USER,
}
