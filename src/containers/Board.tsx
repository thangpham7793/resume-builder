import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { Lane } from "../components/Lane/Lane";
import { useSnippetContext } from "../contexts/SnippetContext";
import { LaneConfig, LaneType, OnSnippetClickedHandler } from "../types";

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

interface BoardProps {
  lanes: LaneConfig[];
}

export const Board = ({ lanes }: BoardProps) => {
  const {
    loading,
    error,
    moveableSnippets,
    dispatches: { moveSnippet },
  } = useSnippetContext();

  // factoryFunction for onDrop since it needs the title of the target lane
  const createOnSnippetDroppedHandler = (
    newLane: LaneType
  ): DragEventHandler => {
    return (event) => {
      const id = event.dataTransfer.getData("id");
      moveSnippet({
        id,
        newLane,
      });
    };
  };

  const createOnSnippetClickedHandler = (
    currentLane: LaneType
  ): OnSnippetClickedHandler => {
    return (id) => {
      moveSnippet({
        id,
        newLane:
          currentLane === LaneType.Draft ? LaneType.Snippet : LaneType.Draft,
      });
    };
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
            onDrop={createOnSnippetDroppedHandler(title)}
            onSnippetClicked={createOnSnippetClickedHandler(title)}
          />
        ))
      )}
    </BoardWrapper>
  );
};
