import { StoreState } from './';
import { DealState } from './reducers/deal';
import { UserState } from './reducers/user';
import { MarketState } from './reducers/market';

export const dealSelector = (state: StoreState): DealState => state.deal;
export const marketSelector = (state: StoreState): MarketState => state.market;
export const userSelector = (state: StoreState): UserState => state.user;
