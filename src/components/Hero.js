import React, { useState } from "react";
import Purse from "./Purse";
import Points from "./Points";
import ConditionsAddBox from "./ConditionsAddBox";
import ConditionBox from "./ConditionBox";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { showModal } from "../actions";

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
  const [showConditionsAddBox, setShowConditionsAddBox] = useState(false);

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
    const formData = data.formData;

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
    setShowConditionsAddBox(!showConditionsAddBox);
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
                setShowConditionsAddBox(!showConditionsAddBox);
              }}
            >
              Zustand/Status
            </Button>
          </div>
        </Card.Header>
        <Card.Text className="heroInner">
          <Row>
            <Col sm="12">
              {showConditionsAddBox ? (
                <ConditionsAddBox addCondition={addCondition} />
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row className="row">
            <Col sm="12">
              <div className="pointsHeroContainer">
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
            </Col>
          </Row>
          <Row>
            <Col>
              <Purse startMoney={props.hero.money} />
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
