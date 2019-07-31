import React, { useState } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";

import "../styles/battle.scss";

export default function Battle(props) {
  let [fighter, setFighter] = useState([]);

  let addEnemy = enemy => {
    setFighter([...fighter, enemy]);
  };

  return (
    <div className="battle">
      <CharacterCreator submitCharacter={addEnemy} />
      <BattleFighterList fighter={fighter} />
    </div>
  );
}
