import React, { useState, useEffect, useContext } from "react";
import Popover from "react-bootstrap/Popover";
import { OverlayTrigger } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { deleteConditionFromHero } from "../actions";

import { HeroId } from "./Hero";

import "../styles/conditionIcon.scss";

import conditionsInformation from "../assets/conditionsInformation";

export default function ConditionIcon(props) {
  const [id, setId] = useState(0);

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

  const heroId = useContext(HeroId);

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
                <h3>
                  {conditionsInformation[id].name}{" "}
                  {conditionsInformation[id].hasLevel ? showLevel() : ""}{" "}
                </h3>
              </div>
              <div>Runden: {props.condition.remainingRounds}</div>
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
            <div className="level">{showLevel()}</div>
          ) : (
            ""
          )}
        </div>
      </OverlayTrigger>
    </div>
  );
}
