export interface AnyAction {
  type: string;
  payload?: any;
}

export const ActionTypes = {
  CREATE_DEAL: 'CREATE_DEAL',
  CLOSE_SNACKBAR: 'CLOSE_SNACKBAR',
  GET_MY_DEALS: 'GET_MY_DEALS',
  SET_APP_LOADING: 'SET_APP_LOADING',
  SET_APP_ERROR: 'SET_APP_ERROR',
  SET_USER: 'SET_USER',
  TOGGLE_DEAL_MODAL: 'TOGGLE_DEAL_MODAL',
  SET_MY_DEALS: 'SET_MY_DEALS',
};
