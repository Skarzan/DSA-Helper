import React from "react";

import "../../styles/LandingPage/Advantage.scss";

export default props => {
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
