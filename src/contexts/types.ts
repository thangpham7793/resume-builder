import { ISnippet, LaneType } from "./../types";

export enum SnippetActionType {
  HYDRATE = "HYDRATE",
  MOVE_TO_NEW_LANE = "MOVE_TO_NEW_LANE",
  ERROR = "ERROR",
  SWAP = "SWAP",
  ADD = "ADD",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  UNDO = "UNDO",
  FORWARD = "FORWARD",
}

export type SnippetMovedPayload = {
  newLane: LaneType;
  currentLane: LaneType;
  id: string;
};
export type AddSnippetPayload = { body: string; tags: string[] | undefined };
export type SwapSnippetsOrderPayload = { currentId: string; droppedId: string };
export type UpdateSnippetPayload = { updatedSnippet: ISnippet };
export type DeleteSnippetPayload = { id: string };
export type SnippetActionPayload =
  | ISnippet[]
  | ISnippet
  | Error
  | SnippetMovedPayload
  | SwapSnippetsOrderPayload
  | AddSnippetPayload
  | DeleteSnippetPayload
  | UpdateSnippetPayload;

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

export type MementoSnippetState = {
  currentState: SnippetState;
  history: {
    stack: SnippetState[];
    popped: SnippetState[];
  };
};

export type SnippetDispatch = {
  addSnippet: (payload: AddSnippetPayload) => void;
  moveSnippet: (payload: SnippetMovedPayload) => void;
  swapSnippetsOrder: (payload: SwapSnippetsOrderPayload) => void;
  updateSnippet: (payload: UpdateSnippetPayload) => void;
  deleteSnippet: (payload: DeleteSnippetPayload) => void;
  undo: (payload: null) => void;
  redo: (payload: null) => void;
};
