import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getCommentListRequestAction } from '../store/actions/comment/getCommentList.action';
import CommentCard from './CommentCard';

const CommentList = () => {
  const router = useRouter();
  const { postId } = router.query;
  const dispatch = useDispatch();
  const {
    commentList,
    getCommentListDone,
    getCommentListLoading,
  } = useSelector((state) => state.commentReducer);

  useEffect(() => {
    dispatch(getCommentListRequestAction(postId));
  }, [postId]);

  if (getCommentListLoading) return <div>댓글을 불러오는 중입니다 ...</div>;

  if (getCommentListDone && commentList.length === 0) return <div>댓글이 존재하지 않습니다. </div>;

  return (
    getCommentListDone
    && commentList.length > 0
    && commentList.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ))
  );
};

export default CommentList;
