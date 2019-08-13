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
  let [fighter, setFighter] = useState([]);
  /** counts the round of a battle */
  let [battleRound, setBattleRound] = useState(1);
  /** indicates the position of the active fighter in the fighter array */
  let [activeFighter, setActiveFighter] = useState(0);

  /**
   *  Activates the modal and gives it the characterCreator component.
   *  Injects the addFighter-function when user submits data in the modal
   */
  const showNewFighterModal = () => {
    const modal = <CharacterCreator submitCharacter={addFighter} />;
    dispatch(showModal(["Neuer Kämpfer", modal])); // redux showModal
  };

  /**
   * Setting all up for a new battle round.
   */
  const endRound = () => {
    setBattleRound(battleRound + 1);
  };

  /**
   * Sets the active fighter to the next in the list. Checks if a new round has to start
   */
  const nextFighter = () => {
    if (fighter.length - 1 === activeFighter) {
      endRound(); // start new round
      setActiveFighter(0);
    } else {
      setActiveFighter(activeFighter + 1);
    }
  };

  /**
   * Adds a new fighter to the fighters list
   * @param {Object} fighter the new fighter about to add to the fighter list
   */
  let addFighter = fighter => {
    fighter.id = fighter.length + 1; //TODO set the greatest id

    let newFighter = [...fighter];
    newFighter.push(fighter); //add new fighter

    setFighter(newFighter);

    dispatch(closeModal()); // close the modal
    //console.log(fighter);
  };

  /**
   * Deletes a fighter with a given id
   * @param {number} fighterId id of the fighter about to delete
   */
  const killFighter = fighterId => {
    correctActiveFighter(fighterId); // check if the activeFighter has to be changed
    let newList = fighter.filter(function(fighter) {
      return fighter.id !== fighterId;
    }); // return an array of all remaining fighters
    setFighter(newList);
  };

  /**
   * Corrects activeFighter when the fighterList is changed
   * @param {number} fighterId id of the fighter that is affected
   */
  let correctActiveFighter = fighterId => {
    if (fighter[fighterId - 1].initiative < fighter[activeFighter].initiative) {
      setActiveFighter(activeFighter - 1);
    }
  };

  /****************** condition functions ******************/

  /**
   * Deletes a condition with a given id from the conditions of a given fighter.
   * @param {number} fighterId the id of the fighter
   * @param {number} conditionId the id of the conditon
   */
  const deleteCondition = (fighterId, conditionId) => {
    const index = fighter.findIndex(character => character.id === fighterId); // get the index of the hero in the fighter-list

    let filtered = fighter[index].conditions.filter((condition, index, arr) => {
      return condition.conditionId !== conditionId;
    }); //return a list of all conditions excluding the condition about to delete

    let newFighter = fighter.map(character => {
      // set the new condition list to the right fighter
      if (character.id === fighterId) {
        character.conditions = filtered;
      }
      return character;
    });

    setFighter(newFighter);
  };

  /**
   * Replaces a condition with the same id of a given fighetr
   * @param {number} fighterId the id of the fighter
   * @param {Object} condition the condition
   */
  const changeCondition = (fighterId, condition) => {
    let newFighter = fighter.map(character => {
      // get the hero which conditions has to be changed
      if (character.id === fighterId) {
        //find index of the condition that has to be replaced
        let index = character.conditions.findIndex(cond => {
          return cond.id === condition.id;
        });

        character.conditions[index] = condition;
      }
      return character;
    });

    setFighter(newFighter);
  };

  /**
   * Adds a new condition to the condition array of a given fighter
   * @param {number} fighterId id of the fighter
   * @param {Object} newCondition the new Condition
   */
  const addCondition = (fighterId, newCondition) => {
    let newFighter = fighter.map(character => {
      //find the right fighter
      if (fighterId === character.id) {
        // check if there are already a condition with the same conditionId
        if (
          character.conditions.find(condition => {
            return condition.conditionId === newCondition.conditionId;
          })
        ) {
          dispatch(
            showModal([
              "Hinweis",
              `${character.name} besitzt diesen zustand bereits`
            ])
          );
        } else {
          let id = character.conditions.length;

          newCondition.id = id + 1;
          character.conditions = [...character.conditions, newCondition];
        }
      }
      return character;
    });

    setFighter(newFighter);
    /* const condition = oldCondition.formData;
    const index = fighter.findIndex(character => character.id == fighterId);

    if (
      fighter[index].conditions.find(conditionOfFighter => {
        return conditionOfFighter.conditionId == condition.conditionId;
      })
    ) {
      dispatch(
        showModal([
          "Hinweis",
          `${fighter[index].name} besitzt diesen Status bereits`
        ])
      );
    } else {
      // get the highest id of the existing conditions to make sure there is no duplicate id
      const id = Math.max.apply(
        Math,
        fighter[index].conditions.map(function(o) {
          return o.id;
        })
      );
      let helper = condition;
      helper.id = id + 1;
      const newConditions = [...fighter[index].conditions, helper];
      const newFighter = fighter.map(fighter => {
        if (fighter.id === fighterId) {
          fighter.conditions = newConditions;
        }
        return fighter;
      });
      setFighter(newFighter);
    } */
  };

  return (
    <div className="battle">
      <h1 class="siteHeading">Kampf</h1>
      <div className="newFighter">
        <Button onClick={() => showNewFighterModal()}>Neuer Kämpfer</Button>
      </div>
      <div className="round">Runde {battleRound}</div>
      <BattleFighterList
        fighter={fighter}
        deleteCondition={deleteCondition}
        changeCondition={changeCondition}
        addCondition={addCondition}
        activeFighter={activeFighter}
        killFighter={killFighter}
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
