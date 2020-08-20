import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { mediaQueries } from '../styles/mediaQueries';

const Wrapper = styled('main')`
  padding: 0 ${(props) => props.theme.space}px;
  width: 100%;
  margin: ${((props) => props.theme.appHeader)} auto 0;
  ${mediaQueries('lt')`
    width: 1024px;
  `};
`;
const Back = styled('div')``;
const Home = styled('div')`
  display: flex;
  flex-direction: row-reverse;
`;

const Navigation = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  align-items: center;
`;
const CustomIconButton = styled(IconButton)``;
const CustomArrowBackIcon = styled(ArrowBackIcon)``;
const PageName = styled('h1')`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 900;
`;
const CustomHomeIcon = styled(HomeIcon)``;

const Main = styled('div')`
  padding: 0 ${(props) => props.theme.space * 2}px;
`;

const PageLayoutWithNav = ({ pageName, children }) => {
  const router = useRouter();

  const onClickBackPage = useCallback(() => {
    router.back();
  }, []);
  const onClickHomePage = useCallback(() => {
    router.replace('/');
  }, []);

  return (
    <Wrapper>
      <Navigation>
        <Back>
          <CustomIconButton aria-label="back-page" onClick={onClickBackPage}>
            <CustomArrowBackIcon fontSize="large" />
          </CustomIconButton>
        </Back>
        <PageName>{pageName}</PageName>
        <Home>
          <CustomIconButton aria-label="back-page" onClick={onClickHomePage}>
            <CustomHomeIcon fontSize="large" />
          </CustomIconButton>
        </Home>
      </Navigation>
      <Main>{children}</Main>
    </Wrapper>
  );
};

PageLayoutWithNav.propTypes = {
  //
};

export default PageLayoutWithNav;
