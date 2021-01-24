import styled, { createGlobalStyle, css } from "styled-components";

import { Board } from "./Board";
import { Header } from "../components/Header/Header";
import Modal from "react-modal";
import React from "react";
import { Theme } from "../theme/theme";
import { useModalContext } from "../contexts/ModalContext";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  th: Theme;
};

const GlobalStyle = createGlobalStyle(
  ({ th }: Props) => css`
    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

    body {
      margin: 0;
      padding: 0;
      font-family: "Roboto", sans-serif;
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

Modal.setAppElement("#root");
function App() {
  const { theme } = useTheme();
  const { isModalOpen, modalContent } = useModalContext();
  return (
    <>
      <GlobalStyle th={theme} />
      <AppWrapper>
        <Header />
        <Board />
      </AppWrapper>
      <Modal isOpen={isModalOpen}>{modalContent}</Modal>
    </>
  );
}

export default App;
