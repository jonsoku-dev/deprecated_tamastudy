import React from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import PageLayoutWithNav from '../../components/PageLayoutWithNav';
import PostForm from '../../components/PostForm';
import wrapper from '../../store/configureStore';
import { loadMeRequestAction } from '../../store/actions/user/loadme.action';
import setDefaultCookie from '../../utils/setDefaultCookie';

const Create = () => (
  <PageLayoutWithNav pageName="Create Post">
    <PostForm />
  </PageLayoutWithNav>
);

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  setDefaultCookie(context);
  context.store.dispatch(loadMeRequestAction());
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Create;
