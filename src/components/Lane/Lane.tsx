import React, { DragEventHandler } from "react";

import { LaneType } from "../../types";
import { SnippetData } from "../constants";
import { Theme } from "../../theme/theme";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeContext";

const getMaxWidth = (lane: LaneType) =>
  lane === LaneType.Draft ? `65vw` : `30vw`;

const LaneWrapper = styled("div")<{
  lane: LaneType;
  th: Theme;
}>`
  list-style: none;
  text-align: left;
  padding: 0;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  background: ${({ th }) => th.color.primary.light};
  border-radius: 20px;
  min-height: 50vh;
  min-width: 30vw;
  max-width: ${({ lane }) => getMaxWidth(lane)};
  margin: 0 auto;

  @media (max-width: 768px) {
    &:not(:last-child) {
      margin-bottom: 1rem;
      margin-right: 0;
    }
    max-width: 100vw;
  }
  color: ${({ th }) => th.color.primary.text};
`;

const LaneTitleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LaneTitle = styled.div``;

const SnippetsContainer = styled.div``;
const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

interface LaneProps {
  lane: LaneType;
  onDrop: DragEventHandler;
  icons: JSX.Element[];
  snippets: JSX.Element[] | string;
}

export const Lane = ({ lane, onDrop, icons, snippets }: LaneProps) => {
  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes(SnippetData.toLowerCase())) {
      event.preventDefault();
    }
  };

  const { theme } = useTheme();
  return (
    <LaneWrapper th={theme} lane={lane} onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitleWrapper>
        <LaneTitle>
          <h3>{lane}</h3>
        </LaneTitle>
        <IconsContainer>{icons}</IconsContainer>
      </LaneTitleWrapper>
      <SnippetsContainer>{snippets}</SnippetsContainer>
    </LaneWrapper>
  );
};
