import React from "react";

import { useSelector } from "react-redux";

/**
 * Renders a form to add heroes to battle
 * @param {*} props the props
 */
export default function HeroFightAddForm(props) {
  const heroes = useSelector(state => state.heroes); // get the array of heroes from redux

  const showHeroForm = () => {
    return heroes.map(hero => {
      return <div>{hero.name}</div>;
    });
  };

  return (
    <div className="HeroFightAddForm">
      <h1>Füge Helden zum Kampf hinzu</h1>
      <div>{showHeroForm()}</div>
    </div>
  );
}
