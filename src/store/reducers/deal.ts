import { ActionTypes } from '../actions';
import { Deal } from '../../types/services/insurance';

export interface DealState {
  myDeals: Deal[];
  accessibleDeals: Deal[];
};

const INITIAL_STATE = {
  myDeals: [],
  accessibleDeals: [],
};

const dealReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_MY_DEALS:
      return {
        ...state,
        myDeals: payload,
      };

    default:
      return state;
  }
};

export default dealReducer;
