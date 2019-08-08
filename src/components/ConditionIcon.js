import React, { useState, useEffect, useContext } from "react";
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import { deleteConditionFromHero, changeCondition } from "../actions";

import { HeroId } from "./Hero";

import "../styles/conditionIcon.scss";

import conditionsInformation from "../assets/conditionsInformation";

export default function ConditionIcon(props) {
  const [id, setId] = useState(0);
  const heroId = useContext(HeroId);

  useEffect(() => {
    setId(props.condition.conditionId);
  }, []);
  const dispatch = useDispatch();

  let deleteCondition = () => {
    dispatch(deleteConditionFromHero([heroId, props.condition.conditionId]));
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
    dispatch(
      changeCondition([
        heroId,
        { ...props.condition, [e.target.name]: e.target.value }
      ])
    );
  };

  return (
    <div className="conditionIcon">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover>
            <Popover.Content class="Content">
              <div>
                <button
                  onClick={() => {
                    deleteCondition();
                  }}
                >
                  delete
                </button>
                <h3>{conditionsInformation[id].name} </h3>
                {conditionsInformation[id].hasLevel ? (
                  <div>
                    {" "}
                    <Form.Label>Stufe</Form.Label>
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
              </div>
              <div>
                Runden:{" "}
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
          <div className="remainingRounds">
            {props.condition.remainingRounds}
          </div>
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
