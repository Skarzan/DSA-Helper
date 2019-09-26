import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ConditionBox from "../components/ConditionBox";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import heroes from "../utils/test/heroes";

const mockStore = configureStore([]);
const store = mockStore({
  heroes
});

const conditions = [
  {
    conditionId: 3,
    level: "3",
    remainingRounds: "4"
  },
  {
    conditionId: 1,
    level: "2",
    remainingRounds: null
  },
  {
    conditionId: 15,
    level: "1",
    remainingRounds: null
  },
  {
    conditionId: 17,
    level: "1",
    remainingRounds: "14"
  }
];

describe("<ConditionBox/>", () => {
  afterAll(cleanup);

  it("renders", () => {
    const { container } = render(
      <Provider store={store}>
        <ConditionBox conditions={conditions} />
      </Provider>
    );

    const component = container.querySelector(".conditionBox");
    expect(component).toBeTruthy;
  });

  it("renders all conditions", () => {
    const { container } = render(
      <Provider store={store}>
        <ConditionBox conditions={conditions} />
      </Provider>
    );
    const component = container.querySelector(".conditionBox");
    expect(component.childElementCount).toBe(4);
  });
});
