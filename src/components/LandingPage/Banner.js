import React from "react";
import CallToActionButton from "./CallToActionButton";

import "../../styles/LandingPage/Banner.scss";

export default props => {
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
