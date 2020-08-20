import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import wrapper from '../store/configureStore';
import GlobalStyle from '../styles/GlobalStyles';
import theme from '../styles/theme';
import AppFooter from '../components/AppFooter';
import '../node_modules/react-quill/dist/quill.snow.css';
import MenuContainer from '../components/MenuContainer';

const Tama = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <title>Tama</title>
    </Head>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <MenuContainer />
      <Component />
      <AppFooter />
    </ThemeProvider>
  </>
);

Tama.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Tama);
