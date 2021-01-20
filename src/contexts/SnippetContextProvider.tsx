import { LaneType, ISnippet } from "../types";
import React, { FC, useContext, useEffect } from "react";
import { getSnippets } from "../services/api";
import { useImmerReducer } from "use-immer";

export enum SnippetActionType {
  FETCH_TICKET = "FETCH_TICKET",
  TICKET_MOVED_TO_NEW_LANE = "TICKET_MOVED_TO_NEW_LANE",
  ERROR = "ERROR",
}

type Props = {
  children: React.ReactNode;
};

export type SnippetState = {
  snippets: ISnippet[];
  error: Error | null;
  loading: boolean;
};

type SnippetMovedPayload = { newLane: LaneType; snippetId: string };

export type SnippetAction = {
  type: SnippetActionType;
  payload?: ISnippet[] | ISnippet | Error | SnippetMovedPayload;
};

const initialState: SnippetState = { snippets: [], error: null, loading: true };
const snippetReducer = (draft: SnippetState, action: SnippetAction) => {
  switch (action.type) {
    case SnippetActionType.FETCH_TICKET:
      draft.snippets = action.payload as ISnippet[];
      draft.loading = false;
      return draft;
    case SnippetActionType.TICKET_MOVED_TO_NEW_LANE:
      const { snippetId, newLane } = action.payload as SnippetMovedPayload;
      for (const snippet of draft.snippets) {
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
        dispatch({ type: SnippetActionType.FETCH_TICKET, payload: snippets })
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
