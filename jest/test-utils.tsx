import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../src/app/store";
type OptionType = RenderOptions | undefined;
interface ProviderArg {
  children: {};
}
const AllTheProviders = ({ children }: ProviderArg) => {
  return (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: OptionType) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";

export { customRender as render };
