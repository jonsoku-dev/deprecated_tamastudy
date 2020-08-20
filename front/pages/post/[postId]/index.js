import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import axios from 'axios';
import { END } from 'redux-saga';
import { getPostRequestAction } from '../../../store/actions/post/getPost.action';
import CommentForm from '../../../components/CommentForm';
import CommentList from '../../../components/CommentList';
import { deletePostRequestAction } from '../../../store/actions/post/deletePost.action';
import { likePostRequestAction } from '../../../store/actions/post/likePost.action';
import { unLikePostRequestAction } from '../../../store/actions/post/unLikePost.action';
import Tags from '../../../components/Tags';
import BottomInfo from '../../../components/BottomInfo';
import PostLikeButton from '../../../components/PostLikeButton';
import PageLayoutWithNav from '../../../components/PageLayoutWithNav';
import PostAdminButton from '../../../components/PostAdminButton';
import CommentTotal from '../../../components/CommentTotal';
import UserCard from '../../../components/UserCard';
import wrapper from '../../../store/configureStore';
import { loadMeRequestAction } from '../../../store/actions/user/loadme.action';
import setDefaultCookie from '../../../utils/setDefaultCookie';

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userReducer);
  const { getPostLoading, getPostDone, deletePostDone, post } = useSelector(
    (state) => state.postReducer,
  );
  const { commentList } = useSelector((state) => state.commentReducer);

  const onClickEditPage = useCallback(() => {
    router.push(`/post/${postId}/edit`);
  }, [postId]);

  const onClickDelete = useCallback(() => {
    if (window.confirm('삭제 하시겠습니까?')) {
      dispatch(deletePostRequestAction(postId));
    }
  }, [postId]);

  const onClickLike = useCallback(() => {
    dispatch(likePostRequestAction(postId));
  }, [postId]);

  const onClickUnLike = useCallback(() => {
    dispatch(unLikePostRequestAction(postId));
  }, [postId]);

  useEffect(() => {
    dispatch(getPostRequestAction(postId));
  }, [postId]);

  useEffect(() => {
    if (deletePostDone && !post) {
      router.push('/post');
    }
  }, [deletePostDone, post]);

  if (getPostLoading) {
    return <div>Loading ...</div>;
  }

  const isLiker = !!post?.Likers.find((liker) => liker.id === me?.id);
  const isAuthor = post?.User.id === me?.id;

  return (
    getPostDone
    && post && (
      <PageLayoutWithNav
        pageName={
          post.title.length > 20
            ? `${post.title.substring(0, 20)}...`
            : post.title
        }
      >
        <Wrapper>
          <BottomInfo
            likers={post.Likers.length}
            view={post.view}
            comments={commentList?.length}
          />
          <Tags tags={['brown', 'cony', '짬뽕']} />
          <Desc>{Parser(post.desc)}</Desc>
          <UserCard user={post.User} />
          <CommentTotal />
          {me && <CommentForm />}
          <CommentList />
        </Wrapper>

        {isAuthor && (
          <PostAdminButton
            onClickEditPage={onClickEditPage}
            onClickDelete={onClickDelete}
          />
        )}
        {me
          && (isLiker ? (
            <PostLikeButton isLiker={isLiker} onClick={onClickUnLike} />
          ) : (
            <PostLikeButton isLiker={isLiker} onClick={onClickLike} />
          ))}
      </PageLayoutWithNav>
    )
  );
};

const Wrapper = styled('div')`
  display: grid;
  grid-column: ${(props) => props.theme.space}px;
  grid-gap: ${(props) => props.theme.space * 2}px;
`;

const Title = styled('h1')`
  font-size: 4rem;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  word-break: break-all;
  white-space: nowrap;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;
const Desc = styled('div')`
  letter-spacing: 0.5px;
  line-height: 1.5;
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  margin-bottom: ${(props) => props.theme.space}px;
`;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  setDefaultCookie(context);
  context.store.dispatch(loadMeRequestAction());
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
