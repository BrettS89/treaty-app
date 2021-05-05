import { ActionTypes } from '../actions';

export interface MarketState {
  lists: any[];
};

const INITIAL_STATE = {
  lists: [],
};

const marketReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_MARKET_LISTS:
      return {
        ...state,
        lists: payload,
      };

    default:
      return state;
  }
};

export default marketReducer;
