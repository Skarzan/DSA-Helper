import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";

import "../styles/header.scss";

//array of the site links
const menuLinks = [
  /*   {
    name: "Home",
    link: "/"
  }, */
  {
    name: "Helden",
    link: "/"
  },
  {
    name: "Kampf",
    link: "/battle"
  }
];

/**
 * Renders a header with a menu
 */
export default () => {
  /**
   * Creates a list of NavLinks components. Uses React Router.
   */
  const createLinks = () => {
    return menuLinks.map(link => {
      return (
        <div className="link">
          <NavLink
            className="menuLink"
            exact
            activeClassName="activeMenuLink"
            to={link.link}
          >
            {link.name}
          </NavLink>
        </div>
      );
    });
  };

  return (
    <div className="header">
      <nav>
        <div className="menu">{createLinks()}</div>
      </nav>
    </div>
  );
};
