import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { Snippet } from "../Snippet/Snippet";
import {
  LaneType,
  OnSnippetDraggedHandler,
  ISnippet,
  OnSnippetClickedHandler,
} from "../../types";
import { theme } from "../../theme/theme";
import { useSnippetContextDispatch } from "../../contexts/SnippetContext";
import { SnippetData } from "../constants";

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  background: ${theme.color.primary.light};
  border-radius: 20px;
  min-height: 50vh;
  min-width: 30vw;
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 1rem;
      margin-right: 0;
    }
    max-width: 100vw;
  }
`;

const LaneTitle = styled.h3`
  max-width: 40%;
  text-align: center;
  border-bottom: 1px solid darkGray;
  margin-right: auto;
  margin-left: auto;
`;

const SnippetsContainer = styled.div``;

interface LaneProps {
  title: LaneType;
  snippets: ISnippet[];
  loading: boolean;
  onDrop: DragEventHandler;
  onSnippetClicked: OnSnippetClickedHandler;
}

export const Lane = ({
  title,
  snippets,
  loading,
  onDrop,
  onSnippetClicked,
}: LaneProps) => {
  const onDragStart: OnSnippetDraggedHandler = ({ event, id, currentLane }) => {
    // text/plain is treated like a link
    event.dataTransfer.setData(
      SnippetData,
      JSON.stringify({ id, currentLane })
    );
  };

  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes(SnippetData.toLowerCase())) {
      event.preventDefault();
    }
  };

  const { swapSnippetsOrder } = useSnippetContextDispatch();
  const createOnTicketDroppedToSwapOrder = (
    currentId: string
  ): DragEventHandler => (event) => {
    const { id } = JSON.parse(event.dataTransfer.getData(SnippetData));
    swapSnippetsOrder({
      currentId,
      droppedId: id,
    });
  };
  return (
    <LaneWrapper onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitle>{title}</LaneTitle>
      <SnippetsContainer>
        {loading
          ? "Fetching Snippets"
          : snippets.map((snippet) => (
              <Snippet
                key={snippet.id}
                {...snippet}
                onDragStart={onDragStart}
                onClick={onSnippetClicked}
                onDrop={createOnTicketDroppedToSwapOrder(snippet.id)}
              />
            ))}
      </SnippetsContainer>
    </LaneWrapper>
  );
};
