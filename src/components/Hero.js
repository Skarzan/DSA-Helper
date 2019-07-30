import React from "react";
import Purse from "./Purse";
import Points from "./Points";

import "../styles/hero.css";

export default function Hero(props) {
  return (
    <div className="hero">
      <div className="name">Name: {props.hero.name}</div>
      <div className="pointsHero">
        <div className="lep">
          <Points
            name="LeP"
            current={props.hero.lep}
            maxPoints={props.hero.maxLep}
          />
        </div>
        {props.hero.maxAsp ? (
          <div className="asp">
            <Points
              name="AsP"
              current={props.hero.asp}
              maxPoints={props.hero.maxAsp}
            />
          </div>
        ) : (
          ""
        )}
        {props.hero.maxKap ? (
          <div className="kap">
            <Points
              name="KaP"
              current={props.hero.kap}
              maxPoints={props.hero.maxKap}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <Purse startMoney={props.hero.money} />
    </div>
  );
}
