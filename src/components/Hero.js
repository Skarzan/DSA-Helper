import React, { useState } from "react";
import Purse from "./Purse";
import Points from "./Points";
import ConditionsAddBox from "./ConditionsAddBox";
import ConditionBox from "./ConditionBox";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { showModal, closeModal, setPoint, changeMoney } from "../actions";

import {
  addConditionToHero,
  changeCondition,
  deleteConditionFromHero
} from "../actions";
import { useDispatch } from "react-redux";

import "../styles/hero.scss";

/**
 * Displays a Card with all informations about a given hero.
 * Gets an hero object: {id: 1, name: string, maxLep: number, maxAsp: number, maxKap: number, lep: number, asp: number, kap: number, money: number, initiative: number : conditions: any[]}
 * @param {Object} props the props
 * @param {Object} props.hero the hero to display
 */
export default function Hero(props) {
  const dispatch = useDispatch();

  const setNewPoint = (points, name) => {
    dispatch(setPoint([points, name, props.hero.id]));
  };

  const changeHeroMoney = money => {
    dispatch(changeMoney([props.hero.id, money]));
  };

  /**
   * Shows the modal to add a new condition to the hero
   */
  const showConditionAddBox = () => {
    dispatch(
      showModal([
        `Neuer Status für ${props.hero.name}`,
        <ConditionsAddBox addCondition={addCondition} />
      ])
    );
  };

  /**
   * Deletes a condition with a given id from the conditions of the hero. Calls Redux action
   * @param {number} id the id of the conditon
   */
  const deleteCondition = id => {
    dispatch(deleteConditionFromHero([props.hero.id, id]));
  };

  /**
   * Replaces a condition with the same id. Calls Redux action
   * @param {Object} condition the condition
   */
  const changeHeroCondition = condition => {
    dispatch(changeCondition([props.hero.id, condition]));
  };

  /**
   * Adds a new condition to the condition array of the hero. Calls Redux action
   * @param {Object} data the new Condition
   */
  const addCondition = data => {
    // check if conditionId is already there
    const formData = data;

    // check if there are already a condition with the same conditionId
    if (
      props.hero.conditions.find(condition => {
        return condition.conditionId === formData.conditionId;
      })
    ) {
      dispatch(
        showModal([
          "Hinweis",
          `${props.hero.name} besitzt diesen Zustand bereits`
        ])
      );
    } else {
      // get the highest id of the existing conditions to make sure there is no duplicate id
      const id = Math.max.apply(
        Math,
        props.hero.conditions.map(function(o) {
          return o.id;
        })
      );
      let helper = formData;
      helper.id = id + 1; //set new id
      dispatch(addConditionToHero([props.hero.id, helper]));
    }
    dispatch(closeModal());
  };

  return (
    <div className="hero">
      <Card>
        <Card.Header as="h4" className="heroHeader">
          <div>{props.hero.name}</div>
          <div>
            <Button
              variant="secondary"
              onClick={() => {
                showConditionAddBox();
              }}
            >
              Zustand/Status
            </Button>
          </div>
        </Card.Header>
        <Card.Text className="heroInner">
          <Row className="row">
            <Col sm="12">
              <div className="pointsHeroContainer">
                <div className="lep">
                  <Points
                    name="LeP"
                    setPoint={setNewPoint}
                    current={props.hero.LeP}
                    maxPoints={props.hero.maxLep}
                  />
                </div>
                {props.hero.maxAsp ? (
                  <div className="asp">
                    <Points
                      name="AsP"
                      setPoint={setNewPoint}
                      current={props.hero.AsP}
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
                      setPoint={setNewPoint}
                      current={props.hero.KaP}
                      maxPoints={props.hero.maxKap}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Purse money={props.hero.money} changeMoney={changeHeroMoney} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <ConditionBox
                  changeCondition={changeHeroCondition}
                  deleteCondition={deleteCondition}
                  conditions={props.hero.conditions}
                />
              </div>
            </Col>
          </Row>
        </Card.Text>
      </Card>
    </div>
  );
}
