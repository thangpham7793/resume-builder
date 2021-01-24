import {
  AddSnippetPayload,
  DeleteSnippetPayload,
  MementoSnippetState,
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

export const mementoSnippetState: MementoSnippetState = {
  currentState: initialState,
  history: {
    stack: [],
    popped: [],
  },
};

export const SnippetContext = React.createContext<MementoSnippetState>(
  mementoSnippetState
);

export const useSnippetContextDispatch = () =>
  React.useContext(SnippetDispatchContext) as SnippetDispatch;

export const useSnippetContext = () =>
  React.useContext(SnippetContext).currentState;
export const SnippetDispatchContext = React.createContext<SnippetDispatch | null>(
  null
);

export const useEditHistory = () => {
  const { stack, popped } = React.useContext(SnippetContext).history;
  return { canUndo: stack.length > 1, canRedo: popped.length > 0 };
};

// reducer
export const snippetReducer = (
  draft: MementoSnippetState,
  action: SnippetAction
) => {
  if (action.type === SnippetActionType.UNDO) {
    if (draft.history.stack.length > 1) {
      draft.history.popped.push(draft.currentState);
      draft.history.stack.pop();
      draft.currentState = draft.history.stack[
        draft.history.stack.length - 1
      ] as SnippetState;
    }
    return draft;
  }

  if (action.type === SnippetActionType.FORWARD) {
    if (draft.history.popped.length > 0) {
      draft.currentState = draft.history.popped.pop() as SnippetState;
      draft.history.stack.push(draft.currentState);
    }
    return draft;
  }

  if (action.type === SnippetActionType.ERROR) {
    draft.currentState.error = action.payload as Error;
    return draft;
  }

  // save snapshot on any actual state changes
  draft.history.stack = [...draft.history.stack, draft.currentState];
  switch (action.type) {
    case SnippetActionType.HYDRATE:
      const snippets = action.payload as ISnippet[];
      draft.currentState.snippets = snippets.filter(
        (s) => s.lane === LaneType.Snippet
      );
      draft.currentState.draft = snippets.filter(
        (s) => s.lane === LaneType.Draft
      );
      draft.currentState.moveableSnippets = [...draft.currentState.snippets];
      draft.currentState.loading = false;
      return draft;

    case SnippetActionType.ADD:
      const newSnippet = {
        ...(action.payload as AddSnippetPayload),
        id: faker.random.uuid(),
        lane: LaneType.Snippet,
      };
      draft.currentState.snippets.unshift(newSnippet);
      draft.currentState.moveableSnippets.unshift(newSnippet);
      return draft;

    case SnippetActionType.MOVE_TO_NEW_LANE:
      const {
        id,
        newLane,
        currentLane,
      } = action.payload as SnippetMovedPayload;

      if (newLane === currentLane) return draft;

      if (newLane === LaneType.Draft) {
        for (const snippet of draft.currentState.moveableSnippets) {
          if (snippet.id === id) {
            snippet.lane = newLane;
            draft.currentState.draft = [snippet, ...draft.currentState.draft];
            draft.currentState.moveableSnippets = deleteSnippetById({
              snippets: draft.currentState.moveableSnippets,
              id,
            });
            break;
          }
        }
      } else {
        for (const snippet of draft.currentState.draft) {
          if (snippet.id === id) {
            snippet.lane = newLane;
            draft.currentState.moveableSnippets = [
              snippet,
              ...draft.currentState.moveableSnippets,
            ];
            draft.currentState.draft = deleteSnippetById({
              snippets: draft.currentState.draft,
              id,
            });
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
      draft.currentState.draft = swapSnippets({
        snippets: draft.currentState.draft,
        currentId,
        droppedId,
      });
      return draft;

    case SnippetActionType.UPDATE:
      const { updatedSnippet } = action.payload as UpdateSnippetPayload;
      draft.currentState.draft = updateSnippetInArray({
        snippets: draft.currentState.draft,
        updatedSnippet,
      });
      draft.currentState.moveableSnippets = updateSnippetInArray({
        snippets: draft.currentState.moveableSnippets,
        updatedSnippet,
      });
      draft.currentState.snippets = updateSnippetInArray({
        snippets: draft.currentState.snippets,
        updatedSnippet,
      });
      return draft;

    case SnippetActionType.DELETE:
      const toDeleteId = (action.payload as DeleteSnippetPayload).id;
      draft.currentState.draft = deleteSnippetById({
        snippets: draft.currentState.draft,
        id: toDeleteId,
      });
      draft.currentState.moveableSnippets = deleteSnippetById({
        snippets: draft.currentState.moveableSnippets,
        id: toDeleteId,
      });
      draft.currentState.snippets = deleteSnippetById({
        snippets: draft.currentState.snippets,
        id: toDeleteId,
      });
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

export const undo = (dispatch: React.Dispatch<SnippetAction>) =>
  dispatch({
    type: SnippetActionType.UNDO,
  });

export const redo = (dispatch: React.Dispatch<SnippetAction>) =>
  dispatch({
    type: SnippetActionType.FORWARD,
  });
