import { ISnippet } from "../types";

type SwapSnippetsProps = {
  snippets: ISnippet[];
  currentId: string;
  droppedId: string;
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

  const copy = [...snippets];

  copy[currentIndex] = droppedSnippet;
  copy[droppedIndex] = currentSnippet;
  return copy;
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

type UpdateSnippetProps = {
  snippets: ISnippet[];
  updatedSnippet: ISnippet;
};

export const updateSnippetInArray = ({
  snippets,
  updatedSnippet,
}: UpdateSnippetProps) => {
  const index = snippets.findIndex((s) => s.id === updatedSnippet.id);
  if (index === -1) return snippets;
  const copy = [...snippets];
  copy[index] = updatedSnippet;
  return copy;
};
