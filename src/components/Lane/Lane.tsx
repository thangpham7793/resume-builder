import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { Ticket } from "../Ticket/Ticket";
import { LaneType, OnTicketDragHandler, SingleTicket } from "../../types";

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  background: lightgray;
  border-radius: 20px;
  min-height: 50vh;
  min-width: 20vw;

  @media (max-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 1rem;
      margin-right: 0;
    }
  }
`;

const LaneTitle = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid darkGray;
  padding-bottom: 10px;
`;
interface LaneProps {
  title: LaneType;
  tickets: SingleTicket[];
  loading: boolean;
  onDragOver: DragEventHandler;
  onDrop: DragEventHandler;
  onDragStart: OnTicketDragHandler;
}

export const Lane = ({
  title,
  tickets,
  loading,
  onDragStart,
  onDrop,
  onDragOver,
}: LaneProps) => {
  return (
    <LaneWrapper onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitle>{title}</LaneTitle>
      {loading
        ? "Fetching Tickets"
        : tickets.map((ticket) => (
            <Ticket
              key={ticket.title}
              {...ticket}
              draggable={true}
              onDragStart={onDragStart}
            />
          ))}
    </LaneWrapper>
  );
};
