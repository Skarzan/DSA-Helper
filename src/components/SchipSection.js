import React from "react";
import Button from "react-bootstrap/Button";
import { ReactComponent as SchipSVG } from "../assets/svg/icons/schip.svg";

import "../styles/SchipSection.scss";

/**
 * Renders a control palette to manage schips for a hero
 * @param {object} props the props
 * @param {number} props.current the current schips of the hero
 * @param {number} props.max the max schips of the hero
 * @param {function} props.setSchip the parent components function to set the new schips
 */
export default function SchipSection(props) {
  // the current schips of the hero
  const schip = props.current;

  /**
   * Adds a schip. Calls the parent components function
   */
  const addSchip = () => {
    // not over maximum
    if (props.current < props.max) {
      props.setSchip(schip + 1);
    }
  };

  /**
   * Subtracts a schip. Calls the parent components function
   */
  const subSchip = () => {
    const schip = props.current;
    // not below zero
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
