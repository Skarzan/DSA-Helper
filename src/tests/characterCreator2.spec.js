//import React from "react";
//import '@testing-library/jest-dom/extend-expect'
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import CharacterCreator from "../components/CharacterCreator";

const submitCharacter = jest.fn();

describe("<CharacterCreator/>", () => {
  afterEach(cleanup);

  it("renders", () => {
    const { getByTestId } = render(<CharacterCreator />);
    const component = getByTestId("characterCreator");
    expect(component).toBeTruthy();
  });

  /*   it("matches snapshot", () => {
    const { asFragment } = render(<CharacterCreator />);
    expect(asFragment()).toMatchSnapshot();
  }); */

  it("changes name", () => {
    const { getByTestId } = render(<CharacterCreator />);

    const nameField = getByTestId("name");
    expect(nameField.value).toBe("");
    fireEvent.change(nameField, {
      target: { value: "Galarius", name: "name" }
    });
    expect(nameField.value).toBe("Galarius");
  });

  it("calls prop function", () => {
    const { getByTestId } = render(
      <CharacterCreator submitCharacter={submitCharacter} />
    );
    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);

    expect(submitCharacter).toBeCalled();
  });

  it("calls prop function with changed name", () => {
    const { getByTestId } = render(
      <CharacterCreator submitCharacter={submitCharacter} />
    );
    const nameField = getByTestId("name");
    fireEvent.change(nameField, {
      target: { value: "Galarius", name: "name" }
    });

    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);
    expect(submitCharacter).toHaveBeenLastCalledWith({
      name: "Galarius",
      initiative: 0,
      conditions: [],
      maxLep: 0,
      maxAsp: 0,
      maxKap: 0
    });
  });
});
