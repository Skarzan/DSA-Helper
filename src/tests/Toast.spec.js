import React from "react";
import { render, cleanup } from "@testing-library/react";
import Toast from "../components/Toast";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  toast: [
    { active: true, header: "Heading", body: "Body Text" },
    { active: true, header: "Second Heading", body: " Second Body Text" }
  ]
});

describe("<Toast/>", () => {
  afterAll(cleanup);

  it("renders", () => {
    const { container } = render(
      <Provider store={store}>
        <Toast />
      </Provider>
    );
    const component = container.querySelector(".Toast");
    expect(component).toBeTruthy();
  });

  it("render store toasts", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <Toast />
      </Provider>
    );

    const heading = queryByText("Heading");
    expect(heading).toBeTruthy();
    const body = queryByText("Body Text");
    expect(body).toBeTruthy();
  });

  it("should render as many toasts as in the store", () => {
    const { container } = render(
      <Provider store={store}>
        <Toast />
      </Provider>
    );
    const component = container.querySelector(".Toast");
    expect(component.childElementCount).toBe(2);
  });
});
