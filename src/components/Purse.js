import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button"

import "../styles/purse.scss";

export default function Purse(props) {
  let [money, setMoney] = useState(0);

  useEffect(() => {
    setMoney(props.startMoney);
  }, [props.startMoney]);

  let changeMoney = (operation, amount) => {
    //0 = sub, 1 = add
    if (operation === 0) {
      setMoney(money - amount);
    } else {
      setMoney(money + amount);
    }
  };

  let directChange = (digit, amount) => {
    switch (digit) {
      case 1:
        setMoney(amount * 1000 + Math.floor(money % 1000));
        break;
      case 2:
        setMoney(money - Math.floor((money % 1000) / 100) * 100 + amount * 100);
        break;
      case 3:
        setMoney(money - Math.floor((money % 100) / 10) * 10 + amount * 10);
        break;
      case 4:
        setMoney(money - Math.floor((money % 10) / 1) * 1 + amount * 1);
        break;
      default:
        break;
    }
  };

  return (
    <div class="purse">
      <div className="purseSection">
        <img class="coinImage" src={require("../assets/img/coins_t_03.png")} />
        <Button onClick={() => changeMoney(0, 1000)} variant="secondary">-</Button>
        <input
          type="text"
          value={Math.floor(money / 1000)}
          onChange={e => directChange(1, e.target.value)}
        />
        <Button onClick={() => changeMoney(1, 1000)} variant="secondary">+</Button>
      </div>
      <div className="purseSection">
        <img class="coinImage" src={require("../assets/img/coins_t_01.png")} />
        <Button onClick={() => changeMoney(0, 100)} variant="secondary">-</Button>
        <input
          type="text"
          value={Math.floor((money % 1000) / 100)}
          onChange={e => directChange(2, e.target.value)}
        />
        <Button onClick={() => changeMoney(1, 100)} variant="secondary">+</Button>
      </div>
      <div className="purseSection">
        <img class="coinImage" src={require("../assets/img/coins_t_02.png")} />
        <Button onClick={() => changeMoney(0, 10)} variant="secondary">-</Button>
        <input
          type="text"
          value={Math.floor((money % 100) / 10)}
          onChange={e => directChange(3, e.target.value)}
        />
        <Button onClick={() => changeMoney(1, 10)} variant="secondary">+</Button>
      </div>
      <div className="purseSection">
        <img class="coinImage" src={require("../assets/img/coins_t_04.png")} />
        <Button onClick={() => changeMoney(0, 1)} variant="secondary">-</Button>
        <input
          type="text"
          value={money % 10}
          onChange={e => directChange(4, e.target.value)}
        />
        <Button onClick={() => changeMoney(1, 1)} variant="secondary">+</Button>
      </div>
    </div>
  );
}
