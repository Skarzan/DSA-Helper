import React, { useState } from "react";
import Purse from "./Purse";
import Points from "./Points";
import ConditionsAddBox from "./ConditionsAddBox";
import ConditionBox from "./ConditionBox";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/hero.scss";

//create Context with hero ID
const HeroId = React.createContext(0);

export default function Hero(props) {
  const [showConditionsAddBox, setShowConditionsAddBox] = useState(false);

  return (
    <div className="hero">
      <HeroId.Provider value={props.hero.id}>
        <Card>
          <Card.Header as="h4">
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
                  <ConditionsAddBox
                    closeBox={() => {
                      setShowConditionsAddBox(!showConditionsAddBox);
                    }}
                  />
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
                  <ConditionBox conditions={props.hero.conditions} />
                </div>
              </Col>
            </Row>
          </Card.Text>
        </Card>
      </HeroId.Provider>
    </div>
  );
}

export { HeroId };
