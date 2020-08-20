import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import QuillWrapper from './QuillWrapper';
import { createPostRequestAction } from '../store/actions/post/createPost.action';
import { editPostRequestAction } from '../store/actions/post/editPost.action';
import { getPostRequestAction } from '../store/actions/post/getPost.action';
import { ButtonWrapper } from './styled/authForm';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 100%;
  }
`;

const Title = styled('div')`
  > input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #737373;
    padding: ${(props) => props.theme.space * 2}px 0;
    font-size: 1.4rem;
    font-weight: 900;
  }
`;
const Desc = styled('div')`
  .ql-container.ql-snow {
    height: 400px;
  }
`;

const PostForm = () => {
  // state
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState('');
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);

  // hook
  const dispatch = useDispatch();
  const router = useRouter();
  const { postId } = router.query;

  // selector
  const { me, loadMeDone } = useSelector((state) => state.userReducer);
  const {
    post,
    createPostDone,
    createPostLoading,
    createPostError,
    getPostDone,
    getPostLoading,
    getPostError,
    editPostDone,
    editPostLoading,
  } = useSelector((state) => state.postReducer);

  // useForm
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'all',
  });

  // 포스트 작성/수정 버튼
  const onSubmit = useCallback(
    (data) => {
      if (!desc) {
        alert('본문을 입력해주세요. ');
      } else if (isEdit) {
        dispatch(
          editPostRequestAction({
            postId,
            formData: { title: data.title, desc },
          }),
        );
      } else {
        dispatch(createPostRequestAction({ title: data.title, desc }));
      }
    },
    [isEdit, postId, desc],
  );

  // useEffects
  // 유저정보 불러오기
  useEffect(() => {
    if (!me && loadMeDone) {
      router.push('/login');
    }
  }, [me, loadMeDone]);

  // 생성/수정 모드 판별 (postId가 있고, 없고)
  useEffect(() => {
    if (postId) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [postId]);

  // 포스트 생성 후
  useEffect(() => {
    if (!createPostLoading && createPostDone && post && !createPostError) {
      router.push(`/post/${post.id}`);
    }
  }, [createPostLoading, createPostDone, post]);

  // 포스트 수정 후
  useEffect(() => {
    if (!editPostLoading && editPostDone) {
      router.push(`/post/${postId}`);
    }
  }, [editPostLoading, editPostDone, postId]);

  // 작성 및 수정 버튼 disabled
  useEffect(() => {
    if (!desc || !formState.isValid || Object.keys(errors).length > 0) {
      setDisabledSubmitButton(true);
    } else {
      setDisabledSubmitButton(false);
    }
  }, [desc, formState.isValid, errors]);

  // 수정모드일때 기존 포스트 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      dispatch(getPostRequestAction(postId));
    }
  }, [isEdit, postId]);

  // 수정모드일때 현재 로그인되어있는 사용자와 포스트 작성자가 다를때 (직접접근했을경우)
  useEffect(() => {
    if (isEdit && getPostDone && me?.id !== post?.User.id) {
      router.push('/post');
    }
  }, [isEdit, getPostDone, me, post]);

  // 수정모드일때 포스트가 존재하지 않으면 포스트 리스트 화면으로
  useEffect(() => {
    if (isEdit && getPostError) {
      router.push('/post');
    }
  }, [isEdit, getPostError]);

  // 수정모드일때 기존 포스트 데이터를 useForm에 넣는 작업
  useEffect(() => {
    if (isEdit && getPostDone && post) {
      reset({
        title: post.title,
      });
      setDesc(post.desc);
    }
  }, [isEdit, getPostDone, post]);

  // 로딩
  if (createPostLoading) {
    return <div>Creating Post ...</div>;
  }

  if (isEdit && getPostLoading) {
    return <div>Loading ...</div>;
  }

  if (isEdit && me?.id !== post?.User.id) {
    return <div>Redirecting ...</div>;
  }

  if (isEdit && editPostLoading) {
    return <div>Editing Post ...</div>;
  }

  // 폼 랜더링
  return (
    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Title>
        <input
          name="title"
          placeholder="Title"
          ref={register({ required: true, maxLength: 50 })}
        />
        {errors.title?.type === 'required' && <span>필수항목입니다.</span>}
        {errors.title?.type === 'maxLength' && (
          <span>50자 이내로 입력해주세요. </span>
        )}
      </Title>
      <Desc>
        <QuillWrapper name="desc" desc={desc} setDesc={setDesc} />
      </Desc>
      <ButtonWrapper>
        <Button
          type="button"
          variant="contained"
          value="submit"
          endIcon={<SaveIcon />}
          onClick={() => {}}
          disabled
        >
          일시저장
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          value="submit"
          endIcon={<SendIcon />}
          disabled={disabledSubmitButton}
        >
          {isEdit ? '수정하기' : '작성하기'}
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

PostForm.propTypes = {};

export default PostForm;
