import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import { OnSnippetDragHandler, ISnippet } from "../../types";

const SnippetWrapper = styled.div`
  background: ${theme.color.secondary.main};
  padding: 10px;
  margin: 1rem;
  border-radius: 20px;
`;

const SnippetTitle = styled.h3``;

const SnippetBody = styled.p`
  width: 100%;
`;

interface SnippetProps extends ISnippet {
  draggable?: boolean;
  onDragStart?: OnSnippetDragHandler;
}

export const Snippet = ({
  title,
  body,
  id,
  draggable = false,
  onDragStart,
}: SnippetProps) => {
  return (
    <SnippetWrapper
      draggable={draggable}
      onDragStart={(e) => onDragStart && onDragStart(e, id)}
    >
      <SnippetTitle>{title}</SnippetTitle>
      <SnippetBody>{body}</SnippetBody>
    </SnippetWrapper>
  );
};
