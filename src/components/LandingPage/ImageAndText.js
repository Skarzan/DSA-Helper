import React from "react";

import "../../styles/LandingPage/ImageAndText.scss";

export default props => {
  const setDirectionBasedOnProp = () => {
    if (props.textPositionLeft) {
      return "row";
    } else {
      return "row-reverse";
    }
  };

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
        <img src={props.imageURL} alt="altText" />
      </div>
    </div>
  );
};
