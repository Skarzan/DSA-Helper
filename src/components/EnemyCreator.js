import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import fire from "../firebase/firebase";

export default function EnemyCreator() {
  const firebaseDB = fire.firestore();

  const [enemy, setEnemy] = useState({
    name: "",
    initiative: "0",
    maxLep: "0",
    maxAsp: "0",
    maxKap: "0",
    wikiLink: ""
  });

  const handleChange = e => {
    setEnemy({ ...enemy, [e.target.name]: e.target.value });
  };

  const submit = e => {
    e.preventDefault();

    firebaseDB
      .collection("enemys")
      .doc(enemy.name)
      .set(enemy)
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });

    console.log(enemy);
    setEnemy({
      name: "",
      initiative: "0",
      maxLep: "0",
      maxAsp: "0",
      maxKap: "0",
      wikiLink: ""
    });
  };

  return (
    <div style={{ color: "white", margin: "40px" }}>
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={enemy.name}
              onChange={e => handleChange(e)}
            />
          </Col>
          <Col>
            <Form.Label>Basis Initiative</Form.Label>
            <Form.Control
              type="number"
              name="initiative"
              value={enemy.initiative}
              onChange={e => handleChange(e)}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label>max. LeP</Form.Label>
            <Form.Control
              type="number"
              name="maxLep"
              value={enemy.maxLep}
              onChange={e => handleChange(e)}
            />
          </Col>
          <Col>
            <Form.Label>max Asp</Form.Label>
            <Form.Control
              type="number"
              name="maxAsp"
              value={enemy.maxAsp}
              onChange={e => handleChange(e)}
            />
          </Col>
          <Col>
            <Form.Label>max Kap</Form.Label>
            <Form.Control
              type="number"
              name="maxKap"
              value={enemy.maxKap}
              onChange={e => handleChange(e)}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label>Wiki - Link</Form.Label>
            <Form.Control
              type="text"
              name="wikiLink"
              value={enemy.wikiLink}
              onChange={e => handleChange(e)}
            />
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <div>
              <Button
                style={{ marginTop: "5px" }}
                type="submit"
                name="submit"
                onClick={e => submit(e)}
              >
                Speichern
              </Button>
            </div>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
