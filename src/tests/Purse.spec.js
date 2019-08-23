import React from "react";
import { shallow, mount } from "enzyme";

import Purse from "../components/Purse";

describe("Purse", () => {
  let component;

  beforeEach(() => {
    component = mount(<Purse money="12345" />);
  });

  it("should render", () => {
    const wrapper = component.find(".purse");
    expect(wrapper.length).toBe(1);
  });

  it("has 4 purseSections", () => {
    expect(component.find(".purseSection").length).toBe(4);
  });

  it("has 8 change buttons", () => {
    expect(component.find("Button").length).toBe(8);
  });

  afterEach(() => {
    component.unmount();
  });
});
