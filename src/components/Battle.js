import React, { useState } from "react";
import CharacterCreator from "./CharacterCreator";
import BattleFighterList from "./BattleFighterList";

export default function Battle(props) {
  let [fighter, setFighter] = useState([]);

  let addEnemy = enemy => {
    setFighter([...fighter, enemy]);
  };

  return (
    <div>
      <BattleFighterList fighter={fighter} />
      <CharacterCreator submitCharacter={addEnemy} />
    </div>
  );
}
