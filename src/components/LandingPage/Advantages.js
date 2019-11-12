import React from "react";
import Advantage from "./Advantage";

import "../../styles/LandingPage/Advantages.scss";

/**
 *Creates and renders a list of Advantage-components from a given array of objects.
 * @param {Object}                                                                            props             the props
 * @param {Array.<{text: String, imageSrc: String, altText: String, background: String}>}     props.advantages  array of advantage objects with the text, altText, imagaeSrc and background for all advantages to display
 */
export default props => {
  /**
   * Creates Advantage -components for all advantages in the props.advantages and give them their values
   */
  const renderAdvantages = () => {
    return props.advantages.map(advantage => {
      return (
        <Advantage
          text={advantage.text}
          imageSrc={advantage.imageSrc}
          altText={advantage.altText}
          background={advantage.background}
        ></Advantage>
      );
    });
  };

  return <div class="Advantages">{renderAdvantages()}</div>;
};
