import React, { useState, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import "../styles/conditionIcon.scss";

import conditionsInformation from "../assets/conditionsInformation";
import { OverlayTrigger } from "react-bootstrap";

export default function ConditionIcon(props) {
  const [showDetails, setShowDetails] = useState(false);
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
                Name: {conditionsInformation[id].name}{" "}
                {conditionsInformation[id].hasLevel
                  ? props.condition.level
                  : ""}
              </div>
              <div>Runden: {props.condition.remainingRounds}</div>
            </Popover.Content>
          </Popover>
        }
      >
        <img
          className="conditionImage"
          src={require(conditionsInformation[id].imagePath)}
          alt="Zustandsbild"
        />
      </OverlayTrigger>
    </div>
  );
}
