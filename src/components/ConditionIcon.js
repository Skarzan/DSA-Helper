import React, { useState, useEffect } from "react";
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ReactComponent as TrashSVG } from "../assets/svg/icons/trash.svg";
import { ReactComponent as InfoSVG } from "../assets/svg/icons/info.svg";

import "../styles/conditionIcon.scss";

import conditionsInformation from "../utils/gameInformation/conditionsInformation";

/**
 * Renders an Icon based on the condition information from the props.
 * Allows to change the data of this condition or to delete it.
 * @param {Object} props the props
 * @param {Object} props.condition the condition to display
 * @param {function} props.deleteCondition function to delete this condition
 * @param {function} props.changeCondition function that changes the conditions data
 */
export default function ConditionIcon(props) {
  //the id(index) of the condition
  const [id, setId] = useState(0);

  //the roman number that indicates the level of the condition
  const [levelText, setLevelText] = useState("I");

  /**
   * when level of condition is changed, change the data
   */
  useEffect(() => {
    setId(props.condition.conditionId);
    setLevelText(showLevel());
  }, [props.condition.level]);

  /**
   * Calls parent components function to delete this condition
   */
  let deleteCondition = () => {
    props.deleteCondition(props.index);
  };

  /**
   * Return the roman number to display, based on the level of the condition
   */
  const showLevel = () => {
    switch (props.condition.level) {
      case "1":
        return "I";
      case "2":
        return "II";
      case "3":
        return "III";
      case "4":
        return "IV";
      default:
        break;
    }
  };

  /**
   * Calls parent components changeCondition function with the new values of the condition
   * @param {Object} e the change event
   */
  const handleInput = e => {
    const condition = { ...props.condition, [e.target.name]: e.target.value };
    props.changeCondition(props.index, condition);
  };

  return (
    <div className="conditionIcon">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover className="conditionPopover">
            <Popover.Content className="Content">
              <div className="conditionPopoverBody">
                <h3 className="conditionPopoverHeading">
                  {props.condition.name
                    ? props.condition.name
                    : conditionsInformation[id].name}
                </h3>
                <div className="conditionButtons">
                  <a href={conditionsInformation[id].wikiLink} target="blank">
                    <Button variant="info">
                      <InfoSVG className="svgIconButton" />
                    </Button>
                  </a>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteCondition();
                    }}
                  >
                    <TrashSVG className="svgIconButton" />
                  </Button>
                </div>
                <div className="conditionChange">
                  {conditionsInformation[id].hasLevel ? (
                    <div>
                      <Form.Label>Stufe:</Form.Label>
                      <Form.Control
                        className="romanFont"
                        as="select"
                        name="level"
                        value={props.condition.level}
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
                  )}{" "}
                  <div>
                    <Form.Label>Runden:</Form.Label>
                    <Form.Control
                      type="number"
                      name="remainingRounds"
                      min="1"
                      value={props.condition.remainingRounds}
                      onChange={e => {
                        handleInput(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <div>
          <img
            className="conditionImage"
            src={conditionsInformation[props.condition.conditionId].imagePath}
            alt="Zustandsbild"
          />
          {props.condition.remainingRounds > 0 ? (
            <div className="remainingRounds">
              {props.condition.remainingRounds}
            </div>
          ) : (
            ""
          )}

          {conditionsInformation[props.condition.conditionId].hasLevel ? (
            <div className="level romanFont">{levelText}</div>
          ) : (
            ""
          )}

          {props.condition.name && (
            <div className="customOverlay">{props.condition.name}</div>
          )}
        </div>
      </OverlayTrigger>
    </div>
  );
}
