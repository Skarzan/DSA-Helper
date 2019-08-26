import React from "react";
import { shallow } from "enzyme";

import BattleFighterList from "../components/BattleFighterList";

const fighter = [
  {
    name: "Peter",
    maxLep: "23",
    maxAsp: null,
    maxKap: null,
    initiative: "14",
    conditions: [],
    id: 0,
    LeP: "23",
    AsP: 0,
    KaP: 0,
    money: 0,
    isHero: true
  },
  {
    name: "Lobert",
    maxLep: "21",
    maxAsp: 0,
    maxKap: 0,
    initiative: "13",
    conditions: [],
    LeP: "21",
    AsP: 0,
    KaP: 0
  },
  {
    name: "Kalle",
    maxLep: "51",
    maxAsp: "21",
    maxKap: null,
    initiative: "11",
    conditions: [],
    id: 1,
    LeP: "51",
    AsP: "21",
    KaP: 0,
    money: 0,
    isHero: true
  }
];

describe("BattleFighterList component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <BattleFighterList
        fighter={fighter}
        activeFighter={1}
      ></BattleFighterList>
    );
  });

  it("should render", () => {
    const wrapper = component.find(".battleFighterList");
    expect(wrapper.length).toBe(1);
  });

  it("has as many fighters as in props", () => {
    const wrapper = component.find(`[data-test='fighter']`);
    expect(wrapper.length).toBe(3);
  });

  it("gives classes according to active Fighter", () => {
    const wrapper = component.find(".battleFighterList");
    expect(wrapper.childAt(1).prop("status")).toBe("notMoved active");
    expect(wrapper.childAt(0).prop("status")).not.toBe("notMoved active");
    expect(wrapper.childAt(2).prop("status")).not.toBe("notMoved active");
    expect(wrapper.childAt(0).prop("status")).toBe("moved");
    expect(wrapper.childAt(2).prop("status")).toBe("notMoved");
  });
});
