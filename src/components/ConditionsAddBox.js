import React, { useState } from "react";

import conditionsInformation from "../utils/gameInformation/conditionsInformation";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

/**
 * Renders a form to create a new condition. Gives options to choose from a condition from a list or a custom condition
 * @param {object} props the props
 * @param {function} props.addCondition function to add this condition to the parent component
 */
export default function ConditionsAddBox(props) {
  // switch to allow or not allow changings on rounds option
  const [roundsSwitch, setRoundsSwitch] = useState(false);

  // the data of the form resembling one condition.
  const [formData, setFormData] = useState({
    conditionId: 0,
    level: "1",
    remainingRounds: "1",
    name: ""
  });

  /**
   * Creates a list of <option> elements. One for every condition in the list
   */
  const showOptions = () => {
    let options = [];

    // create an <option> element for each condition
    for (let condition in conditionsInformation) {
      options.push(
        <option key={condition} value={condition}>
          {conditionsInformation[condition].name}
        </option>
      );
    }
    return options;
  };

  /**
   * Update the form data on user change
   * @param {Object} e change event
   */
  const handleInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Toggles the option to alter the rounds variable
   */
  const toggleRounds = () => {
    setRoundsSwitch(!roundsSwitch);
  };

  /**
   * Sends the data of the new condition to the parent components addCondition function
   * @param {Object} e the click event
   */
  const submitData = e => {
    e.preventDefault();

    // is condition a default condition?
    if (formData.conditionId !== "custom") {
      const helper = formData;
      helper.name = null;
      setFormData(helper);
    }

    // is condition a custom condition condition?
    if (!roundsSwitch) {
      const helper = formData;
      helper.remainingRounds = null;
      setFormData(helper);
    }

    props.addCondition(formData); //send condition data
  };

  return (
    <div className="ConditionsAddBox">
      <Form.Row>
        <Col>
          <Form>
            <Form.Row>
              <Col sm="9">
                <Form.Label>Zustand</Form.Label>
                <Form.Control
                  className="conditionChooser"
                  as="select"
                  name="conditionId"
                  value={formData.conditionId}
                  onChange={e => {
                    handleInput(e);
                  }}
                >
                  <option key={"custom"} value={"custom"}>
                    Zauber/ Eigen
                  </option>
                  {showOptions()}
                </Form.Control>
              </Col>
              <Col>
                {formData.conditionId === "custom" ||
                conditionsInformation[formData.conditionId].hasLevel ? (
                  <div className="level">
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
            {formData.conditionId === "custom" && (
              <Form.Row>
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={e => {
                      handleInput(e);
                    }}
                  />
                </Col>
              </Form.Row>
            )}
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
                      onChange={() => {
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
                    onClick={e => e.target.select()}
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
    </div>
  );
}
