import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "../components/Header/Header";
import {
  useSnippetContext,
  useSnippetContextDispatch,
} from "../contexts/SnippetContextProvider";
import { theme } from "../theme/theme";
import { LaneType } from "../types";
import { Board } from "./Board";

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
  const lanes = [
    { id: 1, title: LaneType.Snippet },
    { id: 2, title: LaneType.Draft },
  ];

  const snippetsContext = useSnippetContext();
  const snippetDispatch = useSnippetContextDispatch();

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Board
          lanes={lanes}
          snippetDispatch={snippetDispatch}
          {...snippetsContext}
        />
      </AppWrapper>
    </>
  );
}

export default App;
