import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { baseURL } from '../../config';

// sagas
import userSaga from './user.saga';
import postSaga from './post.saga';
import commentSaga from './comment.saga';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(commentSaga),
  ]);
}
