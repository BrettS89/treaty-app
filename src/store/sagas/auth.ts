import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';

export default [
  loginWatcher,
];

function * loginWatcher() {
  yield takeLatest('PLACEHOLDER', loginHandler);
}

function * loginHandler({ payload }: { payload: any, type: any }) {
  try {
    yield 'hi';
  } catch(e) {}
}
