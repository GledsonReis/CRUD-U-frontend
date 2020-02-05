import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from 'easy-peasy'
import App from "./main/App";
import store from './store'
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  rootElement,
);
