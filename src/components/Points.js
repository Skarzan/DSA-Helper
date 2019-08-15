import React, { useState, useEffect } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import "../styles/points.scss";

/**
 * Shows a bar of a given maxValue with buttons to control current points.
 * @param {Object} props the props
 * @param {string} props.name the name of the displayed bar
 * @param {number} props.maxPoints the maximum points of the bar
 */
export default function Points(props) {
  // the current points of the bar
  const [currentPoints, setCurrentPoints] = useState(props.current);

  useEffect(() => {
    setCurrentPoints(props.maxPoints);
  }, [props.maxPoints]);

  /**
   * Subtract 1 of currentPoints
   */
  const sub = () => {
    setCurrentPoints(currentPoints - 1);
  };

  /**
   * Add 1 to currentPoints
   */
  const add = () => {
    if (currentPoints < props.maxPoints) {
      setCurrentPoints(currentPoints + 1);
    }
  };

  /**
   * Function to determinate and set the color of the bar depending on props.name
   * @param {string} name name of the displayed bar
   */
  const setColor = name => {
    switch (name) {
      case "LeP":
        return "danger";
      case "AsP":
        return "info";
      case "KaP":
        return "success";

      default:
        break;
    }
  };

  return (
    <div class="pointsContainer">
      <ProgressBar
        className={`pointsHero ${props.name}`}
        variant={setColor(props.name)}
        now={(currentPoints * 100) / props.maxPoints}
        label={`${props.name}: ${currentPoints}/${props.maxPoints}`}
      />

      <Button
        variant={setColor(props.name)}
        className="subButton pointsButton"
        onClick={() => sub()}
      >
        -
      </Button>

      <Button
        variant={setColor(props.name)}
        className="addButton pointsButton"
        onClick={() => add()}
      >
        +
      </Button>
    </div>
  );
}
