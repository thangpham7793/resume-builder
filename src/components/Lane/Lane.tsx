import React, { DragEventHandler } from "react";
import styled from "styled-components";
import { FaFileWord, FaFilePdf } from "react-icons/fa";
import { Snippet } from "../Snippet/Snippet";
import {
  LaneType,
  OnSnippetDraggedHandler,
  ISnippet,
  OnSnippetClickedHandler,
} from "../../types";
import { theme } from "../../theme/theme";
import { useSnippetContextDispatch } from "../../contexts/SnippetContext";
import { SnippetData } from "../constants";
import { ConvertIcon } from "../ConvertIcon/ConvertIcon";
import { IconType } from "react-icons/lib";

const getMaxWidth = (lane: LaneType) =>
  lane === LaneType.Draft ? `65vw` : `30vw`;

const LaneWrapper = styled("div")<{ lane: LaneType }>`
  list-style: none;
  text-align: left;
  padding: 0;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  background: ${theme.color.primary.light};
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
`;

const LaneTitleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const IconWrapper = styled.div`
  text-align: center;
`;

const LaneTitle = styled.div``;

const SnippetsContainer = styled.div``;

interface LaneProps {
  lane: LaneType;
  snippets: ISnippet[];
  loading: boolean;
  onDrop: DragEventHandler;
  onSnippetClicked: OnSnippetClickedHandler;
}

export const Lane = ({
  lane,
  snippets,
  loading,
  onDrop,
  onSnippetClicked,
}: LaneProps) => {
  const onDragStart: OnSnippetDraggedHandler = ({ event, id, currentLane }) => {
    // text/plain is treated like a link
    event.dataTransfer.setData(
      SnippetData,
      JSON.stringify({ id, currentLane })
    );
  };

  const onDragOver: DragEventHandler = (event) => {
    if (event.dataTransfer.types.includes(SnippetData.toLowerCase())) {
      event.preventDefault();
    }
  };

  const { swapSnippetsOrder } = useSnippetContextDispatch();
  const createOnTicketDroppedToSwapOrder = (
    currentId: string
  ): DragEventHandler => (event) => {
    const { id } = JSON.parse(event.dataTransfer.getData(SnippetData));
    swapSnippetsOrder({
      currentId,
      droppedId: id,
    });
  };

  const convertIcons = [
    {
      icon: () => <FaFileWord fontSize={theme.text.fontSize.xl} />,
      onClick: () => console.log("covert"),
    },
    {
      icon: () => <FaFilePdf fontSize={theme.text.fontSize.xl} />,
      onClick: () => console.log("covert"),
    },
  ];

  const renderConvertIcons = () =>
    convertIcons.map((i, index) => (
      <IconWrapper key={index} onClick={i.onClick}>
        <ConvertIcon icon={i.icon} />
      </IconWrapper>
    ));

  return (
    <LaneWrapper lane={lane} onDragOver={onDragOver} onDrop={onDrop}>
      <LaneTitleWrapper>
        <LaneTitle>
          <h3>{lane}</h3>
        </LaneTitle>
        {lane === LaneType.Draft && renderConvertIcons()}
      </LaneTitleWrapper>

      <SnippetsContainer>
        {loading
          ? "Fetching Snippets"
          : snippets.map((snippet) => (
              <Snippet
                key={snippet.id}
                {...snippet}
                onDragStart={onDragStart}
                onClick={onSnippetClicked}
                onDrop={createOnTicketDroppedToSwapOrder(snippet.id)}
              />
            ))}
      </SnippetsContainer>
    </LaneWrapper>
  );
};
