import React from "react";
import styled from "styled-components";
import { Snippet } from "../components/Snippet/Snippet";
import { SnippetState } from "../contexts/SnippetContextProvider";

const SnippetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin: 1%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Alert = styled.div`
  text-align: center;
`;

export const SnippetsContainer = ({
  snippets,
  error,
  loading,
}: SnippetState) => {
  return (
    <SnippetsWrapper>
      {loading && "Fetching Snippets"}
      {error ? (
        <Alert>{error.message}</Alert>
      ) : (
        snippets.map((t) => <Snippet {...t} />)
      )}
    </SnippetsWrapper>
  );
};
