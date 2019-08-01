import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../styles/characterCreator.scss";

export default function CharacterCreator(props) {
  let [character, setCharacter] = useState({
    name: "",
    maxLep: 0,
    maxAsp: 0,
    maxKap: 0,
    initiative: 0
  });

  let handleChange = e => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  return (
    <div className="characterCreator">
      <Form>
        <h3>Neuer Charakter</h3>
        <Form.Group controlId="formName">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={character.name}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formLep">
          <Form.Label>max. LeP: </Form.Label>
          <Form.Control
            type="number"
            name="maxLep"
            value={character.maxLep}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formAsp">
          <Form.Label>max. AsP: </Form.Label>
          <Form.Control
            type="number"
            name="maxAsp"
            value={character.maxAsp}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formKap">
          <Form.Label>max. KaP: </Form.Label>
          <Form.Control
            type="number"
            name="maxKap"
            value={character.maxKap}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formInitiative">
          <Form.Label>Initiative: </Form.Label>
          <Form.Control
            type="number"
            name="initiative"
            value={character.initiative}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Button
          variant="secondary"
          onClick={() => props.submitCharacter(character)}
        >
          Fertig
        </Button>
      </Form>
    </div>
  );
}
