import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { ActionTypes } from '../actions';
import app from '../../feathers';

export default [
  getMarketListsWatcher,
];

function * getMarketListsWatcher () {
  yield takeLatest(ActionTypes.GET_MARKET_LISTS, getMarketListsHandler);
}

interface GetMarketListsHandlerProps {
  type: 'GET_MARKET_LISTS';
  payload: {
    user_id: string;
  }
}

function * getMarketListsHandler ({ payload: { user_id } }: GetMarketListsHandlerProps) {
  try {
    const query = {
      user_id,
      $resolve: { markets: true },
    }
    const fn = () => app.service('insurance/market-list').find({ query });
    const lists = yield call(fn);
    yield put({ type: ActionTypes.SET_MARKET_LISTS, payload: lists.data });
  } catch(e) {}
}
