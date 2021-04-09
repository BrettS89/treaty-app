import { ActionTypes } from '../actions';
import { Deal } from '../../types/services/insurance';

export interface DealState {
  myDeals: Deal[];
  accessibleDeals: Deal[];
  dealsFollowing: Deal[];
};

const INITIAL_STATE = {
  myDeals: [],
  accessibleDeals: [],
  dealsFollowing: [],
};

const dealReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_MY_DEALS:
      return {
        ...state,
        myDeals: payload,
      };

    case ActionTypes.SET_ACCESSIBLE_DEALS:
      return {
        ...state,
        accessibleDeals: payload,
      };

    case ActionTypes.SET_DEALS_FOLLOWING:
      return {
        ...state,
        dealsFollowing: payload,
      };

    default:
      return state;
  }
};

export default dealReducer;
