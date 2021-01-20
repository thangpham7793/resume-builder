import React from "react";
import styled from "styled-components";
import { Ticket } from "../components/Ticket/Ticket";
import { TicketState } from "../contexts/TicketContextProvider";

const TicketsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin: 1%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Alert = styled.div`
  text-align: center;
`;

export const TicketsContainer = ({ tickets, error, loading }: TicketState) => {
  return (
    <TicketsWrapper>
      {loading && "Fetching Tickets"}
      {error ? (
        <Alert>{error.message}</Alert>
      ) : (
        tickets.map((t) => <Ticket {...t} />)
      )}
    </TicketsWrapper>
  );
};
