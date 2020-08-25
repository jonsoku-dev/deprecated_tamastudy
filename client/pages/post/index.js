import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { getPostListRequestAction } from '../../store/actions/post/getPostList.action';
import { AppLoading, PageLayoutWithNav } from '../../components/layouts';
import wrapper from '../../store/configureStore';
import { loadMeRequestAction } from '../../store/actions/user/loadme.action';
import setDefaultCookie from '../../utils/setDefaultCookie';
import { PostCard, PostListButtons } from '../../components/organisms';

const PostList = () => {
  const { me } = useSelector((state) => state.userReducer);
  const { postList, getPostListLoading, getPostListError } = useSelector(
    (state) => state.postReducer
  );

  if (getPostListLoading) {
    return <AppLoading />;
  }

  if (getPostListError) {
    return <div>error...</div>;
  }

  if (postList.length === 0) {
    return <div>포스트가 존재하지 않습니다. </div>;
  }

  return (
    <PageLayoutWithNav pageName="All Posts">
      <div>
        {me && <PostListButtons />}
        <div>
          {postList.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PageLayoutWithNav>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    setDefaultCookie(context);
    context.store.dispatch(loadMeRequestAction());
    context.store.dispatch(getPostListRequestAction());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default PostList;
