import {
  ISnippet,
  LaneType,
  OnSnippetClickedHandler,
  OnSnippetDraggedHandler,
} from "../../types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import React, { DragEventHandler } from "react";
import { Theme, effect } from "../../theme/theme";

import { FaSave } from "react-icons/fa";
import { Icon } from "../Icon/Icon";
import { IconType } from "react-icons/lib";
import { Tag } from "../Tag/Tag";
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

const SnippetLowerWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const SnippetTags = styled("div")<{ th: Theme }>`
  font-size: ${({ th }) => th.text.fontSize.ss};
  display: flex;
  width: max-content;
  max-width: 60%;
  justify-content: space-between;
  align-content: center;
  & > div {
    margin-right: 1rem;
  }
`;

const SnippetActionWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const ActionWrapper = styled("div")``;

const SnippetBodyWrapper = styled("div")<{ th: Theme }>`
  width: 100%;
  font-size: ${({ th }) => th.text.fontSize.s};
  color: ${({ th }) => th.color.primary.text};
  cursor: grab;
  margin-bottom: 1rem;
  &:hover {
    transition: margin-bottom 0.5s;
    margin-bottom: 1rem;
  }
`;

const SnippetBody = styled("div")<{ th: Theme; isDarkMode: boolean }>`
  line-height: 1rem;
  &:hover {
    border: 1px dashed ${(props) => (props.isDarkMode ? "#fff" : "#000")};
    border-radius: 0.25rem;
    line-height: 1.3rem;
    transition: margin-bottom 0.5s;
    transition: padding 0.5s;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-weight: normal;
  }
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
  const renderTags = (tags: string[]) =>
    tags.map((tag, i) => <Tag key={i} tag={tag} />);

  type SnippetActionProps = {
    icon: IconType;
  };

  const actionProps = [
    {
      icon: () => <MdModeEdit />,
    },
    {
      icon: () => <FaSave />,
    },
    {
      icon: () => <MdDelete />,
    },
  ];

  const renderActions = (actions: SnippetActionProps[]) =>
    actions.map((a, i) => (
      <ActionWrapper key={i}>
        <Icon icon={a.icon} />
      </ActionWrapper>
    ));

  const { theme, isDarkMode } = useTheme();
  return (
    <SnippetWrapper
      th={theme}
      draggable={true}
      onDragStart={(event) => onDragStart({ event, id, currentLane: lane })}
      onDrop={onDrop}
      lane={lane}
    >
      <SnippetBodyWrapper th={theme} onClick={() => onClick(id)}>
        <SnippetBody th={theme} isDarkMode={isDarkMode}>
          <p>{body}</p>
        </SnippetBody>
      </SnippetBodyWrapper>
      <SnippetLowerWrapper>
        <SnippetTags th={theme}>{renderTags(tags)}</SnippetTags>
        <SnippetActionWrapper>
          {renderActions(actionProps)}
        </SnippetActionWrapper>
      </SnippetLowerWrapper>
    </SnippetWrapper>
  );
};
