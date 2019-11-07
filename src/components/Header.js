import React from "react";
import { NavLink } from "react-router-dom";
import LoginIcon from "./LoginIcon";
import Logo from "./Logo";

import "../styles/header.scss";

//array of the site links
const menuLinks = [
  /*   {
    name: "Home",
    link: "/"
  }, */
  {
    name: "Helden",
    link: "/heldengruppe"
  },
  {
    name: "Kampf",
    link: "/kampfmanager"
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
        <div className="link" key={link.name}>
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
        <div className="menu">
          <NavLink exact to={"/"} className="logoContainer">
            <Logo></Logo>
          </NavLink>
          <div className="menuLinks">
            {createLinks()}
            <LoginIcon></LoginIcon>
          </div>
        </div>
      </nav>
    </div>
  );
};
