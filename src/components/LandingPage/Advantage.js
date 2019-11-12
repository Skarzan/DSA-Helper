import React from "react";

import "../../styles/LandingPage/Advantage.scss";

/**
 * Renders a rectangle with a front and a back. On the front there is a given text on a given background color. On the back there is an image.
 * On hover the front will get transparent and reveal the back.
 * @param {Object}  props             the props
 * @param {String}  props.background  a CSS-background expression to siplay the background color of the front
 * @param {String}  props.imageSrc    the path to the image of the back
 * @param {String}  props.altText     the text for the HTML attribute "alt"
 * @param {String}  props.text        text to display on the front
 */
export default props => {
  /* create a style object from the given prop for the front */
  const styleFromProps = {
    background: props.background
  };

  return (
    <div className="Advantage" data-aos="fade-up">
      <div className="back">
        <img src={props.imageSrc} alt={props.altText} />
      </div>
      <div className="front" style={styleFromProps}>
        <div className="frontText">{props.text}</div>
      </div>
    </div>
  );
};
