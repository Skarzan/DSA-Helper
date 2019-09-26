import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";

import "../styles/heroFightAddForm.scss";

/**
 * Renders a form to add the heroes to battle.
 * User has to fill in the initiative for each hero.
 * @param {*} props the props
 */
export default function HeroFightAddForm(props) {
  //the heroes array
  const heroes = useSelector(state => state.heroes); // get the array of heroes from redux

  //array of the heroes - initiative in order of heroes in heroes - variable
  const [initiative, setInitiative] = useState([]);

  /**
   * Changes the initiative data on user changings
   * @param {object} e the change event
   */
  const handleChange = e => {
    let newState = initiative;
    newState[e.target.name] = e.target.value;
    setInitiative(newState);
  };

  /**
   * calls the parent components addHeroes function and gives the initiative array back
   * @param {object} e the click event
   */
  const addHeroes = e => {
    e.preventDefault();
    props.addHeroes(initiative);
  };

  /**
   * Renders a form to fill in initiative for each hero in the heroes array
   */
  const showHeroForm = () => {
    return heroes.map((hero, index) => {
      return (
        <div className="singleHeroForm" key={index}>
          <h4 data-testid="heroName">{hero.name}</h4>
          <Form.Control
            type="number"
            placeholder={`0`}
            value={initiative[index]}
            onChange={e => handleChange(e)}
            name={index}
            min="0"
            data-testid="initiativeInput"
          />
        </div>
      );
    });
  };

  return (
    <div className="HeroFightAddForm">
      <h1 className="center">Füge Helden zum Kampf hinzu</h1>
      <h2 className="center">Trage die Initiative ein</h2>
      <Form>
        <div className="heroForm"> {showHeroForm()}</div>
        <div className="center">
          <Button
            className="addHeroesButton"
            type="submit"
            onClick={addHeroes}
            data-testid="submitButton"
          >
            Füge Helden hinzu
          </Button>
        </div>
      </Form>
    </div>
  );
}
