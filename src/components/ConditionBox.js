import React from "react";
import ConditionIcon from "./ConditionIcon";

import "../styles/conditionBox.scss";

export default function ConditionBox(props) {
  let createConditionList = () => {
    return props.conditions.map(condition => {
      return <ConditionIcon condition={condition} key={condition.id}/>;
    });
  };

  return <div className="conditionBox">{createConditionList()}</div>;
}
