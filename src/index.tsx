import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle, LoadFont } from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./contexts/store";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoadFont />
          <GlobalStyle />
          <App />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
