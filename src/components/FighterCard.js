import React from "react";
import Points from "./Points";
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import "../styles/fighterCard.scss"

export default function FighterCard(props) {
  return (
    <div className="fighterCard">
      <Card>
        <Card.Header as="h4">{props.fighter.name}</Card.Header>
        <Card.Text className="heroInner">
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
              </Col>
              
            </Row>
      </Card.Text>      
    </Card>

    </div>
  );
}
