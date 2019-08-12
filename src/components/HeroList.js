import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import CharacterCreator from "./CharacterCreator";
import Button from "react-bootstrap/Button";
import { showModal, closeModal, addHero } from "../actions";

//Redux
import { useSelector, useDispatch } from "react-redux";

import "../styles/heroList.scss";

export default function HeroList() {
  const dispatch = useDispatch();
  const heroes = useSelector(state => state.heroes);

  let showHeroes = () => {
    return heroes.map(hero => {
      return <Hero hero={hero} />;
    });
  };

  const addNewHero = hero => {
    dispatch(addHero([hero]));
    dispatch(closeModal());
  };

  const showCharacterCreator = () => {
    const creator = <CharacterCreator submitCharacter={addNewHero} />;
    dispatch(showModal(["Neuer Held", creator]));
  };

  return (
    <div className="heroList">
      <h1 className="party">Heldengruppe</h1>
      <div className="heroes">{showHeroes()}</div>
      <div className="heroCreateButton">
        <Button size="lg" onClick={() => showCharacterCreator()}>
          Neuer Held
        </Button>
      </div>
    </div>
  );
}
