import React from "react";
import CallToActionButton from "./CallToActionButton";

import "../../styles/LandingPage/Banner.scss";

/**
 * Renders a Banner with a describing text and CallToAction button on the left site and an image on the right site.
 * The Banner tries to have a size of fullscreen minus the menubar. Get several attributes as props to display.
 * @param {Object}  props             the props
 * @param {String}  props.header      the headline of the text
 * @param {String}  props.subheader   the subheader of the text
 * @param {String}  props.ctaText     the text of the CallToAction button
 * @param {String}  props.ctaLink     the url the CallToAction button should link
 * @param {String}  props.imageURL    the filepath to the image
 * @param {String}  props.alt         the alt text for the image
 * @param {String}  props.background  a CSS-background expression to diplay the background color, background-images are possible
 */
export default props => {
  /* create a style object from the given prop */
  const background = {
    backgroundImage: props.background
  };

  return (
    <div className="banner" style={background}>
      <div
        className="banner-left"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="banner-header">{props.header}</div>
        <div className="banner-subheader">{props.subheader}</div>
        <CallToActionButton
          text={props.ctaText}
          link={props.ctaLink}
        ></CallToActionButton>
      </div>
      <div className="banner-right">
        <img
          data-aos="fade-left"
          data-aos-duration="1000"
          src={props.imageURL}
          alt={props.alt}
        />
      </div>
    </div>
  );
};
