import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import heroes from "../utils/test/heroes";

import Battle from "../components/Battle";
import configureStore from "redux-mock-store";
//import heroesReducer from "../reducers/heroesReducer";

const mockStore = configureStore([]);
const store = mockStore({ heroes: heroes });

describe("Battle component", () => {
  let component;

  describe("heroes in store", () => {
    beforeEach(() => {
      component = mount(
        <Provider store={store}>
          <Battle />
        </Provider>
      );
    });

    it("should render", () => {
      expect(component.find(".battle").length).toBe(1);
    });

    it("render HeroFightAddForm", () => {
      expect(component.find("HeroFightAddForm").length).toBe(1);
    });

    /*     it("should give fighterList to <BattleFighterList/>", () => {
      const wrapper = component.instance();
      const test = wrapper.fighterListNotEmpty();
      console.log(test);
    }); */
  });

  describe("no heroes in store", () => {
    beforeEach(() => {
      component = mount(
        <Provider store={mockStore({ heroes: [] })}>
          <Battle />
        </Provider>
      );
    });
  });

  afterEach(() => {
    component.unmount();
  });
});
