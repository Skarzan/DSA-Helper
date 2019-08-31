import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/header.scss";

import firebaseDB from "../firebase/firebase";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { setAllHeroes } from "../actions";

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
  const dispatch = useDispatch();
  const heroes = useSelector(state => state.heroes);
  const setFireBaseHeroes = () => {
    firebaseDB
      .collection("DSA")
      .doc("heroes")
      .set({ heroes })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };
  const loadFireBaseHeroes = () => {
    let fireHeroes;
    firebaseDB
      .collection("DSA")
      .doc("heroes")
      .get()
      .then(doc => {
        dispatch(setAllHeroes([...doc.data().heroes]));
      });
  };

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
          <div className="menuLink" onClick={loadFireBaseHeroes}>
            load
          </div>
          <div className="menuLink" onClick={setFireBaseHeroes}>
            save
          </div>
          {createLinks()}
        </div>
      </nav>
    </div>
  );
};
