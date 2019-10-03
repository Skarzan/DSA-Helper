import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import enemys from "../utils/gameInformation/enemys";

import "../styles/characterCreator.scss";

/**
 * Creates a form to create a new character.
 * Can create hero or fighter, depending of the parent component.
 * Gives back the form values with the props.submitCharacter function.
 * @param {Object} props the props
 * @param {function} props.submitCharacter sends the data of the character form to parent function
 * @param {string} props.parent the parent compoenent name
 */
export default function CharacterCreator(props) {
  // initialize empty character
  let [character, setCharacter] = useState({
    name: "",
    maxSchips: 0,
    maxLep: 0,
    maxAsp: 0,
    maxKap: 0,
    initiative: 0,
    conditions: []
  });

  // fighter group
  const [group, setGroup] = useState(1);

  /**
   * Takes the name from the form element and changes the corresponding value in the state
   * @param {*} e event object
   */
  const handleChange = e => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  /**
   * Submits the state to the parent submitCharacter function.
   * Gives back the ew fighter, fighter group or hero
   * @param {*} e event object
   */
  const submit = e => {
    e.preventDefault();

    if (group > 1) {
      let fighters = [];
      //add enemys as many as defined in group-variable
      for (let index = 0; index < group; index++) {
        let fighter = { ...character };
        fighter.initiative =
          Number(fighter.initiative) + Math.floor(Math.random() * 6 + 1);
        fighter.name = `${fighter.name} ${index + 1}`;
        fighter.conditions = [];
        fighters[index] = fighter;
      }
      props.submitCharacter(fighters);
    } else {
      let fighter = { ...character };
      fighter.conditions = [];
      if (props.parent !== "heroList") {
        fighter.initiative =
          Number(fighter.initiative) + Math.floor(Math.random() * 6 + 1);
      }
      props.submitCharacter(fighter);
    }
  };

  /**
   * Creates a list of fighter stamps that will be displayed in a dropdown.
   */
  const createEnemyList = () => {
    return enemys.map((enemy, index) => {
      return (
        <option key={enemy.name} value={index}>
          {enemy.name}
        </option>
      );
    });
  };

  /**
   * Copy all values of the selected stamp in the form
   * @param {*} e event object
   */
  const setStampData = e => {
    setCharacter({ ...enemys[e.target.value] });
  };

  return (
    <div data-testid="characterCreator" className="characterCreator">
      <Form>
        {/*show only on battle*/ !(props.parent === "heroList") && (
          <Form.Row>
            <Col>
              <Form.Label>Vorgefertigter Kämpfer</Form.Label>
              <Form.Control
                as="select"
                name="fighterStamp"
                onChange={e => {
                  setStampData(e);
                }}
              >
                {createEnemyList()}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Gruppengröße</Form.Label>
              <Form.Control
                type="number"
                name="group"
                value={group}
                onChange={e => setGroup(e.target.value)}
                onClick={e => e.target.select()}
              />
            </Col>
          </Form.Row>
        )}

        <Form.Row>
          <Col>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={character.name}
              onChange={e => handleChange(e)}
              data-testid="name"
            />
          </Col>
          <Col>
            <Form.Row>
              <Col>
                <Form.Label>Basis Initiative: </Form.Label>
                <Form.Control
                  type="number"
                  name="initiative"
                  value={character.initiative}
                  onChange={e => handleChange(e)}
                  onClick={e => e.target.select()}
                  data-testid="initiative"
                />
              </Col>
              {props.parent === "heroList" && (
                <Col>
                  <Form.Label>max. Schips: </Form.Label>
                  <Form.Control
                    type="number"
                    name="maxSchips"
                    value={character.maxSchips}
                    onChange={e => handleChange(e)}
                    onClick={e => e.target.select()}
                    data-testid="schips"
                  />
                </Col>
              )}
            </Form.Row>
          </Col>
        </Form.Row>
        <Form.Row className="pointsSection">
          <Col>
            <Form.Label>max. LeP: </Form.Label>
            <Form.Control
              type="number"
              name="maxLep"
              value={character.maxLep}
              onChange={e => handleChange(e)}
              onClick={e => e.target.select()}
              data-testid="maxLep"
            />
          </Col>
          <Col>
            <Form.Label>max. AsP: </Form.Label>
            <Form.Control
              type="number"
              name="maxAsp"
              value={character.maxAsp}
              onChange={e => handleChange(e)}
              onClick={e => e.target.select()}
              data-testid="maxAsp"
            />
          </Col>
          <Col>
            <Form.Label>max. KaP: </Form.Label>
            <Form.Control
              type="number"
              name="maxKap"
              value={character.maxKap}
              onChange={e => handleChange(e)}
              onClick={e => e.target.select()}
              data-testid="maxKap"
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <div className="characterSubmitButton" onClick={e => submit(e)}>
              <Button
                type="submit"
                variant="secondary"
                data-testid="submitButton"
              >
                Erstellen
              </Button>
            </div>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
