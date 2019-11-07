import React from "react";
import Button from "react-bootstrap/Button";

export default props => {
  return (
    <div className="CallToActionButton">
      <a href={props.link}>
        <Button variant="primary" size="lg">
          {props.text}
        </Button>
      </a>
    </div>
  );
};
