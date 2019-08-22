import React from "react";
import { shallow } from "enzyme";
import Points from "../components/Points";

const setup = props => {
  const component = shallow(<Points {...props} />);
  return component;
};

describe("Points Component", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it("should render", () => {
    const wrapper = component.find(".pointsContainer");
    expect(wrapper.length).toBe(1);
  });

  it("has two pointButtons", () => {
    const wrapper = component.find(".pointsButton");
    expect(wrapper.length).toBe(2);
  });
});
