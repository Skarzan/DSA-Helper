import React, { useState, useEffect } from "react";
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
      <div>
        <label>Dukaten </label>
        <button onClick={() => changeMoney(0, 1000)}>-</button>
        <input
          type="text"
          value={Math.floor(money / 1000)}
          onChange={e => directChange(1, e.target.value)}
        />
        <button onClick={() => changeMoney(1, 1000)}>+</button>
      </div>
      <div>
        <label>Silber </label>
        <button onClick={() => changeMoney(0, 100)}>-</button>
        <input
          type="text"
          value={Math.floor((money % 1000) / 100)}
          onChange={e => directChange(2, e.target.value)}
        />
        <button onClick={() => changeMoney(1, 100)}>+</button>
      </div>
      <div>
        <label>Heller </label>
        <button onClick={() => changeMoney(0, 10)}>-</button>
        <input
          type="text"
          value={Math.floor((money % 100) / 10)}
          onChange={e => directChange(3, e.target.value)}
        />
        <button onClick={() => changeMoney(1, 10)}>+</button>
      </div>
      <div>
        <label>Kreuzer </label>
        <button onClick={() => changeMoney(0, 1)}>-</button>
        <input
          type="text"
          value={money % 10}
          onChange={e => directChange(4, e.target.value)}
        />
        <button onClick={() => changeMoney(1, 1)}>+</button>
      </div>
    </div>
  );
}
