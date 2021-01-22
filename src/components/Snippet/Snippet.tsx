import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import {
  OnSnippetDraggedHandler,
  ISnippet,
  OnSnippetClickedHandler,
  LaneType,
} from "../../types";

const getBackground = (lane: LaneType) => {
  return lane === LaneType.Draft
    ? theme.color.primary.main
    : theme.color.secondary.main;
};

// https://stackoverflow.com/questions/52404958/using-styled-components-with-typescript-prop-does-not-exist
const SnippetWrapper = styled("div")<{ lane: LaneType }>`
  background: ${({ lane }) => getBackground(lane)};
  padding: 10px;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: ${theme.boxShadow};
`;

const SnippetTags = styled.p`
  font-size: ${theme.text.fontSize.ss};
  text-align: right;
`;

const SnippetBody = styled.p`
  width: 100%;
  font-size: ${theme.text.fontSize.s};
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
      lane={lane}
    >
      <SnippetBody>{body}</SnippetBody>
      <SnippetTags>{renderTags(tags)}</SnippetTags>
    </SnippetWrapper>
  );
};
