import { ActionTypes } from '../actions';

export interface AppState {
  isLoading: boolean
}

const INITIAL_STATE: AppState = {
  isLoading: false,
};

const reducer = (state: AppState = INITIAL_STATE, { type, payload }: any) => {
  switch(type) {
    case ActionTypes.SET_APP_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};

export default reducer;
