import React, { useState, useEffect } from "react";
import Popover from "react-bootstrap/Popover";

import "../styles/conditionIcon.scss";

import conditionsInformation from "../assets/conditionsInformation";
import { OverlayTrigger } from "react-bootstrap";

export default function ConditionIcon(props) {
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(props.condition.conditionId);
  }, []);

  return (
    <div className="conditionIcon">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover>
            <Popover.Content class="Content">
              <div>
                <h3>
                  {conditionsInformation[id].name}{" "}
                  {conditionsInformation[id].hasLevel
                    ? props.condition.level
                    : ""}{" "}
                </h3>
              </div>
              <div>Runden: {props.condition.remainingRounds}</div>
            </Popover.Content>
          </Popover>
        }
      >
        <img
          className="conditionImage"
          src={conditionsInformation[props.condition.conditionId].imagePath}
          alt="Zustandsbild"
        />
      </OverlayTrigger>
    </div>
  );
}
