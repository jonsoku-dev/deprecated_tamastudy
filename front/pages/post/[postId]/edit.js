import React from 'react';
import { END } from 'redux-saga';
import PostForm from '../../../components/PostForm';
import PageLayoutWithNav from '../../../components/PageLayoutWithNav';
import wrapper from '../../../store/configureStore';
import { loadMeRequestAction } from '../../../store/actions/user/loadme.action';
import setDefaultCookie from '../../../utils/setDefaultCookie';

const EditPost = () => (
  <PageLayoutWithNav pageName="Edit Post">
    <PostForm />
  </PageLayoutWithNav>
);

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  setDefaultCookie(context);
  context.store.dispatch(loadMeRequestAction());
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default EditPost;
