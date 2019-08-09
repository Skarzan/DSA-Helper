import React from "react";
import { NavLink, Switch } from "react-router-dom";

import "../styles/header.scss";

const menuLinks = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "Helden",
    link: "/"
  },
  {
    name: "Kampf",
    link: "/battle"
  }
];

export default () => {
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
      <div className="menu">{createLinks()}</div>
    </div>
  );
};
