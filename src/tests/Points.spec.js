import React from "react";
import { shallow } from "enzyme";

import Points from "../components/Points";

const setup = (props = {}) => {
  const component = shallow(<Points {...props} />);
  return component;
};

const setPoints = jest.fn();

describe("Points Component", () => {
  let component;

  describe("without props", () => {
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

  it("doesnt add more than max points", () => {
    const component = setup({ current: 30, maxpoints: 30 });
    component.find(".addButton").simulate("click");
    expect(setPoints).not.toHaveBeenCalled();
  });

  describe("with props", () => {
    beforeEach(() => {
      component = setup({
        name: "LeP",
        setPoint: setPoints,
        current: 21,
        maxPoints: 35
      });
    });

    it("calls change function on button click", () => {
      component.find(".addButton").simulate("click");
      component.find(".subButton").simulate("click");

      expect(setPoints).toHaveBeenCalledTimes(2);
    });

    it("sets right class for progressBar", () => {
      const progressBar = component.find(".pointsHero");
      expect(progressBar.hasClass("LeP")).toEqual(true);
    });

    describe("progressBar", () => {
      let progressBar;

      beforeEach(() => {
        progressBar = component.find(".pointsHero");
      });

      it("sets right variant for progressBar", () => {
        expect(progressBar.prop("variant")).toBe("danger");
      });

      it("calculates progressBars correct", () => {
        expect(progressBar.prop("now")).toBe(60);
      });

      it("has label of props", () => {
        expect(progressBar.prop("label")).toBe("LeP: 21/35");
      });
    });
  });
});
