import { ISnippet, LaneType } from "../types";
import React, { useState } from "react";
import {
  addSnippet,
  useSnippetContextDispatch,
} from "../contexts/SnippetContext";

import faker from "faker";
import { useModalContext } from "../contexts/ModalContext";

type SnippetFormProps = {
  snippet?: ISnippet;
  onConfirmClick?: (updatedSnippet: ISnippet) => void;
};

const emptySnippet: ISnippet = {
  id: faker.random.uuid(),
  body: "",
  lane: LaneType.Snippet,
  tags: [""],
};

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
    <div>
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
        <div>
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
        </div>
      </form>
    </div>
  );
};
