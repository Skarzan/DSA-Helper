import React, { useEffect } from "react";
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

  /*   useEffect(() => {
    return () => {
      firebaseDB
        .collection("DSA")
        .doc("heroes")
        .set({ heroes })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    };
  }, []); */

  /**
   * Creates Hero - Components for all heroes in the heroes - array
   */
  const showHeroes = () => {
    return heroes.map(hero => {
      return <Hero hero={hero} />;
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
    const creator = <CharacterCreator submitCharacter={addNewHero} />;
    dispatch(showModal(["Neuer Held", creator]));
  };

  return (
    <div className="heroList">
      <div className="heroes">{showHeroes()}</div>
      <div className="heroCreateButton">
        <Button size="lg" onClick={() => showCharacterCreator()}>
          Neuer Held <UserPlusButton className="svgIconButton" />
        </Button>
      </div>
    </div>
  );
}
