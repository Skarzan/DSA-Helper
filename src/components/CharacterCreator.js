import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import "../styles/characterCreator.scss";

/**
 * Creates a form to create a new character. Gives back the form values with the props.submitCharacter function
 * @param {Object} props the props
 * @param {function} props.submitCharacter sends the data of the character form to parent function
 */
export default function CharacterCreator(props) {
  // initialize empty character
  let [character, setCharacter] = useState({
    name: "",
    maxLep: 0,
    maxAsp: 0,
    maxKap: 0,
    initiative: 0,
    conditions: []
  });

  /**
   * Takes the name from the form element and changes the corresponding value in the state
   * @param {*} e event object
   */
  const handleChange = e => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  /**
   * Submits the state to the parent submitCharacter function
   * @param {*} e event object
   */
  const submit = e => {
    e.preventDefault();
    props.submitCharacter(character);
  };

  return (
    <div className="characterCreator">
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={character.name}
              onChange={e => handleChange(e)}
            />
          </Col>
          <Col>
            {" "}
            <Form.Label>Initiative: </Form.Label>
            <Form.Control
              type="number"
              name="initiative"
              value={character.initiative}
              onChange={e => handleChange(e)}
            />
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
            />
          </Col>
          <Col>
            <Form.Label>max. AsP: </Form.Label>
            <Form.Control
              type="number"
              name="maxAsp"
              value={character.maxAsp}
              onChange={e => handleChange(e)}
            />
          </Col>
          <Col>
            <Form.Label>max. KaP: </Form.Label>
            <Form.Control
              type="number"
              name="maxKap"
              value={character.maxKap}
              onChange={e => handleChange(e)}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <div className="characterSubmitButton">
              <Button
                type="submit"
                variant="secondary"
                onClick={e => submit(e)}
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
