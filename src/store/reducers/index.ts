import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import dealReducer, { DealState } from './deal';
import userReducer, { UserState } from './user';

export interface StoreState {
  app: AppState;
  user: UserState;
  deal: DealState,
}

const reducers = combineReducers<any>({
  app: appReducer,
  deal: dealReducer,
  user: userReducer,
});

export default reducers;
