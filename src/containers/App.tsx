import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Header } from "../components/Header/Header";
import {
  TicketContextProvider,
  useTicketContext,
  useTicketContextDispatch,
} from "../contexts/TicketContextProvider";
import { LaneType } from "../types";
import { Board } from "./Board";
import { TicketsContainer } from "./TicketsContainer";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const lanes = [
    { id: 1, title: LaneType.TODO },
    { id: 2, title: LaneType.IN_PROGRES },
    { id: 3, title: LaneType.REVIEW },
    { id: 4, title: LaneType.DONE },
  ];

  const ticketsContext = useTicketContext();
  const ticketDispatch = useTicketContextDispatch();

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Board
          lanes={lanes}
          ticketDispatch={ticketDispatch}
          {...ticketsContext}
        />
        <TicketsContainer {...ticketsContext} />
      </AppWrapper>
    </>
  );
}

export default App;
