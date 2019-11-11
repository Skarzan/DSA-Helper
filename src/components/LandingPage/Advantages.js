import React from "react";
import Advantage from "./Advantage";

import "../../styles/LandingPage/Advantages.scss";

export default props => {
  const renderAdvantages = advantage => {
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
