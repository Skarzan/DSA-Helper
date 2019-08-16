import React, { useState } from "react";
import Points from "./Points";
import ConditionsAddBox from "./ConditionsAddBox";
import ConditionBox from "./ConditionBox";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { ReactComponent as TrashSVG } from "../assets/svg/icons/trash.svg";
import "../styles/fighterCard.scss";

/**
 * Displays a Card with all informations about a given hero.
 * Gets an hero object: {id: 1, name: string, maxLep: number, maxAsp: number, maxKap: number, lep: number, asp: number, kap: number, money: number, initiative: number : conditions: any[]}
 * @param {Object}         props                   the props
 * @param {Object}         props.fighter           the hero to display
 * @param {function}       props.deleteCondition   function to delete a condition
 * @param {function}       props.addCondition      function to add a condition
 * @param {function}       props.changeCondition   function to change a condition
 * @param {function}       props.activeFighter     function to change the active fighter
 * @param {function}       props.killFighter       function to delete a fighter
 */
export default function FighterCard(props) {
  const [showConditionsAddBox, setShowConditionsAddBox] = useState(false);

  /**
   * Sets a new value to the given property
   * @param {number} points the new points
   * @param {string} name name of the property to change
   */
  const setPoint = (points, name) => {
    props.setPoint(points, name, props.index);
  };

  /**
   * Replaces a condition with the same id of the fighter.
   * @param {Object} condition the condition
   */
  const changeFighterCondition = condition => {
    props.changeCondition(props.index, condition);
  };

  /**
   * Deletes a condition with a given id from the conditions of the fighetr.
   * @param {number} conditionId the id of the conditon
   */
  const deleteCondition = conditionId => {
    props.deleteCondition(props.index, conditionId);
  };

  /**
   * Adds a new condition to the condition array of the fighter
   * @param {Object} data the new Condition
   */
  const addCondition = condition => {
    props.addCondition(props.index, condition);
    setShowConditionsAddBox(!showConditionsAddBox);
  };

  /**
   * Set the class for the header either it is an enemy or a hero
   */
  const setHeaderClass = () => {
    return props.fighter.isHero ? "hero" : "enemy";
  };

  return (
    <div className="fighterCard">
      <Card className={props.status + " status"}>
        <Card.Header
          as="h4"
          className={`fighterCardHeader ${setHeaderClass()}`}
        >
          <div>{props.fighter.name}</div>
          <div className="fighterButtons">
            <div className="center">
              <Button
                variant="info"
                onClick={() => {
                  setShowConditionsAddBox(!showConditionsAddBox);
                }}
              >
                Zustand/Status
              </Button>
            </div>
            <Button
              className="deleteButton"
              variant="danger"
              size="sm"
              onClick={() => {
                props.killFighter(props.index);
              }}
            >
              <TrashSVG className="svgIconButton center" />
            </Button>
          </div>
        </Card.Header>
        <Card.Text className="fighterBody">
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
              <div className="pointsFighter">
                <div className="lep">
                  <Points
                    name="LeP"
                    current={props.fighter.LeP}
                    maxPoints={props.fighter.maxLep}
                    setPoint={setPoint}
                    subP
                  />
                </div>
                {props.fighter.maxAsp > 0 ? (
                  <div className="asp">
                    <Points
                      name="AsP"
                      current={props.fighter.AsP}
                      maxPoints={props.fighter.maxAsp}
                      setPoint={setPoint}
                      subP
                    />
                  </div>
                ) : (
                  ""
                )}
                {props.fighter.maxKap > 0 ? (
                  <div className="kap">
                    <Points
                      name="KaP"
                      current={props.fighter.KaP}
                      maxPoints={props.fighter.maxKap}
                      setPoint={setPoint}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <ConditionBox
                  conditions={props.fighter.conditions}
                  changeCondition={changeFighterCondition}
                  deleteCondition={deleteCondition}
                />
              </div>
            </Col>
          </Row>
        </Card.Text>
        <div className="initiative">{props.fighter.initiative}</div>
      </Card>
    </div>
  );
}
