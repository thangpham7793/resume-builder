import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import {
  OnSnippetDraggedHandler,
  ISnippet,
  OnSnippetClickedHandler,
  LaneType,
} from "../../types";

const SnippetWrapper = styled.div`
  background: ${theme.color.secondary.main};
  padding: 10px;
  margin: 1rem;
  border-radius: 20px;
`;

const SnippetTags = styled.p`
  font-size: ${theme.text.fontSize.s};
  text-align: right;
`;

const SnippetBody = styled.p`
  width: 100%;
`;

interface SnippetProps extends ISnippet {
  onDragStart: OnSnippetDraggedHandler;
  onClick: OnSnippetClickedHandler;
  onDrop: DragEventHandler;
}

export const Snippet = ({
  body,
  id,
  tags = [""],
  onDragStart,
  onClick,
  onDrop,
  lane,
}: SnippetProps) => {
  const renderTags = (tags: string[]) => `#${tags.join(" #")}`;

  return (
    <SnippetWrapper
      draggable={true}
      onDragStart={(event) => onDragStart({ event, id, currentLane: lane })}
      onClick={() => onClick(id)}
      onDrop={onDrop}
    >
      <SnippetBody>{body}</SnippetBody>
      <SnippetTags>{renderTags(tags)}</SnippetTags>
    </SnippetWrapper>
  );
};
