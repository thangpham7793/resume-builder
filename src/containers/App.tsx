import styled, { createGlobalStyle } from "styled-components";

import { Board } from "./Board";
import { Header } from "../components/Header/Header";
import React from "react";
import { theme } from "../theme/theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${theme.text.fontSize.m}
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Board />
      </AppWrapper>
    </>
  );
}

export default App;
