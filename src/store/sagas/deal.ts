import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { dealSelector, userSelector } from '../selectors';
import { ActionTypes } from '../actions';
import app from '../../feathers';
import _, { update } from 'lodash';

export default [
  createDealWatcher,
  brokerGetMyDealsWatcher,
  editDealWatcher,
  editDetailWatcher,
  searchDealWatcher,
  getDealsFollowingWatcher,
  followDealWatcher,
  unfollowDealWatcher,
];

function * createDealWatcher() {
  yield takeLatest(ActionTypes.CREATE_DEAL, createDealHandler);
}

function * brokerGetMyDealsWatcher() {
  yield takeLatest(ActionTypes.GET_MY_DEALS, brokerGetMyDealsHandler);
}

function * editDealWatcher() {
  yield takeLatest(ActionTypes.EDIT_DEAL, editDealHandler);
}

function * editDetailWatcher() {
  yield takeLatest(ActionTypes.EDIT_DETAIL, editDetailHandler);
}

function * searchDealWatcher() {
  yield takeLatest(ActionTypes.SEARCH_DEALS, searchDealsHandler);
}

function * getDealsFollowingWatcher() {
  yield takeLatest(ActionTypes.GET_DEALS_FOLLOWING, getDealsFollowingHandler);
}

function * followDealWatcher() {
  yield takeLatest(ActionTypes.FOLLOW_DEAL, followDealHandler);
}

function * unfollowDealWatcher() {
  yield takeLatest(ActionTypes.UNFOLLOW_DEAL, unfollowDealHandler);
}

interface CreateDealHandlerProps { 
  payload: { 
    data: {
      user_id: string;
      account_id: string;
      title: string ;
    },
    navigate(path: string): void;
    setComponent(): void;
  },
  type: string,
}

function * createDealHandler({ payload: { data, navigate, setComponent } }: CreateDealHandlerProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const createDeal = () => app.service('insurance/deal').create(data, { query: { $resolve: { details: true } }})
    const deal = yield call(createDeal);
    const dealState = yield select(dealSelector);
    const myDealsClone = _.cloneDeep(dealState.myDeals);
    const newMyDeals = [deal, ...myDealsClone]
    yield put({ type: ActionTypes.SET_MY_DEALS, payload: newMyDeals });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.TOGGLE_DEAL_MODAL, payload: false });
    setComponent();
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
        $resolve: { details: true },
      },
    };
    
    const getDeals = () => app.service('insurance/deal').find(query);
    const deals = yield call(getDeals);
    yield put({ type: ActionTypes.SET_MY_DEALS, payload: deals.data });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

interface EditDealHandlerProps { 
  payload: {
    _id: string;
    data: Record<string, any>;
  };
  type: 'EDIT_DEAL';
}

function * editDealHandler ({ payload:{ _id, data } }: EditDealHandlerProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const editDeal = () => app.service('insurance/deal').patch(_id, data, { query: { $resolve: { details: true } }});
    const deal = yield call(editDeal);
    const dealState = yield select(dealSelector);
    const myDealsClone = _.cloneDeep(dealState.myDeals);

    const updatedDeals = myDealsClone.map(d =>
      d._id === deal._id
        ? deal
        : d
    );

    yield put({ type: ActionTypes.SET_MY_DEALS, payload: updatedDeals });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

interface EditDetailHandlerProps {
  type: 'EDIT_DETAIL';
  payload: {
    _id: string;
    data: Record<string, any>;
  }
}

function * editDetailHandler ({ payload: { _id, data } }: EditDetailHandlerProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const fn = () => app.service('insurance/detail').patch(_id, data);
    const detail = yield call(fn)
    const dealState = yield select(dealSelector);
    const myDealsClone = _.cloneDeep(dealState.myDeals);

    const updatedDeals = myDealsClone.map(deal => {
      if (deal._id === detail.deal_id) {
        const details = deal.details.map(d => {
          return d._id === detail._id
            ? detail
            : d;
        });
        return {
          ...deal,
          details,
        };
      }
      return deal;
    });

    yield put({ type: ActionTypes.SET_MY_DEALS, payload: updatedDeals });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface SearchDealsProps {
  type: string;
  payload: {
    account_id: string
  }
}

function * searchDealsHandler({ payload: { account_id } }: SearchDealsProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const query = {
      query: {
        account_id,
        $resolve: { deal: true },
        $sort: { createdAt: -1 },
      },
    };
    const fn = () => app.service('insurance/access').find(query);
    const deals = yield call(fn);
    const dealState = yield select(dealSelector);
    yield put({ type: ActionTypes.SET_ACCESSIBLE_DEALS, payload: [...dealState.accessibleDeals, ...deals.data] });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface GetDealsFollowingProps {
  type: string;
  payload: {
    user_id: string;
  }
}

function * getDealsFollowingHandler({ payload: { user_id } }: GetDealsFollowingProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const query = {
      query: {
        user_id,
        $resolve: { deal: true },
        $sort: { createdAt: -1 },
      },
    };
    const fn = () => app.service('insurance/following').find(query);
    const deals = yield call(fn);
    const dealState = yield select(dealSelector);
    yield put({ type: ActionTypes.SET_DEALS_FOLLOWING, payload: [...dealState.dealsFollowing, ...deals.data] });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface FollowDealHandlerProps {
  type: string;
  payload: string;
}

function * followDealHandler({ payload }: FollowDealHandlerProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const fn = () => app.service('insurance/following').create({
      deal_id: payload,
    });
    yield call(fn);
    const dealState = yield select(dealSelector);
    const deal = dealState.accessibleDeals.find(d => d._id === payload);
    const updatedFollowing = [...dealState.dealsFollowing, deal];
    yield put({ type: ActionTypes.SET_DEALS_FOLLOWING, payload: updatedFollowing });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface UnfollowDealHandlerProps {
  type: string;
  payload: string;
}

function * unfollowDealHandler({ payload }: UnfollowDealHandlerProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const user = yield select(userSelector);
    const followingFn = () => app.service('insurance/following').find({
      user_id: user._id,
      deal_id: payload,
    });
    const { data } = yield call(followingFn);
    const fn = () => app.service('insurance/following').remove(data[0]._id);
    yield call(fn);
    const dealState = yield select(dealSelector);
    const updatedFollowing = dealState.dealsFollowing.filter(d => d._id !== payload);
    yield put({ type: ActionTypes.SET_DEALS_FOLLOWING, payload: updatedFollowing });
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}
