import React from "react";
import { ISnippet } from "./../types";
import { SnippetDispatch, SnippetMovedPayload } from "./types";
import { SnippetState, SnippetAction, SnippetActionType } from "./types";

// initial states
export const initialState: SnippetState = {
  snippets: [],
  moveableSnippets: [],
  error: null,
  loading: true,
  draft: [],
};

export const initialDispatch = {
  moveSnippet: (_: SnippetMovedPayload) => {},
};

export const SnippetContext = React.createContext<SnippetState>(initialState);
export const useSnippetContextDispatch = () =>
  React.useContext(SnippetDispatchContext);

export const useSnippetContext = () => React.useContext(SnippetContext);
export const SnippetDispatchContext = React.createContext<SnippetDispatch>(
  initialDispatch
);

// reducer
export const snippetReducer = (draft: SnippetState, action: SnippetAction) => {
  console.log(action);
  switch (action.type) {
    case SnippetActionType.HYDRATE:
      draft.snippets = action.payload as ISnippet[];
      draft.moveableSnippets = [...draft.snippets];
      draft.loading = false;
      return draft;
    case SnippetActionType.MOVE_TO_NEW_LANE:
      const { id, newLane } = action.payload as SnippetMovedPayload;
      for (const snippet of draft.moveableSnippets) {
        if (snippet.id === id) {
          snippet.lane = newLane;
          break;
        }
      }
      return draft;
    case SnippetActionType.ERROR:
      draft.error = action.payload as Error;
      return draft;
    default:
      return draft;
  }
};

// Public API to interact with context
export const moveSnippet = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: SnippetMovedPayload
) =>
  dispatch({
    type: SnippetActionType.MOVE_TO_NEW_LANE,
    payload,
  });

export const hydrateState = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: ISnippet[]
) =>
  dispatch({
    type: SnippetActionType.HYDRATE,
    payload,
  });

export const raiseFetchSnippetError = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: Error
) =>
  dispatch({
    type: SnippetActionType.ERROR,
    payload,
  });
