import React from "react";
import CallToActionButton from "./CallToActionButton";

import "../../styles/LandingPage/TextWithCTO.scss";

/**
 * Renders a full-width section with a text and a CallToAction button. This component takes values to display from its props.
 * @param   {Object}  props             the props
 * @param   {String}  props.text        the text to display
 * @param   {String}  props.buttonText  the text of the button
 * @param   {String}  props.buttonLink  the URL of the link the button sends the user on click
 * @param   {String}  props.background  a CSS-background expression to diplay the background color
 */
export default props => {
  /* create a style object from the given prop and direction */
  const styleFromProps = {
    background: props.background
  };

  return (
    <div className="TextWithCTO" style={styleFromProps}>
      <div className="text" data-aos="fade-down">
        {props.text}
      </div>
      <div data-aos="fade-up">
        <CallToActionButton
          text={props.buttonText}
          link={props.buttonLink}
        ></CallToActionButton>
      </div>
    </div>
  );
};
