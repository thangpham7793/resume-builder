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
  min-width: 20vw;
  width: 40%;

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

const SnippetsContainer = styled.div``;

interface LaneProps {
  title: LaneType;
  moveableSnippets: ISnippet[];
  loading: boolean;
  onDrop: DragEventHandler;
  onSnippetClicked: OnSnippetClickedHandler;
}

export const Lane = ({
  title,
  moveableSnippets,
  loading,
  onDrop,
  onSnippetClicked,
}: LaneProps) => {
  const onDragStart: OnSnippetDraggedHandler = (event, id) => {
    // text/plain is treated like a link
    event.dataTransfer.setData("id", id);
  };

  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes("id")) {
      event.preventDefault();
    }
  };

  return (
    <LaneWrapper onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitle>{title}</LaneTitle>
      <SnippetsContainer>
        {loading
          ? "Fetching Snippets"
          : moveableSnippets.map((snippet) => (
              <Snippet
                key={snippet.id}
                {...snippet}
                draggable={true}
                onDragStart={onDragStart}
                onClick={onSnippetClicked}
              />
            ))}
      </SnippetsContainer>
    </LaneWrapper>
  );
};
