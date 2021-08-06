import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
const store = configureStore();



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
