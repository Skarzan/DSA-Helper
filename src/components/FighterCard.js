import React from "react";
import Points from "./Points";

export default function FighterCard(props) {
  return (
    <div>
      <div>{props.fighter.name}</div>
      <Points
        name="LeP"
        current={props.fighter.maxLep}
        maxPoints={props.fighter.maxLep}
      />
      {props.fighter.maxAsp > 0 ? (
        <Points
          name="AsP"
          current={props.fighter.maxAsp}
          maxPoints={props.fighter.maxAsp}
        />
      ) : (
        ""
      )}
      {props.fighter.maxKap > 0 ? (
        <Points
          name="KaP"
          current={props.fighter.maxKap}
          maxPoints={props.fighter.maxKap}
        />
      ) : (
        ""
      )}
      <div>Initiative: {props.fighter.initiative}</div>
    </div>
  );
}
