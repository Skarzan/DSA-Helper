import React, { useState } from "react";
import Points from "./Points";
import ConditionsAddBox from "./ConditionsAddBox";
import ConditionBox from "./ConditionBox";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "../styles/fighterCard.scss";

export default function FighterCard(props) {
  const [showConditionsAddBox, setShowConditionsAddBox] = useState(false);

  const changeFighterCondition = condition => {
    props.changeCondition(props.fighter.id, condition);
  };

  const deleteCondition = conditionId => {
    props.deleteCondition(props.fighter.id, conditionId);
  };

  const addCondition = condition => {
    props.addCondition(props.fighter.id, condition);
    setShowConditionsAddBox(!showConditionsAddBox);
  };

  return (
    <div className="fighterCard">
      <Card className={props.status + " status"}>
        <Card.Header as="h4" className="fighterCardHeader">
          <div>{props.fighter.name}</div>
          <div className="fighterButtons">
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
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                props.killFighter(props.fighter.id);
              }}
            >
              X
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
              <div className="pointsHero">
                <div className="lep">
                  <Points
                    name="LeP"
                    current={props.fighter.maxLep}
                    maxPoints={props.fighter.maxLep}
                  />
                </div>
                {props.fighter.maxAsp > 0 ? (
                  <div className="asp">
                    <Points
                      name="AsP"
                      current={props.fighter.maxAsp}
                      maxPoints={props.fighter.maxAsp}
                    />
                  </div>
                ) : (
                  ""
                )}
                {props.fighter.maxKap > 0 ? (
                  <div className="kap">
                    <Points
                      name="KaP"
                      current={props.fighter.maxKap}
                      maxPoints={props.fighter.maxKap}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>Initiative: {props.fighter.initiative}</div>
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
      </Card>
    </div>
  );
}
