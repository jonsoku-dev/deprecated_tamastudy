import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_POST_LIST_FAIL, GET_POST_LIST_REQUEST, GET_POST_LIST_SUCCESS } from '../../type';

export const getPostListRequestAction = () => ({
  type: GET_POST_LIST_REQUEST,
});

const getPostListAPI = () => axios.get('/post/all');

export function* getPostList() {
  try {
    const result = yield call(getPostListAPI);
    yield put({
      type: GET_POST_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_POST_LIST_FAIL,
      error: err.response.data,
    });
  }
}
