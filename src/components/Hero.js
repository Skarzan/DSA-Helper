import React from "react";
import Purse from "./Purse";
import Points from "./Points";
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


import "../styles/hero.scss";

export default function Hero(props) {
  return (

    <div className="hero">

      <Card>
        <Card.Header as="h4">{props.hero.name}</Card.Header>
        <Card.Text className="heroInner">
          <Row className="row">
            <Col sm="12">
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
              </Col>
              
            </Row>
            <Row>
              <Col>
                <Purse startMoney={props.hero.money} />
              </Col>
            </Row>
      </Card.Text>      
    </Card>
    </div>
  );
}
