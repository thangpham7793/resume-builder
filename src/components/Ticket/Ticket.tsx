import React from "react";
import styled from "styled-components";
import { OnTicketDragHandler, SingleTicket } from "../../types";

const TicketWrapper = styled.div`
  background: darkGray;
  padding: 10px;
  margin: 1rem;
  border-radius: 20px;
`;

const TicketTitle = styled.h3``;

const TicketBody = styled.p`
  width: 100%;
`;

interface TicketProps extends SingleTicket {
  draggable?: boolean;
  onDragStart?: OnTicketDragHandler;
}

export const Ticket = ({
  title,
  body,
  id,
  draggable = false,
  onDragStart,
}: TicketProps) => {
  return (
    <TicketWrapper
      draggable={draggable}
      onDragStart={(e) => onDragStart && onDragStart(e, id)}
    >
      <TicketTitle>{title}</TicketTitle>
      <TicketBody>{body}</TicketBody>
    </TicketWrapper>
  );
};
