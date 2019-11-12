import React from "react";

import "../../styles/LandingPage/ImageAndText.scss";

/**
 * Renders a section on the website that has a text in a box on one site, and an image on the other. The background is defined from the props.
 * If props.textPositionLeft is true the text is left and the image right. In anay other case the image is right and the text is left.
 * @param {Object}   props                   the props
 * @param {Boolean}  props.textPositionLeft  defines if the text and image is either left or right
 * @param {String}   props.background        a CSS-background expression to diplay the background color
 * @param {String}   props.text              the text to display
 * @param {String}   props.imageURL          the filepath to the image
 * @param {String}   props.altText           the alt text for the image
 */
export default props => {
  /**
   * Retuns a CSS value to display the text left or right, depending on props.textPositionLeft
   * @returns {String} the CSS value for the flex-direction
   */
  const setDirectionBasedOnProp = () => {
    if (props.textPositionLeft) {
      return "row";
    } else {
      return "row-reverse";
    }
  };

  /* create a style object from the given prop and direction */
  const stylesFromProps = {
    flexDirection: setDirectionBasedOnProp(),
    background: props.background
  };

  return (
    <div class="ImageAndText" style={stylesFromProps}>
      <div class="textSection" data-aos="fade-up">
        <div class="text">{props.text}</div>
      </div>
      <div class="imageSection" data-aos="fade-up">
        <img src={props.imageURL} alt={props.altText} />
      </div>
    </div>
  );
};
