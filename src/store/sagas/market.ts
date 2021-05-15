import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import _ from 'lodash';
import { ActionTypes } from '../actions';
import { marketSelector } from '../selectors';
import app from '../../feathers';

export default [
  getMarketListsWatcher,
  editMarketListWatcher,
  createMarketListWatcher,
  deleteMarketListWatcher,
];

function * getMarketListsWatcher () {
  yield takeLatest(ActionTypes.GET_MARKET_LISTS, getMarketListsHandler);
}

function * createMarketListWatcher () {
  yield takeLatest(ActionTypes.CREATE_MARKET_LIST, createMarketListHandler);
}


function * editMarketListWatcher () {
  yield takeLatest(ActionTypes.EDIT_MARKET_LIST, editMarketListsHandler);
}

function * deleteMarketListWatcher () {
  yield takeLatest(ActionTypes.DELETE_MARKET_LIST, deleteMarketListsHandler);
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
      $sort: { createdAt: -1 },
      $resolve: { markets: true, contact: true, contacts: true },
    }
    const fn = () => app.service('market/list').find({ query });
    const lists = yield call(fn);
    yield put({ type: ActionTypes.SET_MARKET_LISTS, payload: lists.data });
  } catch(e) {}
}

interface CreateMarketListsHandlerProps {
  type: 'CREATE_MARKET_LIST';
  payload: {
    data: Record<string, any>;
    callback(list: any): void; 
  }
}

function * createMarketListHandler ({ payload: { data, callback } }: CreateMarketListsHandlerProps) {
  try {
    const market = yield select(marketSelector);
    const lists = _.cloneDeep(market.lists);

    const fn = () => app.service('market/list').create(data, {
      query: { $resolve: { markets: true } },
    });

    const list = yield call(fn);
    const updatedLists = [list, ...lists];
    callback(list);

    yield put({ type: ActionTypes.SET_MARKET_LISTS, payload: updatedLists });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

interface EditMarketListsHandlerProps {
  type: 'EDIT_MARKET_LISTS';
  payload: {
    id: string;
    data: any;
  }
}

function * editMarketListsHandler ({ payload: { id, data } }: EditMarketListsHandlerProps) {
  try {
    const market = yield select(marketSelector);
    const lists = _.cloneDeep(market.lists);

    const fn = () => app
      .service('market/list')
      .patch(id, data, { query: { $resolve: { markets: true } } });

    const list = yield call(fn);

    const updatedLists = lists.map(l => {
      return l._id === list._id
        ? list
        : l;
    });

    yield put({ type: ActionTypes.SET_MARKET_LISTS, payload: updatedLists });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

function * deleteMarketListsHandler ({ payload }: EditMarketListsHandlerProps) {
  try {
    const market = yield select(marketSelector);
    const lists = _.cloneDeep(market.lists);

    const fn = () => app
      .service('market/list')
      .remove(payload);

    yield call(fn);

    const updatedLists = lists.filter(l => {
      return l._id !== payload;
    });

    yield put({ type: ActionTypes.SET_MARKET_LISTS, payload: updatedLists });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}
