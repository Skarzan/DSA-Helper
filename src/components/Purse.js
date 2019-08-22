import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "../styles/purse.scss";

/**
 * Displays and calculates a hero´s money. Creates 4 number-inputs
 * @param {Object} props      the props
 * @param {number} props.money the amount of money that should be displayed
 */
export default function Purse(props) {
  const setMoney = money => {
    props.changeMoney(money);
  };

  /**
   * Add or subtract a given amount of the money
   * @param {number} operation determinate if it should add or sub
   * @param {number} amount the amount
   */
  const changeMoney = (operation, amount) => {
    //0 = sub, 1 = add
    if (operation === 0) {
      setMoney(props.money - amount); // subtract
    } else {
      setMoney(props.money + amount); // add
    }
  };

  /**
   * Sets the money as direct input in the form fields on a given amount
   * @param {number} digit the digit to change: 1: 'dukaten', 2: 'Silber, 3: 'Heller', 4: 'Kreuzer'
   * @param {*} amount the amount
   */
  const directChange = (digit, amount) => {
    switch (digit) {
      case 1:
        setMoney(amount * 1000 + Math.floor(props.money % 1000));
        break;
      case 2:
        setMoney(
          props.money -
            Math.floor((props.money % 1000) / 100) * 100 +
            amount * 100
        );
        break;
      case 3:
        setMoney(
          props.money - Math.floor((props.money % 100) / 10) * 10 + amount * 10
        );
        break;
      case 4:
        setMoney(
          props.money - Math.floor((props.money % 10) / 1) * 1 + amount * 1
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="purse">
      <div className="purseSection">
        <img
          class="coinImage"
          src={require("../assets/img/money1.png")}
          alt="Dukaten"
        />
        <Button onClick={() => changeMoney(0, 1000)} variant="secondary">
          -
        </Button>
        <input
          type="number"
          value={Math.floor(props.money / 1000)}
          onChange={e => directChange(1, e.target.value)}
          onClick={e => e.target.select()}
        />
        <Button onClick={() => changeMoney(1, 1000)} variant="secondary">
          +
        </Button>
      </div>
      <div className="purseSection">
        <img
          class="coinImage"
          src={require("../assets/img/money2.png")}
          alt="Silber"
        />
        <Button onClick={() => changeMoney(0, 100)} variant="secondary">
          -
        </Button>
        <input
          type="number"
          value={Math.floor((props.money % 1000) / 100)}
          onChange={e => directChange(2, e.target.value)}
          onClick={e => e.target.select()}
        />
        <Button onClick={() => changeMoney(1, 100)} variant="secondary">
          +
        </Button>
      </div>
      <div className="purseSection">
        <img
          class="coinImage"
          src={require("../assets/img/money3.png")}
          alt="Heller"
        />
        <Button onClick={() => changeMoney(0, 10)} variant="secondary">
          -
        </Button>
        <input
          type="number"
          value={Math.floor((props.money % 100) / 10)}
          onChange={e => directChange(3, e.target.value)}
          onClick={e => e.target.select()}
        />
        <Button onClick={() => changeMoney(1, 10)} variant="secondary">
          +
        </Button>
      </div>
      <div className="purseSection">
        <img
          class="coinImage"
          src={require("../assets/img/money4.png")}
          alt="Kreuzer"
        />
        <Button onClick={() => changeMoney(0, 1)} variant="secondary">
          -
        </Button>
        <input
          type="number"
          value={props.money % 10}
          onChange={e => directChange(4, e.target.value)}
          onClick={e => e.target.select()}
        />
        <Button onClick={() => changeMoney(1, 1)} variant="secondary">
          +
        </Button>
      </div>
    </div>
  );
}
