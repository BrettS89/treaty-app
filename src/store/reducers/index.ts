import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import userReducer, { UserState } from './user';

export interface StoreState {
  app: AppState;
  user: UserState;
}

const reducers = combineReducers<any>({
  app: appReducer,
  user: userReducer,
});

export default reducers;
