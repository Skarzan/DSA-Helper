import React from "react";
import { shallow } from "enzyme";

import CharacterCreator from "../components/CharacterCreator";

const submitCharacter = jest.fn();

describe("<CharacterCreator/>", () => {
  let component;

  beforeEach(() => {
    component = shallow(<CharacterCreator submitCharacter={submitCharacter} />);
  });

  it("renders", () => {
    const wrapper = component.find(".characterCreator");
    expect(wrapper.length).toBe(1);
  });

  it("calls submit on button Click", () => {
    component
      .find(".characterSubmitButton")
      .simulate("click", { preventDefault() {} });
    expect(submitCharacter).toBeCalled();
  });

  /*   it("submit with vlaues", () => {
    const name = component.find(`[name='name']`);
    const initiative = component.find(`[name='initiative']`);
    const maxLeP = component.find(`[name='maxLep']`);
    const maxAsP = component.find(`[name='maxAsp']`);
    //expect(wrapper.length).toBe(1);

    name.simulate("change", { target: { name: "name", value: "Galarius" } });
    initiative.simulate("change", {
      target: { name: "initiative", value: 12 }
    });
    maxLeP.simulate("change", { target: { name: "maxLep", value: 50 } });
    maxAsP.simulate("change", { target: { name: "maxAsp", value: 23 } });

  }); */
});
