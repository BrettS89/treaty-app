import { all, fork } from 'redux-saga/effects';
import authenticationSagas from './auth';

const forkList = (sagasList: any) => sagasList.map((saga: any) => fork(saga));

export default function * root() {
  yield all([
    ...forkList(authenticationSagas),
  ]);
}
