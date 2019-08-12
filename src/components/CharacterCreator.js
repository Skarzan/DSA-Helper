import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import "../styles/characterCreator.scss";

export default function CharacterCreator(props) {
  let [character, setCharacter] = useState({
    name: "",
    maxLep: 0,
    maxAsp: 0,
    maxKap: 0,
    initiative: 0,
    conditions: []
  });

  let handleChange = e => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const submit = e => {
    e.preventDefault();
    console.log(props);
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
        <Form.Row>
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
            <Button type="submit" variant="secondary" onClick={e => submit(e)}>
              Fertig
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
