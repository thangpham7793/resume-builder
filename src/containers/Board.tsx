import { Document, Packer, Paragraph } from "docx";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { ISnippet, LaneType, OnSnippetClickedHandler } from "../types";
import React, { DragEventHandler } from "react";
import {
  useSnippetContext,
  useSnippetContextDispatch,
} from "../contexts/SnippetContext";

import { ConvertIcon } from "../components/ConvertIcon/ConvertIcon";
import { Lane } from "../components/Lane/Lane";
import { SnippetData } from "../components/constants";
import faker from "faker";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { styles } from "./docStyles";
import { theme } from "../theme/theme";
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
  const { moveSnippet } = useSnippetContextDispatch();

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

  const convertToDoc = async (snippets: ISnippet[]) => {
    const doc = new Document({
      styles,
    });
    const paras = snippets.map(
      (s) =>
        new Paragraph({
          text: s.body.trim(),
          style: "normalPara",
        })
    );
    doc.addSection({ children: paras });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "my-cover-letter.docx");
  };

  const { toggleTheme } = useTheme();
  const convertIcons = [
    {
      key: faker.random.uuid(),
      icon: () => <FaFileWord fontSize={theme.text.fontSize.xl} />,
      onClick: () => convertToDoc(draft),
    },
    {
      key: faker.random.uuid(),
      icon: () => <FaFilePdf fontSize={theme.text.fontSize.xl} />,
      onClick: () => toggleTheme(),
    },
  ];

  const renderIcons = (iconProps: typeof convertIcons) =>
    iconProps.map((props) => <ConvertIcon {...props} />);

  return (
    <BoardWrapper>
      {error ? (
        <Alert>{error.message}</Alert>
      ) : (
        <>
          <Lane
            snippets={moveableSnippets}
            key={LaneType.Snippet}
            lane={LaneType.Snippet}
            loading={loading}
            onDrop={createOnSnippetDroppedHandler(LaneType.Snippet)}
            onSnippetClicked={createOnSnippetClickedHandler(LaneType.Snippet)}
          />
          <Lane
            snippets={draft}
            key={LaneType.Draft}
            lane={LaneType.Draft}
            loading={loading}
            onDrop={createOnSnippetDroppedHandler(LaneType.Draft)}
            onSnippetClicked={createOnSnippetClickedHandler(LaneType.Draft)}
            icons={renderIcons(convertIcons)}
          />
        </>
      )}
    </BoardWrapper>
  );
};
