import React, { useState } from "react";

import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'

import "../styles/points.scss";

export default function Points(props) {
  let [currentPoints, setCurrentPoints] = useState(props.current);

  let sub = () => {
    setCurrentPoints(currentPoints - 1);
  };

  let add = () => {
    if (currentPoints < props.maxPoints) {
      setCurrentPoints(currentPoints + 1);
    }
  };

  let setColor = name => {
    switch (name) {
      case "LeP":
        return "danger";
      case "AsP":
        return "info";
      case "KaP":
        return "success"
    
      default:
        break;
    }
  }

  return (
    <div class="pointsContainer">
      <ProgressBar 
        className="pointsHero" 
        variant={setColor(props.name)} 
        now={(currentPoints * 100) / props.maxPoints} 
        label={`${props.name}: ${currentPoints}/${props.maxPoints}`}

      />

      <Button variant={setColor(props.name)} className="subButton pointsButton" onClick={() => sub()}>
        -
      </Button>

      <Button variant={setColor(props.name)} className="addButton pointsButton" onClick={() => add()}>
        +
      </Button>
    </div>
  );
}
