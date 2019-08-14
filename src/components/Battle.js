import React, { useState } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";
import { useDispatch } from "react-redux";
import { showModal, closeModal } from "../actions";

import Button from "react-bootstrap/Button";

import "../styles/battle.scss";

/**
 * Manages a battle. Controls all the fighters and their values.
 */
export default function Battle() {
  const dispatch = useDispatch();
  /** list of all fighters of the battle */
  const [fighter, setFighter] = useState([]);
  /** counts the round of a battle */
  const [battleRound, setBattleRound] = useState(1);
  /** indicates the position of the active fighter in the fighter array */
  const [activeFighter, setActiveFighter] = useState(0);
  /** set the id´s of the conditions TODO solve it in a function */
  const [conditionIdCounter, setConditionIdCounter] = useState(0);

  /**
   * Adds a new fighter to the fighters list
   * @param {Object} newFighter the new fighter about to add to the fighter list
   */
  const addFighter = newFighter => {
    setFighter([...fighter, newFighter]);
    dispatch(closeModal());
  };

  /**
   * Deletes a fighter with a given id
   * @param {number} fighterIndex id of the fighter about to delete
   */
  const killFighter = fighterIndex => {
    const newState = fighter;
    newState.splice(fighterIndex, 1);

    setFighter([...newState]);
    correctActiveFighter(fighterIndex);
  };

  /**
   *  Activates the modal and gives it the characterCreator component.
   *  Injects the addFighter-function when user submits data in the modal
   */
  const showNewFighterModal = () => {
    const modal = <CharacterCreator submitCharacter={addFighter} />;
    dispatch(showModal(["Neuer Kämpfer", modal])); // redux showModal
  };

  const nextFighter = () => {
    if (fighter.length - 1 === activeFighter) {
      endRound();
      setActiveFighter(0);
    } else {
      setActiveFighter(activeFighter + 1);
    }
  };

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
  const sortFightersByInitiative = () => {
    return fighter.sort(compare);
  };

  /**
   * Corrects activeFighter when the fighterList is changed
   * @param {number} fighterId id of the fighter that is affected
   */
  const correctActiveFighter = fighterIndex => {
    //let sortedList = sortFightersByInitiative();
    if (activeFighter > fighterIndex) {
      setActiveFighter(activeFighter - 1);
    }
  };

  /**
   * Setting all up for a new battle round.
   */
  const endRound = () => {
    reduceConditionRounds();
    setBattleRound(battleRound + 1);
  };

  /**
   * Reduces all remainingRounds of the conditions and deletes them if they reach 0
   */
  const reduceConditionRounds = () => {
    let newState = fighter.map(character => {
      character.conditions = character.conditions.map(condition => {
        if (condition.remainingRounds > 0) {
          condition.remainingRounds = condition.remainingRounds - 1;

          if (condition.remainingRounds === 0) {
            condition = null;
          }
        }
        return condition;
      });

      character.conditions = character.conditions.filter(condition => {
        return condition !== null;
      });
      return character;
    });

    setFighter([...newState]);
  };

  /****************** condition functions ******************/

  /**
   * Deletes a condition with a given id from the conditions of a given fighter.
   * @param {number} fighterId the id of the fighter
   * @param {number} conditionId the id of the conditon
   */
  const deleteCondition = (fighterId, conditionId) => {
    let filtered = fighter[fighterId].conditions.filter(
      (condition, index, arr) => {
        return condition.conditionId !== conditionId;
      }
    ); //return a list of all conditions excluding the condition about to delete

    let newState = fighter;

    newState[fighterId].conditions = filtered;
    setFighter([...newState]);
  };

  /**
   * Replaces a condition with the same id of a given fighetr
   * @param {number} fighterId the id of the fighter
   * @param {Object} condition the condition
   */
  const changeCondition = (fighterId, condition) => {
    //find index of the condition that has to be replaced
    let index = fighter[fighterId].conditions.findIndex(cond => {
      return cond.id === condition.id;
    });

    let newState = fighter;

    newState[fighterId].conditions[index] = condition;

    setFighter([...newState]);
  };

  /**
   * Adds a new condition to the condition array of a given fighter
   * @param {number} fighterId id of the fighter
   * @param {Object} newCondition the new Condition
   */
  const addCondition = (fighterId, newCondition) => {
    newCondition.id = conditionIdCounter;
    setConditionIdCounter(conditionIdCounter + 1);

    let newState = fighter;
    // check if there are already a condition with the same conditionId
    if (
      fighter[fighterId].conditions.find(condition => {
        return condition.conditionId === newCondition.conditionId;
      })
    ) {
      // inform user that this fighter already has this condition
      dispatch(
        showModal([
          "Hinweis",
          `${fighter[fighterId].name} besitzt diesen zustand bereits`
        ])
      );
    } else {
      newState[fighterId].conditions = [
        ...newState[fighterId].conditions,
        newCondition
      ];
    }
    setFighter(newState);
  };

  return (
    <div className="battle">
      <h1 class="siteHeading">Kampf</h1>
      <div className="newFighter">
        <Button onClick={() => showNewFighterModal()}>Neuer Kämpfer</Button>
      </div>
      <div className="round">Runde {battleRound}</div>
      <BattleFighterList
        deleteCondition={deleteCondition}
        changeCondition={changeCondition}
        addCondition={addCondition}
        activeFighter={activeFighter}
        killFighter={killFighter}
        fighter={sortFightersByInitiative()}
      />
      {fighter.length > 0 ? (
        <div className="battleFooter">
          <div className="footerFighterName">
            Aktiver Kämpfer: <span>{fighter[activeFighter].name}</span>
          </div>

          <Button
            className="footerButton"
            onClick={() => {
              nextFighter();
            }}
          >
            Nächster Kämpfer
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
