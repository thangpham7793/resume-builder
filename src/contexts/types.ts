import { ISnippet, LaneType } from "./../types";

export enum SnippetActionType {
  HYDRATE = "HYDRATE",
  MOVE_TO_NEW_LANE = "MOVE_TO_NEW_LANE",
  ERROR = "ERROR",
}

export type SnippetMovedPayload = { newLane: LaneType; id: string };
export type SnippetActionPayload =
  | ISnippet[]
  | ISnippet
  | Error
  | SnippetMovedPayload;

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
  dispatches: {
    moveSnippet: (payload: SnippetMovedPayload) => void;
  };
};
