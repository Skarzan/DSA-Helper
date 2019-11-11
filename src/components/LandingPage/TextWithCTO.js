import React from "react";
import CallToActionButton from "./CallToActionButton";

import "../../styles/LandingPage/TextWithCTO.scss";

export default props => {
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
