import React from "react";
import { shallow, mount } from "enzyme";

import ConditionIcon from "../components/ConditionIcon";

const setup = (props = {}) => {
  const component = shallow(<ConditionIcon {...props} />);
  return component;
};

describe("condition Icon component", () => {
  let component;

  beforeEach(() => {
    component = setup({
      condition: { conditionId: 2, level: 2, remainingRounds: null }
    });
  });

  it("should render", () => {
    const wrapper = component.find(".conditionIcon");
    expect(wrapper.length).toBe(1);
  });

  it("should have an image", () => {
    const wrapper = component.find(".conditionImage");
    expect(wrapper.length).toBe(1);
  });

  /*   it("displays the right level of condition", () => {
    const wrapper = component.find(".level");
    expect(wrapper.text()).toEqual("II");
  }); */

  it("should not render rounds when they are 0", () => {
    const wrapper = component.find(".remainingRounds");
    expect(wrapper.length).toBe(0);
  });
});

describe("conditionIcon component with other props", () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <ConditionIcon
        condition={{ conditionId: 16, level: 1, remainingRounds: 5 }}
      />
    );
  });

  it("should render correct rounds", () => {
    const wrapper = component.find(".remainingRounds");
    expect(wrapper.text()).toBe("5");
  });

  it("should not render level when there is no level", () => {
    const wrapper = component.find(".level");
    expect(wrapper.length).toBe(0);
  });
});
