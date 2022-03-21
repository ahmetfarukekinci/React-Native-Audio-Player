import React from "react";
import Navigator from "./src/navigation/app";
import store from "./src/app/store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
