import { ISnippet, LaneType } from "./../types";
import { SnippetAction, SnippetActionType, SnippetState } from "./types";
import {
  SnippetDispatch,
  SnippetMovedPayload,
  SwapSnippetsOrderPayload,
} from "./types";
import { deleteSnippetById, swapSnippets } from "./arrayHelpers";

import React from "react";

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
  swapSnippetsOrder: (_: SwapSnippetsOrderPayload) => {},
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
  // console.log(action);
  switch (action.type) {
    case SnippetActionType.HYDRATE:
      const snippets = action.payload as ISnippet[];
      draft.snippets = snippets.filter((s) => s.lane === LaneType.Snippet);
      draft.draft = snippets.filter((s) => s.lane === LaneType.Draft);
      draft.moveableSnippets = [...draft.snippets];
      draft.loading = false;
      return draft;

    case SnippetActionType.MOVE_TO_NEW_LANE:
      const {
        id,
        newLane,
        currentLane,
      } = action.payload as SnippetMovedPayload;

      if (newLane === currentLane) return draft;

      if (newLane === LaneType.Draft) {
        for (const snippet of draft.moveableSnippets) {
          if (snippet.id === id) {
            snippet.lane = newLane;
            draft.draft = [snippet, ...draft.draft];
            draft.moveableSnippets = deleteSnippetById({
              snippets: draft.moveableSnippets,
              id,
            });
            break;
          }
        }
      } else {
        for (const snippet of draft.draft) {
          if (snippet.id === id) {
            snippet.lane = newLane;
            draft.moveableSnippets = [snippet, ...draft.moveableSnippets];
            draft.draft = deleteSnippetById({ snippets: draft.draft, id });
            break;
          }
        }
      }
      return draft;

    case SnippetActionType.SWAP_SNIPPETS_ORDER:
      const {
        currentId,
        droppedId,
      } = action.payload as SwapSnippetsOrderPayload;
      draft.draft = swapSnippets({
        snippets: draft.draft,
        currentId,
        droppedId,
      });
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

export const swapSnippetsOrder = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: SwapSnippetsOrderPayload
) =>
  dispatch({
    type: SnippetActionType.SWAP_SNIPPETS_ORDER,
    payload,
  });
