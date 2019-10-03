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
      <CharacterCreator submitCharacter={submitCharacter} parent="heroList" />
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
      maxKap: 0,
      maxSchips: 0
    });
  });

  it("calls prop function with filled out form", () => {
    const { getByTestId } = render(
      <CharacterCreator submitCharacter={submitCharacter} parent="heroList" />
    );
    const nameField = getByTestId("name");
    fireEvent.change(nameField, {
      target: { value: "Galarius", name: "name" }
    });

    const initiative = getByTestId("initiative");
    fireEvent.change(initiative, {
      target: { value: 14, name: "initiative" }
    });

    const maxLep = getByTestId("maxLep");
    fireEvent.change(maxLep, {
      target: { value: 34, name: "maxLep" }
    });

    const maxAsp = getByTestId("maxAsp");
    fireEvent.change(maxAsp, {
      target: { value: 25, name: "maxAsp" }
    });

    const submitButton = getByTestId("submitButton");
    fireEvent.click(submitButton);
    expect(submitCharacter).toHaveBeenLastCalledWith({
      name: "Galarius",
      initiative: "14",
      conditions: [],
      maxLep: "34",
      maxAsp: "25",
      maxKap: 0,
      maxSchips: 0
    });
  });

  /*   it("does´nt show initiative if parent is heroList", () => {
    const { queryByTestId } = render(
      <CharacterCreator submitCharacter={submitCharacter} parent="heroList" />
    );
    expect(queryByTestId("initiative")).not.toBeTruthy();
  }); */
});
