import {
  ISnippet,
  LaneType,
  OnSnippetClickedHandler,
  OnSnippetDraggedHandler,
} from "../../types";
import React, { DragEventHandler } from "react";
import { Theme, effect } from "../../theme/theme";

import styled from "styled-components";
import { useTheme } from "../../theme/ThemeContext";

const getBackground = (lane: LaneType, theme: Theme) => {
  return lane === LaneType.Draft
    ? theme.color.primary.main
    : theme.color.secondary.main;
};

// https://stackoverflow.com/questions/52404958/using-styled-components-with-typescript-prop-does-not-exist
const SnippetWrapper = styled("div")<{ lane: LaneType; th: Theme }>`
  background: ${({ lane, th }) => getBackground(lane, th)};
  padding: 10px;
  margin: 0 1rem 1rem 1rem;
  border-radius: 5px;
  box-shadow: ${({ th }) => th.boxShadow};
  ${effect.fadeIn};
`;

const SnippetTags = styled("p")<{ th: Theme }>`
  font-size: ${({ th }) => th.text.fontSize.ss};
  text-align: right;
`;

const SnippetBody = styled("p")<{ th: Theme }>`
  width: 100%;
  font-size: ${({ th }) => th.text.fontSize.s};
  color: ${({ th }) => th.color.primary.text};
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
  const { theme } = useTheme();
  return (
    <SnippetWrapper
      th={theme}
      draggable={true}
      onDragStart={(event) => onDragStart({ event, id, currentLane: lane })}
      onClick={() => onClick(id)}
      onDrop={onDrop}
      lane={lane}
    >
      <SnippetBody th={theme}>{body}</SnippetBody>
      <SnippetTags th={theme}>{renderTags(tags)}</SnippetTags>
    </SnippetWrapper>
  );
};
