import React, { useState } from "react";

import "../../styles/LandingPage/Advantage.scss";

/**
 * Renders a rectangle with a front and a back. On the front there is a given text on a given background color. On the back there is an image.
 * On hover the front will get transparent and reveal the back.
 * @param {Object}  props                   the props
 * @param {String}  props.backgroundFront   a CSS-background expression to siplay the background color of the front
 * @param {String}  props.backgroundBack    a CSS-background expression to siplay the background color of the back
 * @param {String}  props.imageSrc          the path to the image of the back
 * @param {String}  props.altText           the text for the HTML attribute "alt"
 * @param {String}  props.text              text to display on the front
 * @param {String} props.description        the description on the back
 */
export default props => {
  const [hover, setHover] = useState(false);

  /* create a style object from the given prop for the front */
  const backgroundFront = {
    background: props.backgroundFront
  };

  /* create a style object from the given prop for the back */
  const backgroundBack = {
    background: props.backgroundBack
  };

  /* TODO: test on real mobile device.m Check if aos and flip effect work */
  return (
    <div
      className={`Advantage ${hover ? "hover" : ""}`}
      onTouchStart={() => (hover ? setHover(false) : setHover(true))}
      data-aos="fade-up"
      data-aos-disable="mobile"
    >
      <div class="flip">
        <div className="front" style={backgroundFront}>
          <div className="frontText">{props.text}</div>
        </div>
        <div className="back" style={backgroundBack}>
          <img src={props.imageSrc} alt={props.altText} />
          <div>{props.description}</div>
        </div>
      </div>
    </div>
  );
};
