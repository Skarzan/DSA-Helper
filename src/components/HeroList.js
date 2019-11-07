import React from "react";
import Hero from "./Hero";
import CharacterCreator from "./CharacterCreator";
import Button from "react-bootstrap/Button";
import { showModal, closeModal, addHero } from "../actions";

import { ReactComponent as UserPlusButton } from "../assets/svg/icons/user-plus.svg";
//import firebaseDB from "../firebase/firebase";

//Redux
import { useSelector, useDispatch } from "react-redux";

import "../styles/heroList.scss";

/**
 * Renders a list of Hero - Components. Holds and manages the hero list with Redux actions.
 * Containing a button that shows a modal to add ne Heroes
 */
export default function HeroList() {
  const dispatch = useDispatch();
  const heroes = useSelector(state => state.heroes); // get the array of heroes from redux

  /**
   * Creates Hero - Components for all heroes in the heroes - array
   */
  const showHeroes = () => {
    return heroes.map((hero, index) => {
      return <Hero hero={hero} key={index} />;
    });
  };

  /**
   * Adds a new hero to the hero list by calling the corrosponding redux function
   * @param {Object} hero the new hero
   */
  const addNewHero = hero => {
    dispatch(addHero([hero]));
    dispatch(closeModal());
  };

  /**
   * Shows a modal with the characterCreator form
   */
  const showCharacterCreator = () => {
    const creator = (
      <CharacterCreator submitCharacter={addNewHero} parent={"heroList"} />
    );
    dispatch(showModal(["Neuer Held", creator]));
  };

  return (
    <div className="heroList">
      {!heroes.length > 0 && (
        <h1 className="noHeroText center" data-testid="heroList-warningText">
          Füge Helden zur Gruppe hinzu
        </h1>
      )}
      <div className="heroes" data-testid="heroList-heroes">
        {showHeroes()}
      </div>
      <div className="heroCreateButton">
        <Button
          className="center"
          size="lg"
          onClick={() => showCharacterCreator()}
          data-testid="heroList-newHeroButton"
        >
          Held hinzufügen <UserPlusButton className="svgIconButton" />
        </Button>
      </div>
    </div>
  );
}
