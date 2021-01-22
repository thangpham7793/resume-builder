import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { SnippetData } from "../components/constants";
import { Lane } from "../components/Lane/Lane";
import {
  useSnippetContext,
  useSnippetContextDispatch,
} from "../contexts/SnippetContext";
import { LaneType, OnSnippetClickedHandler } from "../types";

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

export const Board = () => {
  const { loading, error, moveableSnippets, draft } = useSnippetContext();
  const { moveSnippet } = useSnippetContextDispatch();

  // factoryFunction for onDrop since it needs the title of the target lane
  const createOnSnippetDroppedHandler = (
    newLane: LaneType
  ): DragEventHandler => {
    return (event) => {
      const { id, currentLane } = JSON.parse(
        event.dataTransfer.getData(SnippetData)
      );
      moveSnippet({
        id,
        newLane,
        currentLane,
      });
    };
  };

  const createOnSnippetClickedHandler = (
    currentLane: LaneType
  ): OnSnippetClickedHandler => {
    return (id) => {
      moveSnippet({
        id,
        currentLane,
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
        <>
          <Lane
            snippets={moveableSnippets}
            key={LaneType.Snippet}
            title={LaneType.Snippet}
            loading={loading}
            onDrop={createOnSnippetDroppedHandler(LaneType.Snippet)}
            onSnippetClicked={createOnSnippetClickedHandler(LaneType.Snippet)}
          />
          <Lane
            // FIXME: this does trigger re-rendering since title is constant
            snippets={draft}
            key={LaneType.Draft}
            title={LaneType.Draft}
            loading={loading}
            onDrop={createOnSnippetDroppedHandler(LaneType.Draft)}
            onSnippetClicked={createOnSnippetClickedHandler(LaneType.Draft)}
          />
        </>
      )}
    </BoardWrapper>
  );
};
