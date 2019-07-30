import React, { useState } from "react";

import "../styles/points.css";

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

  return (
    <div class="pointsContainer">
      <div class="subButton pointsButton" onClick={() => sub()}>
        -
      </div>

      <div class="pointsHero">
        {props.name}: {currentPoints}/{props.maxPoints}
      </div>

      <div class="addButton pointsButton" onClick={() => add()}>
        +
      </div>
    </div>
  );
}
