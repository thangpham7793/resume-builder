import { ISnippet, LaneType } from "../types";
import React, { useState } from "react";

import faker from "faker";
import { layout } from "../theme/layout";
import styled from "styled-components";
import { useModalContext } from "../contexts/ModalContext";
import { useSnippetContextDispatch } from "../contexts/SnippetContext";

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
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    margin-left: 1rem;
  }
`;

export const SnippetForm = ({
  snippet = emptySnippet,
  onConfirmClick,
}: SnippetFormProps) => {
  const { closeModal } = useModalContext();
  const [tempSnippet, setTempSnippet] = useState(snippet);
  const { addSnippet } = useSnippetContextDispatch();

  const setValue = function <T>(key: keyof ISnippet, value: T) {
    setTempSnippet({ ...tempSnippet, [key]: value });
  };

  const createSetValue = (key: keyof ISnippet) => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(key, value);
  };

  return (
    <FormWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label>Content</label>
          <input
            type="textarea"
            value={tempSnippet.body}
            onChange={createSetValue("body")}
          />
        </div>
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
      </form>
    </FormWrapper>
  );
};
