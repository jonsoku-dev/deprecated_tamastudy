import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostListRequestAction } from '../../store/actions/post/getPostList.action';
import { AppLoading, PageLayoutWithNav } from '../../components/layouts';
import wrapper from '../../store/configureStore';
import { loadMeRequestAction } from '../../store/actions/user/loadme.action';
import setDefaultCookie from '../../utils/setDefaultCookie';
import { PostCard, PostListButtons } from '../../components/organisms';

const PostList = () => {
  const { me } = useSelector((state) => state.userReducer);
  const {
    postList,
    pageInfo,
    getPostListLoading,
    getPostListError,
  } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    if (!getPostListLoading && pageInfo.hasNextPage) {
      setTimeout(() => {
        dispatch(
          getPostListRequestAction({
            cursor: pageInfo.nextPageCursor,
            limit: 5,
          })
        );
      }, 1000);
    }
  }, [getPostListLoading, pageInfo]);

  if (getPostListError) {
    return <div>error...</div>;
  }

  if (postList.length === 0) {
    return <div>포스트가 존재하지 않습니다. </div>;
  }

  return (
    <PageLayoutWithNav pageName="All Posts">
      {me && <PostListButtons />}
      <InfiniteScroll
        dataLength={postList.length} // This is important field to render the next data
        next={fetchData}
        hasMore={pageInfo.hasNextPage}
        loader={<AppLoading />}
      >
        {postList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
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
