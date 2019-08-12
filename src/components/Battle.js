import React, { useState } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";
import { useDispatch } from "react-redux";
import { showModal, closeModal } from "../actions";

import conditionsInformation from "../assets/conditionsInformation";

import Button from "react-bootstrap/Button";

import "../styles/battle.scss";

export default function Battle() {
  const dispatch = useDispatch();
  let [fighter, setFighter] = useState([]);
  let [battleRound, setBattleRound] = useState(1);
  let [activeFighter, setActiveFighter] = useState(0);

  const showNewFighterModal = fighter => {
    const modal = <CharacterCreator submitCharacter={addFighter} />;
    dispatch(showModal(["Neuer Kämpfer", modal]));
  };

  let endRound = () => {
    setBattleRound(battleRound + 1);
  };

  let nextFighter = () => {
    if (fighter.length - 1 === activeFighter) {
      endRound();
      setActiveFighter(0);
    } else {
      setActiveFighter(activeFighter + 1);
    }
  };

  let addFighter = enemy => {
    enemy.id = fighter.length + 1;
    setFighter([...fighter, enemy]);

    dispatch(closeModal());
  };

  let killFighter = enemyId => {
    correctActiveFighter(enemyId);
    let newList = fighter.filter(function(enemy) {
      return enemy.id !== enemyId;
    });
    setFighter(newList);
  };

  let correctActiveFighter = fighterId => {
    if (fighter[fighterId - 1].initiative < fighter[activeFighter].initiative) {
      setActiveFighter(activeFighter - 1);
    }
  };

  /* condition functions */

  const deleteCondition = (fighterId, conditionId) => {
    const index = fighter.findIndex(character => character.id == fighterId);

    let filtered = fighter[index].conditions.filter((condition, index, arr) => {
      return condition.conditionId != conditionId;
    });

    let newFighter = fighter.map(fighter => {
      if (fighter.id === fighterId) {
        fighter.conditions = filtered;
      }
      return fighter;
    });

    setFighter(newFighter);
  };

  const changeCondition = (fighterId, condition) => {
    let newFighter = fighter.map(character => {
      if (character.id === fighterId) {
        let index = character.conditions.findIndex(cond => {
          return cond.id === condition.id;
        });

        character.conditions[index] = condition;
      }
      return character;
    });

    setFighter(newFighter);
  };

  const addCondition = (fighterId, oldCondition) => {
    const condition = oldCondition.formData;
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
    }
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
