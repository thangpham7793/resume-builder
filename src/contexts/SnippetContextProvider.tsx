import { LaneType, ISnippet } from "../types";
import React, { FC, useContext, useEffect } from "react";
import { getSnippets } from "../services/api";
import { useImmerReducer } from "use-immer";

export enum SnippetActionType {
  FETCH_SNIPPET = "FETCH_SNIPPET",
  MOVE_SNIPPET = "MOVE_SNIPPET",
  ERROR = "ERROR",
}

type Props = {
  children: React.ReactNode;
};

export type SnippetState = {
  snippets: ISnippet[];
  moveableSnippets: ISnippet[];
  error: Error | null;
  loading: boolean;
  draft: ISnippet[];
};

type SnippetMovedPayload = { newLane: LaneType; snippetId: string };

export type SnippetAction = {
  type: SnippetActionType;
  payload?: ISnippet[] | ISnippet | Error | SnippetMovedPayload;
};

const initialState: SnippetState = {
  snippets: [],
  moveableSnippets: [],
  error: null,
  loading: true,
  draft: [],
};
const snippetReducer = (draft: SnippetState, action: SnippetAction) => {
  console.log(`Received action:`, action.type);
  switch (action.type) {
    case SnippetActionType.FETCH_SNIPPET:
      draft.snippets = action.payload as ISnippet[];
      draft.moveableSnippets = [...draft.snippets];
      draft.loading = false;
      return draft;
    case SnippetActionType.MOVE_SNIPPET:
      const { snippetId, newLane } = action.payload as SnippetMovedPayload;
      for (const snippet of draft.moveableSnippets) {
        if (snippet.id === snippetId) {
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

const SnippetContext = React.createContext<SnippetState>(initialState);

export const useSnippetContext = () => useContext(SnippetContext);
const SnippetDispatchContext = React.createContext<null | React.Dispatch<SnippetAction>>(
  null
);

// dispatch will be initialized when this hook is called
export const useSnippetContextDispatch = (): React.Dispatch<SnippetAction> =>
  useContext(SnippetDispatchContext) as React.Dispatch<SnippetAction>;

export const SnippetContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(snippetReducer, initialState);
  useEffect(() => {
    getSnippets()
      .then((snippets) =>
        dispatch({ type: SnippetActionType.FETCH_SNIPPET, payload: snippets })
      )
      .catch((error) =>
        dispatch({ type: SnippetActionType.ERROR, payload: error })
      );
  }, [dispatch]);

  return (
    <SnippetDispatchContext.Provider value={dispatch}>
      <SnippetContext.Provider value={state}>
        {children}
      </SnippetContext.Provider>
    </SnippetDispatchContext.Provider>
  );
};
