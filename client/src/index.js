import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import CssBaseline from "@material-ui/core/CssBaseline";

import "react-toastify/dist/ReactToastify.css";
import AllContextProvider from "./context/AllContextProvider";

render(
  <BrowserRouter>
    <AllContextProvider>
      <CssBaseline />
      <App />
    </AllContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
