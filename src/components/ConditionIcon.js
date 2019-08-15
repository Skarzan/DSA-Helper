import React, { useState, useEffect, useContext } from "react";
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ReactComponent as TrashSVG } from "../assets/svg/icons/trash.svg";
import { ReactComponent as InfoSVG } from "../assets/svg/icons/info.svg";

import { useDispatch } from "react-redux";
import { showModal } from "../actions";

import "../styles/conditionIcon.scss";

import conditionsInformation from "../assets/conditionsInformation";

export default function ConditionIcon(props) {
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(props.condition.conditionId);
  }, []);
  const dispatch = useDispatch();

  let deleteCondition = () => {
    props.deleteCondition(props.condition.conditionId);
  };

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

  const handleInput = e => {
    const condition = { ...props.condition, [e.target.name]: e.target.value };
    props.changeCondition(condition);
  };

  const showInformation = () => {
    dispatch(
      showModal([
        conditionsInformation[id].name,
        conditionsInformation[id].info
      ])
    );
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
                  {conditionsInformation[id].name}{" "}
                </h3>
                <div className="conditionButtons">
                  <Button
                    variant="info"
                    onClick={() => {
                      showInformation();
                    }}
                  >
                    <InfoSVG className="svgIconButton" />
                  </Button>
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
            <div className="level romanFont">{showLevel()}</div>
          ) : (
            ""
          )}
        </div>
      </OverlayTrigger>
    </div>
  );
}
