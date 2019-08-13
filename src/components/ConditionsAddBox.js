import React, { useState, useContext } from "react";

import conditionsInformation from "../assets/conditionsInformation";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function ConditionsAddBox(props) {
  const [roundsSwitch, setRoundsSwitch] = useState(false);

  const [formData, setFormData] = useState({
    conditionId: 0,
    level: "1",
    remainingRounds: "1"
  });

  const showOptions = () => {
    let options = [];
    for (let condition in conditionsInformation) {
      options.push(
        <option value={condition}>
          {conditionsInformation[condition].name}
        </option>
      );
    }
    return options;
  };

  const handleInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = e => {
    e.preventDefault();

    //manage rounds
    if (!roundsSwitch) {
      const helper = formData;
      helper.remainingRounds = null;
      setFormData(helper);
    }

    props.addCondition(formData);
  };

  const toggleRounds = () => {
    setRoundsSwitch(!roundsSwitch);
  };

  return (
    <Form.Row>
      <Col>
        <Form>
          <Form.Row>
            <Col sm="9">
              <Form.Label>Zustand</Form.Label>
              <Form.Control
                as="select"
                name="conditionId"
                value={formData.conditionId}
                onChange={e => {
                  handleInput(e);
                }}
              >
                {showOptions()}
              </Form.Control>
            </Col>
            <Col>
              {conditionsInformation[formData.conditionId].hasLevel ? (
                <div>
                  <Form.Label>Stufe</Form.Label>
                  <Form.Control
                    className="romanFont"
                    as="select"
                    name="level"
                    value={formData.level}
                    onChange={e => handleInput(e)}
                  >
                    <option value="1">I</option>
                    <option value="2">II</option>
                    <option value="3">III</option>
                    <option value="4">IV</option>
                  </Form.Control>
                </div>
              ) : (
                ""
              )}
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Kampfrunden</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    checked={roundsSwitch ? "checked" : ""}
                    onClick={() => {
                      toggleRounds();
                    }}
                  />
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  name="remainingRounds"
                  min="1"
                  disabled={roundsSwitch ? "" : "disabled"}
                  value={formData.remainingRounds}
                  onChange={e => {
                    handleInput(e);
                  }}
                />
              </InputGroup>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "right"
              }}
            >
              <Button
                type="submit"
                variant="secondary"
                onClick={e => submitData(e)}
              >
                Status hinzufügen
              </Button>
            </Col>
          </Form.Row>
          <Form.Row />
        </Form>
      </Col>
    </Form.Row>
  );
}
