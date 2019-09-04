import React from "react";
import Button from "react-bootstrap/Button";
import { ReactComponent as SchipSVG } from "../assets/svg/icons/schip.svg";

import "../styles/SchipSection.scss";

export default function SchipSection(props) {
  const schip = props.current;
  const addSchip = () => {
    if (props.current < props.max) {
      props.setSchip(schip + 1);
    }
  };

  const subSchip = () => {
    const schip = props.current;
    if (props.current > 0) {
      props.setSchip(schip - 1);
    }
  };

  return (
    <div className="SchipSection">
      <Button className="minus" onClick={subSchip}>
        -
      </Button>
      <div className="pointsSection">
        <div className="icon">
          <SchipSVG></SchipSVG>
          <div className="points">
            <div>
              {props.current}/{props.max}
            </div>
          </div>
        </div>
      </div>
      <Button className="plus" onClick={addSchip}>
        +
      </Button>
    </div>
  );
}
