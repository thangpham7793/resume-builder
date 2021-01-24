import { FaFilePdf, FaFileWord, FaRedo, FaUndo } from "react-icons/fa";
import {
  ISnippet,
  LaneType,
  OnSnippetClickedHandler,
  OnSnippetDraggedHandler,
} from "../types";
import React, { DragEventHandler } from "react";
import {
  useEditHistory,
  useSnippetContext,
  useSnippetContextDispatch,
} from "../contexts/SnippetContext";

import { Icon } from "../components/Icon/Icon";
import { Lane } from "../components/Lane/Lane";
import { MdLibraryAdd } from "react-icons/md";
import { Snippet } from "../components/Snippet/Snippet";
import { SnippetData } from "../components/constants";
import { SnippetForm } from "./SnippetForm";
import { convertToDoc } from "../services/convertToDoc";
import faker from "faker";
import styled from "styled-components";
import { useModalContext } from "../contexts/ModalContext";
import { useTheme } from "../theme/ThemeContext";

const BoardWrapper = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Alert = styled.div`
  text-align: center;
`;

export const Board = () => {
  const { loading, error, moveableSnippets, draft } = useSnippetContext();
  const {
    moveSnippet,
    swapSnippetsOrder,
    undo,
    redo,
  } = useSnippetContextDispatch();

  // factoryFunction for onDrop since it needs the title of the target lane
  const createOnSnippetDroppedHandler = (
    newLane: LaneType
  ): DragEventHandler => {
    return (event) => {
      const { id, currentLane } = JSON.parse(
        event.dataTransfer.getData(SnippetData)
      );
      moveSnippet({
        id,
        newLane,
        currentLane,
      });
    };
  };

  const createOnSnippetClickedHandler = (
    currentLane: LaneType
  ): OnSnippetClickedHandler => {
    return (id) => {
      moveSnippet({
        id,
        currentLane,
        newLane:
          currentLane === LaneType.Draft ? LaneType.Snippet : LaneType.Draft,
      });
    };
  };

  const { toggleTheme, theme } = useTheme();
  const convertIconsProps = [
    {
      key: faker.random.uuid(),
      icon: () => <FaFileWord fontSize={theme.text.fontSize.xl} />,
      onClick: () => convertToDoc(draft),
      isDisabled: draft.length === 0,
    },
    {
      key: faker.random.uuid(),
      icon: () => <FaFilePdf fontSize={theme.text.fontSize.xl} />,
      onClick: () => toggleTheme(),
      isDisabled: draft.length === 0,
    },
  ];

  const { canUndo, canRedo } = useEditHistory();
  const editHistoryIconsProps = [
    {
      key: faker.random.uuid(),
      icon: () => <FaUndo fontSize={theme.text.fontSize.l} />,
      onClick: () => canUndo && undo(null),
      isDisabled: !canUndo,
    },
    {
      key: faker.random.uuid(),
      icon: () => <FaRedo fontSize={theme.text.fontSize.l} />,
      onClick: () => canRedo && redo(null),
      isDisabled: !canRedo,
    },
  ];

  const { openAndSetModalContent } = useModalContext();
  const addNewIconProps = [
    {
      key: faker.random.uuid(),
      icon: () => <MdLibraryAdd fontSize={theme.text.fontSize.xl} />,
      onClick: () => openAndSetModalContent(<SnippetForm />),
      isDisabled: false,
    },
  ];

  const renderIcons = (iconProps: typeof convertIconsProps) =>
    iconProps.map((props) => <Icon {...props} />);

  const onDragStart: OnSnippetDraggedHandler = ({ event, id, currentLane }) => {
    // text/plain is treated like a link
    event.dataTransfer.setData(
      SnippetData,
      JSON.stringify({ id, currentLane })
    );
  };

  const createOnTicketDroppedToSwapOrder = (
    currentId: string
  ): DragEventHandler => (event) => {
    const { id } = JSON.parse(event.dataTransfer.getData(SnippetData));
    swapSnippetsOrder({
      currentId,
      droppedId: id,
    });
  };

  const renderSnippets = (snippets: ISnippet[], lane: LaneType) =>
    snippets.map((snippet) => (
      <Snippet
        key={snippet.id}
        {...snippet}
        onDragStart={onDragStart}
        onClick={createOnSnippetClickedHandler(lane)}
        onDrop={createOnTicketDroppedToSwapOrder(snippet.id)}
      />
    ));

  return (
    <BoardWrapper>
      {error ? (
        <Alert>{error.message}</Alert>
      ) : (
        <>
          <Lane
            snippets={
              loading
                ? "Fetching Snippets"
                : renderSnippets(moveableSnippets, LaneType.Snippet)
            }
            key={LaneType.Snippet}
            lane={LaneType.Snippet}
            onDrop={createOnSnippetDroppedHandler(LaneType.Snippet)}
            actionIcons={renderIcons(addNewIconProps)}
          />
          <Lane
            snippets={
              loading ? "Fetching Draft" : renderSnippets(draft, LaneType.Draft)
            }
            key={LaneType.Draft}
            lane={LaneType.Draft}
            onDrop={createOnSnippetDroppedHandler(LaneType.Draft)}
            actionIcons={renderIcons(convertIconsProps)}
            editHistoryIcons={renderIcons(editHistoryIconsProps)}
          />
        </>
      )}
    </BoardWrapper>
  );
};
