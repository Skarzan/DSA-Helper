import React, { useState, useEffect } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";
import { useSelector, useDispatch } from "react-redux";
import { showModal, closeModal, addToast } from "../actions";
import HeroFightAddForm from "./HeroFightAddForm";

import { ReactComponent as UserPlusButton } from "../assets/svg/icons/user-plus.svg";
import { ReactComponent as NextSVG } from "../assets/svg/icons/next.svg";

import Button from "react-bootstrap/Button";

import conditionsInformation from "../assets/conditionsInformation";

import "../styles/battle.scss";

/**
 * Manages a battle. Controls all the fighters and their values.
 */
export default function Battle() {
  /** list of heroes */
  const heroes = useSelector(state => state.heroes); // get the array of heroes from redux

  const dispatch = useDispatch();
  /** list of all fighters of the battle */
  const [fighter, setFighter] = useState([]);
  /** counts the round of a battle */
  const [battleRound, setBattleRound] = useState(1);
  /** indicates the position of the active fighter in the fighter array */
  const [activeFighter, setActiveFighter] = useState(0);
  /** set the id´s of the conditions TODO solve it in a function */
  const [conditionIdCounter, setConditionIdCounter] = useState(0);

  const fighterListNotEmpty = () => {
    if (fighter.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Adds all heroes heroes to the fighter list with their initiative
   * @param {array} initiative an array of all heroes initiative
   */
  const addAllHeroes = initiative => {
    let newHeroes = heroes;

    newHeroes.forEach((hero, index) => {
      hero.isHero = true;
      hero.initiative = initiative[index];
    });
    setFighter([...fighter, ...newHeroes]);
  };

  /**
   * Adds a new fighter to the fighters list
   * @param {Object} newFighter the new fighter about to add to the fighter list
   */
  const addFighter = newFighter => {
    newFighter = {
      ...newFighter,
      LeP: newFighter.maxLep,
      AsP: newFighter.maxAsp,
      KaP: newFighter.maxKap
    };

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

  const setPoint = (points, name, fighterIndex) => {
    const oldPoints = fighter[fighterIndex].LeP;
    let newState = fighter;
    newState[fighterIndex][name] = points;

    //check if fighter gets or loses a level of pain
    if (name === "LeP") {
      const maxLeP = newState[fighterIndex].maxLep;

      // 0 = not change, 1 = add pain, 2 = remove pain
      let changePain = 0;

      //get level from pain
      let painLevel = fighter[fighterIndex].conditions.find(cond => {
        return cond.pain === true;
      });

      if (painLevel === undefined) {
        painLevel = 0;
      } else {
        painLevel = painLevel.level;
      }

      if (oldPoints > points) {
        switch (points) {
          case 5: {
            changePain = 1;
            break;
          }
          case Math.round(maxLeP * 0.25): {
            changePain = 1;
            break;
          }
          case Math.round(maxLeP * 0.5): {
            changePain = 1;
            break;
          }
          case Math.round(maxLeP * 0.75): {
            changePain = 1;
            break;
          }
          default:
            break;
        }
      }

      if (oldPoints < points) {
        switch (points) {
          /* heal pain */
          case Math.round(maxLeP * 0.75) + 1: {
            if (oldPoints < points) {
              const index = fighter[fighterIndex].conditions.findIndex(
                condition => {
                  return condition.pain === true && condition.conditionId === 7;
                }
              );
              if (index >= 0) {
                deleteCondition(fighterIndex, index);
              }
              dispatch(
                addToast([
                  fighter[fighterIndex].name,
                  "Verliert eine Stufe Schmerz"
                ])
              );
            }
            break;
          }
          case Math.round(maxLeP * 0.5) + 1: {
            changePain = 2;
            break;
          }
          case Math.round(maxLeP * 0.25) + 1: {
            changePain = 2;
            break;
          }
          case 6: {
            changePain = 2;
            break;
          }

          default:
            break;
        }
      }

      if (changePain == 1) {
        addCondition(fighterIndex, {
          conditionId: 7,
          level: (Number(painLevel) + 1).toString(),
          remainingRounds: null,
          pain: true,
          comment: ""
        });
        dispatch(
          addToast([fighter[fighterIndex].name, "Erhält eine Stufe Schmerz"])
        );
      }

      if (changePain == 2) {
        addCondition(fighterIndex, {
          conditionId: 7,
          level: (Number(painLevel) - 1).toString(),
          remainingRounds: null,
          pain: true,
          comment: ""
        });
        dispatch(
          addToast([fighter[fighterIndex].name, "Verliert eine Stufe Schmerz"])
        );
      }
    }

    setFighter([...newState]);
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
            dispatch(
              addToast([
                character.name,
                `${
                  conditionsInformation[condition.conditionId].name
                } wurde entfernt`
              ])
            ); //show Toast
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
  const deleteCondition = (fighterId, conditionIndex) => {
    let newState = fighter;

    newState[fighterId].conditions.splice(conditionIndex, 1);
    //newState[fighterId].conditions = filtered;
    setFighter([...newState]);
  };

  /**
   * Replaces a condition with the same id of a given fighetr
   * @param {number} fighterId the id of the fighter
   * @param {Object} condition the condition
   */
  const changeCondition = (fighterId, index, level, rounds) => {
    //find index of the condition that has to be replaced

    let newState = fighter;

    newState[fighterId].conditions[index].level = level;
    newState[fighterId].conditions[index].remainingRounds = rounds;

    setFighter([...newState]);
  };

  /**
   * Adds a new condition to the condition array of a given fighter
   * @param {number} fighterId id of the fighter
   * @param {Object} newCondition the new Condition
   */
  const addCondition = (fighterId, newCondition) => {
    let newState = fighter;

    if (
      newCondition.pain === true &&
      fighter[fighterId].conditions.find(condition => {
        return condition.pain === true;
      })
    ) {
      const index = fighter[fighterId].conditions.findIndex(condition => {
        return condition.pain === true;
      });
      changeCondition(
        fighterId,
        index,
        newCondition.level,
        newCondition.rounds
      );
    } else {
      newCondition.id = conditionIdCounter;
      setConditionIdCounter(conditionIdCounter + 1);

      newState[fighterId].conditions = [
        ...newState[fighterId].conditions,
        newCondition
      ];
      setFighter([...newState]);
    }
  };

  return (
    <div className="battle">
      {heroes.length !== 0 ? (
        !fighterListNotEmpty() && <HeroFightAddForm addHeroes={addAllHeroes} />
      ) : (
        <h1 className="noHeroWarning">
          Erstelle einen Helden um einen Kampf zu starten
        </h1>
      )}
      {fighterListNotEmpty() && (
        <div className="round">Kampfrunde {battleRound}</div>
      )}
      <div className="fighterSection">
        <BattleFighterList
          deleteCondition={deleteCondition}
          changeCondition={changeCondition}
          addCondition={addCondition}
          setPoint={setPoint}
          activeFighter={activeFighter}
          killFighter={killFighter}
          fighter={sortFightersByInitiative()}
        />
      </div>
      {fighterListNotEmpty() && (
        <div className="battleFooter">
          <Button
            className="footerButton center"
            onClick={() => showNewFighterModal()}
          >
            <span>Neuer Kämpfer</span>
            <UserPlusButton className="svgIconButton" />
          </Button>

          <div className="footerFighterName">
            Aktiver Kämpfer: <span>{fighter[activeFighter].name}</span>
          </div>

          <Button
            className="footerButton center"
            onClick={() => {
              nextFighter();
            }}
          >
            Nächster Kämpfer <NextSVG className="svgIconButton" />
          </Button>
        </div>
      )}
    </div>
  );
}
