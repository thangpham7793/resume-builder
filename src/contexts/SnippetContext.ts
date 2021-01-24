import {
  AddSnippetPayload,
  DeleteSnippetPayload,
  SnippetDispatch,
  SnippetMovedPayload,
  SwapSnippetsOrderPayload,
  UpdateSnippetPayload,
} from "./types";
import { ISnippet, LaneType } from "./../types";
import { SnippetAction, SnippetActionType, SnippetState } from "./types";
import {
  deleteSnippetById,
  swapSnippets,
  updateSnippetInArray,
} from "./arrayHelpers";

import React from "react";
import faker from "faker";

// initial states
export const initialState: SnippetState = {
  snippets: [],
  moveableSnippets: [],
  error: null,
  loading: true,
  draft: [],
};

export const SnippetContext = React.createContext<SnippetState>(initialState);
export const useSnippetContextDispatch = () =>
  React.useContext(SnippetDispatchContext) as SnippetDispatch;

export const useSnippetContext = () => React.useContext(SnippetContext);
export const SnippetDispatchContext = React.createContext<SnippetDispatch | null>(
  null
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

    case SnippetActionType.ADD:
      const newSnippet = {
        ...(action.payload as AddSnippetPayload),
        id: faker.random.uuid(),
        lane: LaneType.Snippet,
      };
      draft.snippets.unshift(newSnippet);
      draft.moveableSnippets.unshift(newSnippet);
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

    case SnippetActionType.SWAP:
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

    case SnippetActionType.UPDATE:
      const { updatedSnippet } = action.payload as UpdateSnippetPayload;
      draft.draft = updateSnippetInArray({
        snippets: draft.draft,
        updatedSnippet,
      });
      draft.moveableSnippets = updateSnippetInArray({
        snippets: draft.moveableSnippets,
        updatedSnippet,
      });
      draft.snippets = updateSnippetInArray({
        snippets: draft.snippets,
        updatedSnippet,
      });
      return draft;

    case SnippetActionType.DELETE:
      const toDeleteId = (action.payload as DeleteSnippetPayload).id;
      draft.draft = deleteSnippetById({
        snippets: draft.draft,
        id: toDeleteId,
      });
      draft.moveableSnippets = deleteSnippetById({
        snippets: draft.moveableSnippets,
        id: toDeleteId,
      });
      draft.snippets = deleteSnippetById({
        snippets: draft.snippets,
        id: toDeleteId,
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

export const addSnippet = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: AddSnippetPayload
) =>
  dispatch({
    type: SnippetActionType.ADD,
    payload,
  });

export const swapSnippetsOrder = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: SwapSnippetsOrderPayload
) =>
  dispatch({
    type: SnippetActionType.SWAP,
    payload,
  });

export const updateSnippet = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: UpdateSnippetPayload
) =>
  dispatch({
    type: SnippetActionType.UPDATE,
    payload,
  });

export const deleteSnippet = (
  dispatch: React.Dispatch<SnippetAction>,
  payload: DeleteSnippetPayload
) =>
  dispatch({
    type: SnippetActionType.DELETE,
    payload,
  });
