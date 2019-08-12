import React, { useState } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";
import { useDispatch } from "react-redux";
import { showModal, closeModal } from "../actions";

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

  return (
    <div className="battle">
      <h1 class="siteHeading">Kampf</h1>
      <div className="newFighter">
        <Button onClick={() => showNewFighterModal()}>Neuer Kämpfer</Button>
      </div>
      <div className="round">Runde {battleRound}</div>
      <BattleFighterList
        fighter={fighter}
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
