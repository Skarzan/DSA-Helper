import React from 'react'
import Hero from './Hero'
import heroes from '../assets/heroes'

import "../styles/heroList.scss"

export default function HeroList() {

  let showHeroes = () => {
    return heroes.map(hero => {
      return (
        <Hero hero={hero} />
      )
    });
  };

  return (
    <div className="heroList">
      {showHeroes()}
    </div>
  )
}