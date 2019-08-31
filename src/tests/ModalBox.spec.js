import React from "react";
import { render, cleanup } from "@testing-library/react";
import ModalBox from "../components/ModalBox";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  modal: { heading: "Heading", text: "Body Text", show: true }
});

describe("<Modal/>", () => {
  afterAll(cleanup);

  it("renders", () => {
    const { container } = render(
      <Provider store={store}>
        <ModalBox />
      </Provider>
    );
    const component = container.querySelector(".ModalBox");
    expect(component).toBeTruthy();
  });

  it("render store Modals", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ModalBox />
      </Provider>
    );

    const heading = queryByText("Heading");
    expect(heading).toBeTruthy();
    const body = queryByText("Body Text");
    expect(body).toBeTruthy();
  });
});
