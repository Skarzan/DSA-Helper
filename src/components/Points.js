import React, { useState, useEffect } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import "../styles/points.scss";

/**
 * Shows a bar of a given maxValue with buttons to control current points.
 * @param {Object} props the props
 * @param {function} props.setPoint function that sets new Points
 * @param {string} props.name the name of the displayed bar
 * @param {number} props.maxPoints the maximum points of the bar
 */
export default function Points(props) {
  /**
   * Subtract 1 of props.current
   */
  const sub = () => {
    props.setPoint(props.current - 1, props.name);
  };

  /**
   * Add 1 to props.current
   */
  const add = () => {
    if (props.current < props.maxPoints) {
      props.setPoint(props.current + 1, props.name);
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
    <div className="pointsContainer">
      <ProgressBar
        className={`pointsHero ${props.name}`}
        variant={setColor(props.name)}
        now={(props.current * 100) / props.maxPoints}
        label={`${props.name}: ${props.current}/${props.maxPoints}`}
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
