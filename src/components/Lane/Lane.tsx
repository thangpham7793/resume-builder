import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { Snippet } from "../Snippet/Snippet";
import { LaneType, OnSnippetDragHandler, ISnippet } from "../../types";
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
  snippets: ISnippet[];
  loading: boolean;
  onDragOver: DragEventHandler;
  onDrop: DragEventHandler;
  onDragStart: OnSnippetDragHandler;
}

export const Lane = ({
  title,
  snippets,
  loading,
  onDragStart,
  onDrop,
  onDragOver,
}: LaneProps) => {
  return (
    <LaneWrapper onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitle>{title}</LaneTitle>
      <SnippetsContainer>
        {loading
          ? "Fetching Snippets"
          : snippets.map((snippet) => (
              <Snippet
                key={snippet.title}
                {...snippet}
                draggable={true}
                onDragStart={onDragStart}
              />
            ))}
      </SnippetsContainer>
    </LaneWrapper>
  );
};
