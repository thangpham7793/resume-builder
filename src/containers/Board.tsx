import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";
import { LaneConfig, LaneType, OnTicketDragHandler } from "../types";
import {
  TicketAction,
  TicketState,
  TicketActionType,
} from "../contexts/TicketContextProvider";

const BoardWrapper = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  margin: 1rem 1rem 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Alert = styled.div`
  text-align: center;
`;

interface BoardProps extends TicketState {
  lanes: LaneConfig[];
  ticketDispatch: React.Dispatch<TicketAction>;
}

export const Board = ({
  lanes,
  error,
  tickets,
  loading,
  ticketDispatch,
}: BoardProps) => {
  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes("id")) {
      event.preventDefault();
    }
  };
  // factoryFunction for onDrop since it needs the title of the target lane
  const createOnDrop = (title: LaneType): DragEventHandler => {
    return (event) => {
      const droppedTicketId = event.dataTransfer.getData("id");
      ticketDispatch({
        type: TicketActionType.TICKET_MOVED_TO_NEW_LANE,
        payload: {
          ticketId: droppedTicketId,
          newLane: title,
        },
      });
    };
  };

  const onDragStart: OnTicketDragHandler = (event, id) => {
    // text/plain is treated like a link
    event.dataTransfer.setData("id", id);
  };

  return (
    <BoardWrapper>
      {error ? (
        <Alert>{error.message}</Alert>
      ) : (
        lanes.map(({ id, title }) => (
          <Lane
            tickets={tickets.filter((t) => t.lane === title)}
            key={id}
            title={title}
            loading={loading}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={createOnDrop(title)}
          />
        ))
      )}
    </BoardWrapper>
  );
};
