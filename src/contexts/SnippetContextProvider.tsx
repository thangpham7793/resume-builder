import React, { FC, useEffect } from "react";
import {
  SnippetContext,
  SnippetDispatchContext,
  addSnippet,
  deleteSnippet,
  hydrateState,
  mementoSnippetState,
  moveSnippet,
  raiseFetchSnippetError,
  redo,
  snippetReducer,
  swapSnippetsOrder,
  undo,
  updateSnippet,
} from "./SnippetContext";

import { SnippetContextPublicMethod } from "./types";
import { getSnippets } from "../services/api";
import { useImmerReducer } from "use-immer";

type Props = {
  children: React.ReactNode;
};

export const SnippetContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(
    snippetReducer,
    mementoSnippetState
  );

  const withDispatch = React.useCallback(
    (method: SnippetContextPublicMethod) => (
      payload: Parameters<typeof method>[1] //the payload of a particular method
    ) => {
      method(dispatch, payload);
    },
    [dispatch]
  );

  useEffect(() => {
    getSnippets()
      .then((snippets) => withDispatch(hydrateState)(snippets))
      .catch((error: Error) => withDispatch(raiseFetchSnippetError)(error));
  }, [withDispatch]);

  return (
    <SnippetDispatchContext.Provider
      value={{
        addSnippet: withDispatch(addSnippet),
        moveSnippet: withDispatch(moveSnippet),
        swapSnippetsOrder: withDispatch(swapSnippetsOrder),
        deleteSnippet: withDispatch(deleteSnippet),
        updateSnippet: withDispatch(updateSnippet),
        undo: withDispatch(undo),
        redo: withDispatch(redo),
      }}
    >
      <SnippetContext.Provider value={state}>
        {children}
      </SnippetContext.Provider>
    </SnippetDispatchContext.Provider>
  );
};
