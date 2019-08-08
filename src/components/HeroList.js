import React, { useState, useEffect } from "react";
import Hero from "./Hero";

//Redux
import { useSelector } from "react-redux";

import "../styles/heroList.scss";

export default function HeroList() {
  const heroes = useSelector(state => state.heroes);

  let showHeroes = () => {
    return heroes.map(hero => {
      return <Hero hero={hero} />;
    });
  };

  return <div className="heroList">{showHeroes()} </div>;
}
