import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { dealSelector, userSelector } from '../selectors';
import { ActionTypes } from '../actions';
import app from '../../feathers';
import _ from 'lodash';

export default [
  createDealWatcher,
  brokerGetMyDealsWatcher,
];

function * createDealWatcher() {
  yield takeLatest(ActionTypes.CREATE_DEAL, createDealHandler);
}

function * brokerGetMyDealsWatcher() {
  yield takeLatest(ActionTypes.GET_MY_DEALS, brokerGetMyDealsHandler);
}

interface CreateDealHandlerProps { 
  payload: { 
    data: {
      user_id: string;
      account_id: string;
      title: string ;
    },
    navigate(path: string): void;
  },
  type: string,
}

function * createDealHandler({ payload: { data, navigate } }: CreateDealHandlerProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const createDeal = () => app.service('insurance/deal').create(data)
    const deal = yield call(createDeal);
    const dealState = yield select(dealSelector);
    const myDealsClone = _.cloneDeep(dealState.myDeals);
    const newMyDeals = [deal, ...myDealsClone]
    yield put({ type: ActionTypes.SET_MY_DEALS, payload: newMyDeals });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.TOGGLE_DEAL_MODAL, payload: false });
    navigate('/app/broker/my-deals/' + deal._id);
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

function * brokerGetMyDealsHandler() {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const userState = yield select(userSelector);
    const query = {
      query: {
        account_id: userState.details.account_id,
        user_id: userState.details._id,
        $sort: { createdAt: -1 },
        $limit: 1000,
      },
    };
    const getDeals = () => app.service('insurance/deal').find(query);
    const deals = yield call(getDeals);
    yield put({ type: ActionTypes.SET_MY_DEALS, payload: deals.data });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    console.log(e);
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}
