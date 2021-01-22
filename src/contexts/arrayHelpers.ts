import { ISnippet } from "../types";
import { SwapSnippetsOrderPayload } from "./types";

type SwapSnippetsProps = SwapSnippetsOrderPayload & {
  snippets: ISnippet[];
};

export const swapSnippets = ({
  snippets,
  currentId,
  droppedId,
}: SwapSnippetsProps) => {
  const currentIndex = snippets.findIndex((s) => s.id === currentId);
  const droppedIndex = snippets.findIndex((s) => s.id === droppedId);

  // not in the same lane, do nothing
  if (currentIndex === -1 || droppedIndex === -1) return snippets;

  const currentSnippet = snippets[currentIndex];
  const droppedSnippet = snippets[droppedIndex];

  const newSnippets = [...snippets];

  newSnippets[currentIndex] = droppedSnippet;
  newSnippets[droppedIndex] = currentSnippet;
  return newSnippets;
};

type DeleteSnippetByIdProps = {
  snippets: ISnippet[];
  id: string;
};

export const deleteSnippetById = ({ snippets, id }: DeleteSnippetByIdProps) => {
  const index = snippets.findIndex((s) => s.id === id);
  if (index === -1) return snippets;
  return [...snippets.slice(0, index), ...snippets.slice(index + 1)];
};
