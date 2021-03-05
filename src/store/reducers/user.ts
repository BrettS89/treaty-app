import { User } from '../../types/services/security';
import { ActionTypes, AnyAction } from '../actions'; 

export interface UserState {
  details: User | null;
}

const INITIAL_STATE = {
  details: null,
}

const reducer = (state = INITIAL_STATE, { type, payload }: AnyAction): UserState => {
  switch(type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        details: payload,
      }

    default:
      return state;
  }
}

export default reducer;
