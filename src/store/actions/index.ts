export interface AnyAction {
  type: string;
  payload?: any;
}

export const ActionTypes = {
  CREATE_DEAL: 'CREATE_DEAL',
  CLOSE_SNACKBAR: 'CLOSE_SNACKBAR',
  EDIT_DEAL: 'EDIT_DEAL',
  EDIT_TERRITORY: 'EDIT_TERRITORY',
  EDIT_DETAIL: 'EDIT_DETAIL',
  FOLLOW_DEAL: 'FOLLOW_DEAL',
  GET_MY_DEALS: 'GET_MY_DEALS',
  GET_DEALS_FOLLOWING: 'GET_DEALS_FOLLOWING',
  SET_APP_LOADING: 'SET_APP_LOADING',
  SET_APP_ERROR: 'SET_APP_ERROR',
  SET_USER: 'SET_USER',
  TOGGLE_DEAL_MODAL: 'TOGGLE_DEAL_MODAL',
  SET_MY_DEALS: 'SET_MY_DEALS',
  SEARCH_DEALS: 'SEARCH_DEALS',
  SET_ACCESSIBLE_DEALS: 'SET_ACCESSIBLE_DEALS',
  SET_DEALS_FOLLOWING: 'SET_DEALS_FOLLOWING',
  UNFOLLOW_DEAL: 'UNFOLLOW_DEAL',
  CREATE_MARKET_LIST: 'CREATE_MARKET_LIST',
  GET_MARKET_LISTS: 'GET_MARKET_LISTS',
  SET_MARKET_LISTS: 'SET_MARKET_LISTS',
  EDIT_MARKET_LIST: 'EDIT_MARKET_LIST',
  DELETE_MARKET_LIST: 'DELETE_MARKET_LIST',
  UPDATE_TIMELINE: 'UPDATE_TIMELINE',
};
