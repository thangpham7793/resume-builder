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
import { useSnippetContextDispatch } from "../../contexts/SnippetContext";
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

const ActionWrapper = styled("div")<{ th: Theme; isDarkMode: boolean }>`
  &:hover {
    background: ${(props) => props.th.color.primary.light};
    border-radius: 50%;
    border: 1px solid;
  }
`;

const SnippetBodyWrapper = styled("div")<{ th: Theme }>`
  width: 100%;
  font-size: ${({ th }) => th.text.fontSize.s};
  color: ${({ th }) => th.color.primary.text};
  cursor: grab;
  margin-bottom: 1rem;
`;

const SnippetBody = styled("div")<{ th: Theme; isDarkMode: boolean }>`
  line-height: 1rem;
  &:hover {
    border: 1px dashed ${(props) => (props.isDarkMode ? "#fff" : "#000")};
    border-radius: 0.25rem;
    line-height: 1.3rem;
    padding: 0 0.5rem;
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
  const { theme, isDarkMode } = useTheme();
  const { deleteSnippet, updateSnippet } = useSnippetContextDispatch();
  const renderTags = (tags: string[]) =>
    tags.map((tag, i) => <Tag key={i} tag={tag} />);

  type SnippetActionProps = {
    icon: IconType;
  };

  const actionProps = [
    {
      icon: () => <MdModeEdit />,
      onClick: () =>
        updateSnippet({
          updatedSnippet: {
            id,
            tags: ["updated", "success"],
            body: "Updated!",
            lane,
          },
        }),
    },
    {
      icon: () => <MdDelete />,
      onClick: () => deleteSnippet({ id }),
    },
  ];

  const renderActions = (actionProps: SnippetActionProps[]) =>
    actionProps.map((props, i) => (
      <ActionWrapper th={theme} isDarkMode={isDarkMode} key={i}>
        <Icon {...props} />
      </ActionWrapper>
    ));

  return (
    <SnippetWrapper
      th={theme}
      draggable={true}
      onDragStart={(event) => onDragStart({ event, id, currentLane: lane })}
      onDrop={onDrop}
      lane={lane}
    >
      <SnippetBodyWrapper th={theme} onClick={() => onClick(id)}>
        <SnippetBody id="#rotating-border" th={theme} isDarkMode={isDarkMode}>
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
