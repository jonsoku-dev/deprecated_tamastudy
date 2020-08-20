import React from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import { loadMeRequestAction } from '../store/actions/user/loadme.action';
import setDefaultCookie from '../utils/setDefaultCookie';

const Home = () => <div>Home!!!</div>;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  setDefaultCookie(context);
  context.store.dispatch(loadMeRequestAction());
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

Home.propTypes = {};

export default Home;
