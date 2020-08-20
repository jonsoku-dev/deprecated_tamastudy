import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import { getPostListRequestAction } from '../../store/actions/post/getPostList.action';
import PostCard from '../../components/PostCard';
import PostListButtons from '../../components/PostListButtons';
import PageLayoutWithNav from '../../components/PageLayoutWithNav';
import wrapper from '../../store/configureStore';
import { loadMeRequestAction } from '../../store/actions/user/loadme.action';
import setDefaultCookie from '../../utils/setDefaultCookie';

const PostList = () => {
  const dispatch = useDispatch();
  const { me, loadMeDone } = useSelector((state) => state.userReducer);
  const { postList, getPostListDone, getPostListLoading } = useSelector(
    (state) => state.postReducer,
  );
  const { commentList } = useSelector((state) => state.commentReducer);

  useEffect(() => {
    dispatch(getPostListRequestAction());
  }, []);

  if (getPostListLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <PageLayoutWithNav pageName="All Posts">
      <div>
        {loadMeDone && me && <PostListButtons />}
        {getPostListDone && postList && (
          <div>
            {postList.map((post) => (
              <PostCard key={post.id} post={post} commentList={commentList} />
            ))}
          </div>
        )}
      </div>
    </PageLayoutWithNav>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  setDefaultCookie(context);
  context.store.dispatch(loadMeRequestAction());
  context.store.dispatch(getPostListRequestAction());
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default PostList;
