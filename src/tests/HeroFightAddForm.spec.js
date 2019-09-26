import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import HeroFightAddForm from "../components/HeroFightAddForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import heroes from "../utils/test/heroes";

const mockStore = configureStore([]);
const store = mockStore({
  heroes
});

const addHeroes = jest.fn();
afterEach(cleanup);

describe("<HeroFightAddForm/>", () => {
  it("renders heroes as many as in store", () => {
    const { container } = render(
      <Provider store={store}>
        <HeroFightAddForm addHeroes={addHeroes}></HeroFightAddForm>
      </Provider>
    );

    const component = container.querySelector(".heroForm");
    expect(component).toBeTruthy();
    expect(component.childElementCount).toBe(3);
  });

  it("shows hero names", () => {
    const { queryAllByTestId } = render(
      <Provider store={store}>
        <HeroFightAddForm addHeroes={addHeroes}></HeroFightAddForm>
      </Provider>
    );

    const component = queryAllByTestId("heroName");
    expect(component[0].textContent).toEqual("Galarius");
    expect(component[1].textContent).toEqual("Lizy");
    expect(component[2].textContent).toEqual("Priester");
  });

  it("calls prop function with right values", () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <HeroFightAddForm addHeroes={addHeroes}></HeroFightAddForm>
      </Provider>
    );
    const inputs = getAllByTestId("initiativeInput");
    expect(inputs.length).toBe(3);

    inputs.forEach((element, index) => {
      fireEvent.change(element, { target: { name: index, value: index } });
    });

    const submitButton = getByTestId("submitButton");

    fireEvent.click(submitButton);
    expect(addHeroes).toHaveBeenCalledWith(["0", "1", "2"]);
  });
});
