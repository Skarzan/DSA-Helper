import React from "react";
import FighterCard from "./FighterCard";

import "../styles/battleFighterList.scss";

/**
 * The List of the fighters. Displayed as list from top to bottom.  Get´s a list and displays it
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
  /**
   * Creates a list of <FighterCard> with the data of the fighter array
   */
  const listFighters = () => {
    // create a FighterCard for every fighter
    return props.fighter.map((character, index) => {
      return (
        <FighterCard
          data-test="fighter"
          key={index}
          fighter={character}
          killFighter={props.killFighter}
          deleteCondition={props.deleteCondition}
          changeCondition={props.changeCondition}
          addCondition={props.addCondition}
          index={index}
          setPoint={props.setPoint}
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
