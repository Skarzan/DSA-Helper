import React, { useState } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";

import Button from "react-bootstrap/Button";

import "../styles/battle.scss";

export default function Battle(props) {
  let [fighter, setFighter] = useState([]);
  let [battleRound, setBattleRound] = useState(1);
  let [activeFighter, setActiveFighter] = useState(0);

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

  let addEnemy = enemy => {
    enemy.id = fighter.length + 1;
    setFighter([...fighter, enemy]);
  };

  return (
    <div className="battle">
      <CharacterCreator submitCharacter={addEnemy} />
      <BattleFighterList fighter={fighter} activeFighter={activeFighter} />
      <Button
        onClick={() => {
          nextFighter();
        }}
      >
        Nächster Kämpfer
      </Button>
    </div>
  );
}
