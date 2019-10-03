import React from "react";

import "../styles/logo.scss";

/**
 * Displays the Logo of the site
 */
const Logo = () => {
  // TODO: add Link

  return (
    <div id="Logo">
      <img src={require("../assets/img/Logo2.png")} alt="logo" />
    </div>
  );
};

export default Logo;
