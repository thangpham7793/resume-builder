import React, { FC, useEffect } from "react";
import { getSnippets } from "../services/api";
import { useImmerReducer } from "use-immer";
import {
  initialState,
  SnippetContext,
  SnippetDispatchContext,
  snippetReducer,
  hydrateState,
  moveSnippet,
  raiseFetchSnippetError,
  swapSnippetsOrder,
} from "./SnippetContext";
import { SnippetContextPublicMethod } from "./types";

type Props = {
  children: React.ReactNode;
};

export const SnippetContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(snippetReducer, initialState);

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
        moveSnippet: withDispatch(moveSnippet),
        swapSnippetsOrder: withDispatch(swapSnippetsOrder),
      }}
    >
      <SnippetContext.Provider value={state}>
        {children}
      </SnippetContext.Provider>
    </SnippetDispatchContext.Provider>
  );
};
