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
  /**
   * Compares two fighters by initiative and gives back corresponding values
   * @param {*} a first value
   * @param {*} b second value
   */
  const compare = (a, b) => {
    if (Number(a.initiative) > Number(b.initiative)) {
      return -1;
    }
    if (Number(a.initiative) < Number(b.initiative)) {
      return 1;
    }
    return 0;
  };

  /**
   * Sorts the fighter list and returns the list
   * @returns {array} List of sorted fighters
   */
  const sortFightersByInitiavive = () => {
    return props.fighter.sort(compare);
  };

  /**
   * Creates a FighterCard-component for every fighter in the preveously sorted props.fighter array
   */
  let listFighters = () => {
    let sortedFighters = sortFightersByInitiavive(); // sort fighters

    // create a FighterCard for every fighter
    return sortedFighters.map((character, index) => {
      return (
        <FighterCard
          key={character.id}
          fighter={character}
          killFighter={props.killFighter}
          deleteCondition={props.deleteCondition}
          changeCondition={props.changeCondition}
          addCondition={props.addCondition}
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
