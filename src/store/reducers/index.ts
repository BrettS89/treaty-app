import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import dealReducer, { DealState } from './deal';
import marketReducer, { MarketState } from './market';
import userReducer, { UserState } from './user';

export interface StoreState {
  app: AppState;
  user: UserState;
  market: MarketState;
  deal: DealState,
}

const reducers = combineReducers<any>({
  app: appReducer,
  deal: dealReducer,
  market: marketReducer,
  user: userReducer,
});

export default reducers;
