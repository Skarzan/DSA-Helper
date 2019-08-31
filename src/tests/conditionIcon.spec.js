import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ConditionIcon from "../components/ConditionIcon";

const setup = condition => {
  return render(<ConditionIcon condition={condition} />);
};

const sampleCondition = {
  conditionId: 3,
  level: "3",
  remainingRounds: "4"
};

describe("<ConditionIcon/>", () => {
  afterEach(cleanup);

  it("renders", () => {
    const { container } = setup(sampleCondition);
    const component = container.querySelector(".conditionIcon");
    expect(component).toBeTruthy();
  });

  it("");
});
