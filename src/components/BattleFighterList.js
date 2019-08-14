import React from "react";
import FighterCard from "./FighterCard";

/**
 * @param {Object}         props                   the props
 * @param {array}          props.fighter           the fighter array
 * @param {function}       props.deleteCondition   function to delete a condition
 * @param {function}       props.addCondition      function to add a condition
 * @param {function}       props.changeCondition   function to change a condition
 * @param {function}       props.activeFighter     function to change the active fighter
 * @param {function}       props.killFighter       function to delete a fighter
 *
 */
export default function BattleFighterList(props) {
  const listFighters = () => {
    // create a FighterCard for every fighter
    return props.fighter.map((character, index) => {
      return (
        <FighterCard
          key={index}
          fighter={character}
          killFighter={props.killFighter}
          deleteCondition={props.deleteCondition}
          changeCondition={props.changeCondition}
          addCondition={props.addCondition}
          index={index}
          status={
            props.activeFighter <= index
              ? props.activeFighter === index
                ? "notMoved active"
                : "notMoved"
              : "moved"
          }
        />
      );
    });
  };

  return <div className="battleFighterList">{listFighters()}</div>;
}
