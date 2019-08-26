import React from "react";
import { mount } from "enzyme";

import ConditionsAddBox from "../components/ConditionsAddBox";

import conditionsInformation from "../assets/conditionsInformation";

const addCondition = jest.fn();

describe("ConditionsAddBox component", () => {
  let component;
  beforeEach(() => {
    component = mount(
      <ConditionsAddBox addCondition={addCondition}></ConditionsAddBox>
    );
  });

  it("should render", () => {
    const wrapper = component.find(".ConditionsAddBox");
    expect(wrapper.length).toBe(1);
  });

  it("should call props function on button click", () => {
    component.find("Button").simulate("click");
    expect(addCondition).toHaveBeenCalled();
  });

  it("should have as many conditions as in conditionsInformation", () => {
    const wrapper = component.find(".conditionChooser");
    expect(wrapper.find("option").length).toBe(
      Object.keys(conditionsInformation).length
    );
  });

  afterEach(() => {
    component.unmount();
  });
});

/* it("should not show level when condition has no level", () => {
  const component = shallow(
    <ConditionsAddBox addCondition={addCondition}></ConditionsAddBox>
  );
  const wrapper = component.find(".conditionChooser");
  wrapper.simulate("change", { target: { value: 17 } });
  expect(wrapper.prop("value")).toBe(17);
}); */
