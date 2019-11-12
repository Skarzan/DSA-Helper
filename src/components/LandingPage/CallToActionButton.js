import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../../styles/LandingPage/CallToActionButton.scss";

/**
 * Renders a CallToAction button with a given text and link
 * @param {Object}  props the props
 * @param {String}  props.text  the text to display on the button
 * @param {String}  props.link  the URL of the link the button sends the user on click
 */
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
