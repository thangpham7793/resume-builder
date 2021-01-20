import React, { DragEventHandler, MouseEventHandler } from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";
import {
  LaneConfig,
  LaneType,
  OnSnippetDraggedHandler,
  OnSnippetClickedHandler,
} from "../types";
import {
  SnippetAction,
  SnippetState,
  SnippetActionType,
} from "../contexts/SnippetContextProvider";

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

interface BoardProps extends SnippetState {
  lanes: LaneConfig[];
  snippetDispatch: React.Dispatch<SnippetAction>;
}

export const Board = ({
  lanes,
  error,
  moveableSnippets,
  loading,
  snippetDispatch,
}: BoardProps) => {
  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes("id")) {
      event.preventDefault();
    }
  };
  // factoryFunction for onDrop since it needs the title of the target lane
  const createOnSnippetDroppedHandler = (title: LaneType): DragEventHandler => {
    return (event) => {
      const droppedSnippetId = event.dataTransfer.getData("id");
      snippetDispatch({
        type: SnippetActionType.MOVE_SNIPPET,
        payload: {
          snippetId: droppedSnippetId,
          newLane: title,
        },
      });
    };
  };

  const createOnSnippetClickedHandler = (
    title: LaneType
  ): OnSnippetClickedHandler => {
    return (id) => {
      snippetDispatch({
        type: SnippetActionType.MOVE_SNIPPET,
        payload: {
          snippetId: id,
          newLane: title === LaneType.Draft ? LaneType.Snippet : LaneType.Draft,
        },
      });
    };
  };

  const onDragStart: OnSnippetDraggedHandler = (event, id) => {
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
            moveableSnippets={moveableSnippets.filter((t) => t.lane === title)}
            key={id}
            title={title}
            loading={loading}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={createOnSnippetDroppedHandler(title)}
            onSnippetClicked={createOnSnippetClickedHandler(title)}
          />
        ))
      )}
    </BoardWrapper>
  );
};
