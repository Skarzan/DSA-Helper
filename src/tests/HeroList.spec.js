import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import HeroList from "../components/HeroList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import heroes from "../utils/test/heroes";

const mockStore = configureStore([]);
const store = mockStore({
  heroes
});

describe("<HeroList/>", () => {
  afterAll(cleanup);

  it("renders", () => {
    const { container } = render(
      <Provider store={store}>
        <HeroList></HeroList>
      </Provider>
    );

    const component = container.querySelector(".HeroList");
    expect(component).toBeTruthy;
  });

  it("should render 3 heroes", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <HeroList></HeroList>
      </Provider>
    );

    const heroList = getByTestId("heroList-heroes");
    expect(heroList.childElementCount).toBe(3);
  });

  it("should render warning text on empty heroList", () => {
    const { getByTestId } = render(
      <Provider
        store={mockStore({
          heroes: []
        })}
      >
        <HeroList></HeroList>
      </Provider>
    );

    const warning = getByTestId("heroList-warningText");
    expect(warning).toBeTruthy();
  });
});
