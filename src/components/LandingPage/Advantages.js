import React from "react";
import Advantage from "./Advantage";

import "../../styles/LandingPage/Advantages.scss";

/**
 *Creates and renders a list of Advantage-components from a given array of objects.
 * @param {Object}                                                                            props             the props
 * @param {Array.<{text: String, description: String, imageSrc: String, altText: String, backgroundFront: String, backgroundBack: String}>}     props.advantages  array of advantage objects with the text, altText, imagaeSrc and background for all advantages to display
 */
export default props => {
  /**
   * Creates Advantage -components for all advantages in the props.advantages and give them their values
   */
  const renderAdvantages = () => {
    return props.advantages.map(advantage => {
      return (
        <Advantage
          key={advantage.text}
          text={advantage.text}
          imageSrc={advantage.imageSrc}
          altText={advantage.altText}
          backgroundFront={advantage.backgroundFront}
          backgroundBack={advantage.backgroundBack}
          description={advantage.description}
        ></Advantage>
      );
    });
  };

  return <div class="Advantages">{renderAdvantages()}</div>;
};
