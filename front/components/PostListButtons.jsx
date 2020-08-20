import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const PostListButtons = () => {
  const router = useRouter();

  const onClickCreatePostButton = useCallback(() => {
    router.push('/post/create');
  }, []);

  return (
    <Buttons>
      <CustomIconButton aria-label="create" onClick={onClickCreatePostButton}>
        <CustomCreateIcon fontSize="large" />
      </CustomIconButton>
    </Buttons>
  );
};

const Buttons = styled('div')`
  position: fixed;
  bottom: ${(props) => props.theme.space * 4}px;
  right: ${(props) => props.theme.space * 4}px;
`;

const CustomIconButton = styled(IconButton)`
  background: #404040 !important;
`;

const CustomCreateIcon = styled(CreateIcon)`
  color: ${(props) => props.theme.colors.white}!important;
`;

export default PostListButtons;
