import React from "react";
import ConditionIcon from "./ConditionIcon";

import "../styles/conditionBox.scss";

/**
 * Renders an area of all conditions in a given list
 * @param {Object} props the props
 * @param {function} changeConditon function to chnage a heros condition
 * @param {function} deleteCondition function to delete a heros condition
 * @param {Array} conditions array with all conditions of a hero
 */
export default function ConditionBox(props) {
  let createConditionList = () => {
    return props.conditions.map((condition, index) => {
      return (
        <ConditionIcon
          changeCondition={props.changeCondition}
          deleteCondition={props.deleteCondition}
          condition={condition}
          key={`${index} ${condition.conditionId}`}
          index={index}
        />
      );
    });
  };

  return <div className="conditionBox">{createConditionList()}</div>;
}
