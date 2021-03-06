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
import { IconType } from "react-icons/lib";
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

  type ToggleableIconProps = {
    fontSize?: string;
    Icon: IconType;
    isDisabled: boolean;
  };

  const ToggleableIcon = ({
    isDisabled,
    fontSize = theme.text.fontSize.xl,
    Icon,
  }: ToggleableIconProps) => (
    <Icon
      fontSize={fontSize}
      color={isDisabled ? theme.color.primary.light : ""}
    />
  );

  const { toggleTheme, theme } = useTheme();
  const convertIconsProps = [
    {
      icon: (
        <ToggleableIcon
          Icon={({ fontSize, color }) => (
            <FaFileWord fontSize={fontSize} color={color} />
          )}
          isDisabled={draft.length === 0}
        />
      ),
      onClick: () => convertToDoc(draft),
    },
    {
      icon: (
        <ToggleableIcon
          Icon={({ fontSize, color }) => (
            <FaFilePdf fontSize={fontSize} color={color} />
          )}
          isDisabled={draft.length === 0}
        />
      ),
      onClick: () => toggleTheme(),
    },
  ];

  const { canUndo, canRedo } = useEditHistory();
  const editHistoryIconsProps = [
    {
      icon: (
        <ToggleableIcon
          Icon={({ fontSize, color }) => (
            <FaUndo fontSize={fontSize} color={color} />
          )}
          fontSize={theme.text.fontSize.l}
          isDisabled={!canUndo}
        />
      ),
      onClick: () => canUndo && undo(null),
    },
    {
      icon: (
        <ToggleableIcon
          Icon={({ fontSize, color }) => (
            <FaRedo fontSize={fontSize} color={color} />
          )}
          fontSize={theme.text.fontSize.l}
          isDisabled={!canRedo}
        />
      ),
      onClick: () => canRedo && redo(null),
    },
  ];

  const { openAndSetModalContent } = useModalContext();
  const addNewIconProps = [
    {
      icon: <MdLibraryAdd fontSize={theme.text.fontSize.xl} />,
      onClick: () => openAndSetModalContent(<SnippetForm />),
      isDisabled: false,
    },
  ];

  const renderIcons = (iconProps: typeof convertIconsProps) =>
    iconProps.map((props) => <Icon key={faker.random.uuid()} {...props} />);

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
