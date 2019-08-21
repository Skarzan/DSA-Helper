import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";

import "../styles/heroFightAddForm.scss";

/**
 * Renders a form to add heroes to battle
 * @param {*} props the props
 */
export default function HeroFightAddForm(props) {
  const heroes = useSelector(state => state.heroes); // get the array of heroes from redux

  const [initiative, setInitiative] = useState([]);

  const handleChange = e => {
    let newState = initiative;
    newState[e.target.name] = e.target.value;
    setInitiative(newState);
  };

  const addHeroes = e => {
    e.preventDefault();
    props.addHeroes(initiative);
  };

  const showHeroForm = () => {
    return heroes.map((hero, index) => {
      return (
        <div className="singleHeroFrom">
          <h4>{hero.name}</h4>
          <Form.Control
            type="number"
            placeholder={`Initiative von ${hero.name}`}
            key={index}
            value={initiative[index]}
            onChange={e => handleChange(e)}
            name={index}
            min="0"
          />
        </div>
      );
    });
  };

  return (
    <div className="HeroFightAddForm">
      <h1 className="center">Füge Helden zum Kampf hinzu</h1>
      <Form>
        <div className="heroForm"> {showHeroForm()}</div>
        <div className="center">
          <Button type="submit" onClick={addHeroes}>
            Füge Helden hinzu
          </Button>
        </div>
      </Form>
    </div>
  );
}
