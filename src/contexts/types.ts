import { ISnippet, LaneType } from "./../types";

export enum SnippetActionType {
  HYDRATE = "HYDRATE",
  MOVE_TO_NEW_LANE = "MOVE_TO_NEW_LANE",
  ERROR = "ERROR",
  SWAP_SNIPPETS_ORDER = "SWAP_SNIPPETS_ORDER",
}

export type SnippetMovedPayload = {
  newLane: LaneType;
  currentLane: LaneType;
  id: string;
};
export type SwapSnippetsOrderPayload = { currentId: string; droppedId: string };
export type SnippetActionPayload =
  | ISnippet[]
  | ISnippet
  | Error
  | SnippetMovedPayload
  | SwapSnippetsOrderPayload;

export type SnippetContextPublicMethod = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: any
) => void;

export type SnippetAction = {
  type: SnippetActionType;
  payload?: SnippetActionPayload;
};

export type SnippetState = {
  snippets: ISnippet[];
  moveableSnippets: ISnippet[];
  error: Error | null;
  loading: boolean;
  draft: ISnippet[];
};

export type SnippetDispatch = {
  moveSnippet: (payload: SnippetMovedPayload) => void;
  swapSnippetsOrder: (payload: SwapSnippetsOrderPayload) => void;
};
