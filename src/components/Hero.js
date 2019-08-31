import React, { useState } from "react";
import Purse from "./Purse";
import Points from "./Points";
import ConditionsAddBox from "./ConditionsAddBox";
import ConditionBox from "./ConditionBox";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  showModal,
  closeModal,
  setPoint,
  changeMoney,
  addToast
} from "../actions";

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
    const oldPoints = props.hero.LeP;
    //check if hero gets or loses a level of pain
    if (name === "LeP") {
      const maxLeP = props.hero.maxLep;

      // 0 = not change, 1 = add pain, 2 = remove pain
      let changePain = 0;

      //get level from pain
      let painLevel = props.hero.conditions.find(cond => {
        return cond.pain === true;
      });

      if (painLevel === undefined) {
        painLevel = 0;
      } else {
        painLevel = painLevel.level;
      }

      if (oldPoints > points) {
        switch (points) {
          case 5: {
            changePain = 1;
            break;
          }
          case Math.round(maxLeP * 0.25): {
            changePain = 1;
            break;
          }
          case Math.round(maxLeP * 0.5): {
            changePain = 1;
            break;
          }
          case Math.round(maxLeP * 0.75): {
            changePain = 1;
            break;
          }
          default:
            break;
        }
      }

      if (oldPoints < points) {
        switch (points) {
          /* heal pain */
          case Math.round(maxLeP * 0.75) + 1: {
            if (oldPoints < points) {
              const index = props.hero.conditions.findIndex(condition => {
                return condition.pain === true && condition.conditionId === 7;
              });
              if (index >= 0) {
                deleteCondition(index);
              }
              dispatch(
                addToast([props.hero.name, "Verliert eine Stufe Schmerz"])
              );
            }
            break;
          }
          case Math.round(maxLeP * 0.5) + 1: {
            changePain = 2;
            break;
          }
          case Math.round(maxLeP * 0.25) + 1: {
            changePain = 2;
            break;
          }
          case 6: {
            changePain = 2;
            break;
          }

          default:
            break;
        }
      }
      if (changePain == 1) {
        addCondition({
          conditionId: 7,
          level: (Number(painLevel) + 1).toString(),
          remainingRounds: null,
          pain: true,
          comment: ""
        });
        dispatch(addToast([props.hero.name, "Erhält eine Stufe Schmerz"]));
      }

      if (changePain == 2) {
        addCondition({
          conditionId: 7,
          level: (Number(painLevel) - 1).toString(),
          remainingRounds: null,
          pain: true,
          comment: ""
        });
        dispatch(addToast([props.hero.name, "Verliert eine Stufe Schmerz"]));
      }
    }

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
  const changeHeroCondition = (conditionIndex, condition) => {
    dispatch(changeCondition([props.hero.id, conditionIndex, condition]));
  };

  /**
   * Adds a new condition to the condition array of the hero. Calls Redux action
   * @param {Object} data the new Condition
   */
  const addCondition = newCondition => {
    if (
      newCondition.pain === true &&
      props.hero.conditions.find(condition => {
        return condition.pain === true;
      })
    ) {
      const index = props.hero.conditions.findIndex(condition => {
        return condition.pain === true;
      });
      changeHeroCondition(index, newCondition);
    } else {
      dispatch(addConditionToHero([props.hero.id, newCondition]));
      dispatch(closeModal());
    }
  };

  return (
    <div className="hero">
      <Card>
        <Card.Header as="h4" className="heroHeader">
          <div data-testid="hero-name">{props.hero.name}</div>
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
        <Card.Body className="heroInner">
          <Row className="row">
            <Col sm="12">
              <div className="pointsHeroContainer">
                <div className="lep" data-testid="hero-LeP">
                  <Points
                    name="LeP"
                    setPoint={setNewPoint}
                    current={props.hero.LeP}
                    maxPoints={props.hero.maxLep}
                  />
                </div>
                {props.hero.maxAsp ? (
                  <div className="asp" data-testid="hero-AsP">
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
                  <div className="kap" data-testid="hero-KaP">
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
        </Card.Body>
      </Card>
    </div>
  );
}
