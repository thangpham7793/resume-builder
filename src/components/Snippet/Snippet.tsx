import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import {
  OnSnippetDraggedHandler,
  ISnippet,
  OnSnippetClickedHandler,
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
  draggable: boolean;
  onDragStart: OnSnippetDraggedHandler;
  onClick: OnSnippetClickedHandler;
}

export const Snippet = ({
  body,
  id,
  tags = [""],
  draggable = false,
  onDragStart,
  onClick,
}: SnippetProps) => {
  const renderTags = (tags: string[]) => `#${tags.join(" #")}`;

  return (
    <SnippetWrapper
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, id)}
      onClick={() => onClick(id)}
    >
      <SnippetBody>{body}</SnippetBody>
      <SnippetTags>{renderTags(tags)}</SnippetTags>
    </SnippetWrapper>
  );
};
