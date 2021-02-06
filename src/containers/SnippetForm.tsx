import { ISnippet, LaneType } from "../types";
import React, { useState } from "react";

import { Tag } from "../components/Tag/Tag";
import { Theme } from "../theme/theme";
import faker from "faker";
import { layout } from "../theme/layout";
import styled from "styled-components";
import { useModalContext } from "../contexts/ModalContext";
import { useSnippetContextDispatch } from "../contexts/SnippetContext";
import { useTheme } from "../theme/ThemeContext";

type SnippetFormProps = {
  snippet?: ISnippet;
  onConfirmClick?: (updatedSnippet: ISnippet) => void;
};

const emptySnippet: ISnippet = {
  id: faker.random.uuid(),
  body: "",
  lane: LaneType.Snippet,
  tags: [],
};

const FormWrapper = styled.div`
  ${layout.flexCentered}
  height: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EditBarWrapper = styled.div``;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column:
  height: max-content;
  background: #ddd;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    margin-left: 1rem;
  }
`;

const TextAreaWrapper = styled("div")<{ th: Theme; isDarkMode: boolean }>`
  & textarea {
    resize: none;
    width: 100%;
    height: 100%;
    font-size: ${({ th }) => th.text.fontSize.s};
    background-color: transparent;
    border: 0;
    padding: 0.75rem 0.75rem 0 0.75rem;
  }
  height: 60%;
  display: flex;
`;

export const SnippetForm = ({
  snippet = emptySnippet,
  onConfirmClick,
}: SnippetFormProps) => {
  const { closeModal } = useModalContext();
  const { theme, isDarkMode } = useTheme();
  const [tempSnippet, setTempSnippet] = useState(snippet);
  const { addSnippet } = useSnippetContextDispatch();

  const setValue = function <T>(key: keyof ISnippet, value: T) {
    setTempSnippet({ ...tempSnippet, [key]: value });
  };

  const createSetValue = (key: keyof ISnippet) => ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(key, value);
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <EditBarWrapper>Edit Bar</EditBarWrapper>
        <TextAreaWrapper th={theme} isDarkMode={isDarkMode}>
          <textarea
            placeholder="Write something amazing..."
            value={tempSnippet.body}
            onChange={createSetValue("body")}
          />
        </TextAreaWrapper>
        <TagsWrapper>
          {snippet.tags?.map((t) => (
            <Tag key={t} tag={t} />
          ))}
        </TagsWrapper>
        <ButtonsWrapper>
          <div
            onClick={() => {
              onConfirmClick
                ? onConfirmClick(tempSnippet)
                : addSnippet({
                    body: tempSnippet.body,
                    tags: tempSnippet.tags,
                  });
              closeModal();
            }}
          >
            <button>Save</button>
          </div>
          <div onClick={closeModal}>
            <button>Cancel</button>
          </div>
        </ButtonsWrapper>
      </Form>
    </FormWrapper>
  );
};
