import React, { useState } from "react";
import FighterCard from "./FighterCard";

export default function BattleFighterList(props) {
  let compare = (a, b) => {
    if (Number(a.initiative) > Number(b.initiative)) {
      return -1;
    }
    if (Number(a.initiative) < Number(b.initiative)) {
      return 1;
    }
    return 0;
  };

  let sortFightersByInitiavive = () => {
    return props.fighter.sort(compare);
  };

  let listFighters = () => {
    let sortedFighters = sortFightersByInitiavive();
    return sortedFighters.map(character => {
      return <FighterCard key={character.name} fighter={character} />;
    });
  };

  return <div className="battleFighterList">{listFighters()}</div>;
}
