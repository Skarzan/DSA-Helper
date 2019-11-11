import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../../styles/LandingPage/CallToActionButton.scss";

export default props => {
  return (
    <div className="CallToActionButton">
      <Link to={props.link}>
        <Button variant="primary" size="lg">
          {props.text}
        </Button>
      </Link>
    </div>
  );
};
