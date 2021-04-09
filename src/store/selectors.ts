import { StoreState } from './';
import { DealState } from './reducers/deal';
import { UserState } from './reducers/user';

export const dealSelector = (state: StoreState): DealState => state.deal;
export const userSelector = (state: StoreState): UserState => state.user;
