import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Hero from "../components/Hero";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import heroes from "../utils/test/heroes";

const mockStore = configureStore([]);
const store = mockStore({
  heroes
});

const setup = heroId => {
  return render(
    <Provider store={store}>
      <Hero hero={heroes[heroId]} />
    </Provider>
  );
};

describe("<Hero/>", () => {
  afterEach(cleanup);

  it("renders", () => {
    const { container } = setup(0);
    const component = container.querySelector(".hero");
    expect(component).toBeTruthy();
  });

  it("renders LeP", () => {
    const { getByTestId } = setup(0);
    const LeP = getByTestId("hero-LeP");
    expect(LeP).toBeTruthy();
  });

  it("renders AsP", () => {
    const { queryByTestId } = setup(0);
    const AsP = queryByTestId("hero-AsP");
    const KaP = queryByTestId("hero-KaP");
    expect(AsP).toBeTruthy();
    expect(KaP).not.toBeTruthy();
  });

  it("renders KaP", () => {
    const { queryByTestId } = setup(2);
    const AsP = queryByTestId("hero-AsP");
    const KaP = queryByTestId("hero-KaP");
    expect(AsP).not.toBeTruthy();
    expect(KaP).toBeTruthy();
  });

  it("renders hero name", () => {
    const { queryByTestId } = setup(2);
    const name = queryByTestId("hero-name");
    expect(name.textContent).toBe("Priester");
  });

  it("renders 2 conditions", () => {
    const { container } = setup(1);
    const conditionBox = container.querySelector(".conditionBox");
    expect(conditionBox.childElementCount).toBe(2);
  });
});
