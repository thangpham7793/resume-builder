import styled, { createGlobalStyle, css } from "styled-components";

import { Board } from "./Board";
import { Header } from "../components/Header/Header";
import React from "react";
import { Theme } from "../theme/theme";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  th: Theme;
};

const GlobalStyle = createGlobalStyle(
  ({ th }: Props) => css`
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-size: ${th.text.fontSize.m};
      background: ${th.color.primary.light};
    }
  `
);

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const { theme } = useTheme();
  return (
    <>
      <GlobalStyle th={theme} />
      <AppWrapper>
        <Header />
        <Board />
      </AppWrapper>
    </>
  );
}

export default App;
