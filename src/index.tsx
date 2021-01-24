import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./containers/App";
import { ModalContextProvider } from "./contexts/ModalContext";
import React from "react";
import ReactDOM from "react-dom";
import { SnippetContextProvider } from "./contexts/SnippetContextProvider";
import { ThemeContextProvider } from "./theme/ThemeContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <SnippetContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </SnippetContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
