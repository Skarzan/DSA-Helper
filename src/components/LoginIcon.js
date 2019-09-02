import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fire from "../firebase/firebase";
import Col from "react-bootstrap/Col";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setAllHeroes, addToast } from "../actions";

import "../styles/LoginIcon.scss";

export default function LoginIcon() {
  const firebaseDB = fire.firestore();
  const dispatch = useDispatch();
  const heroes = useSelector(state => state.heroes);

  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({
    name: "",
    password: ""
  });
  const [show, setShow] = useState(false);

  const setShowStatus = () => {
    show ? setShow("") : setShow("show");
  };

  const setFireBaseHeroes = () => {
    firebaseDB
      .collection("heroes")
      .doc(user)
      .set({ heroes })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    setShowStatus();
    dispatch(addToast(["Heldengruppe", "Heldengruppe gespeichert"]));
  };
  const loadFireBaseHeroes = () => {
    firebaseDB
      .collection("heroes")
      .doc(user)
      .get()
      .then(doc => {
        dispatch(setAllHeroes([...doc.data().heroes]));
      });
    setShowStatus();
    dispatch(addToast(["Heldengruppe", "Heldengruppe geladen"]));
  };

  useEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
  };

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(loginData.name, loginData.password);
    setShowStatus();
    dispatch(addToast(["Login", "Erfolgreich eingeloggt"]));
  };

  const logout = e => {
    e.preventDefault();
    fire.auth().signOut();
    setShowStatus();
    dispatch(addToast(["Logout", "Erfolgreich ausgeloggt"]));
  };

  const register = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(loginData.name, loginData.password);
    setShowStatus();
    dispatch(
      addToast([
        "Registriert",
        "Erfolgreich registriert. Du kannst nun Heldengruppen speichern"
      ])
    );
  };

  return (
    <div className="LoginIcon">
      <div className="icon logInIcon" onClick={() => setShowStatus()}>
        {user ? (
          <div className="loggedIn"> </div>
        ) : (
          <div className="loggedOut"></div>
        )}
      </div>
      {user ? (
        <div className={`saveMenu overlay ${show}`}>
          <div className="buttons">
            <Button onClick={loadFireBaseHeroes}>Gruppe laden</Button>
            <Button onClick={setFireBaseHeroes}>Gruppe speichern</Button>
          </div>
          <div className="logoutArea">
            <a type="submit" onClick={e => logout(e)}>
              Ausloggen
            </a>
          </div>
        </div>
      ) : (
        <div className={`loginForm overlay ${show}`}>
          <Form>
            <Form.Row>
              <div>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
                  name="name"
                  onChange={e => handleChange(e)}
                  value={loginData.name}
                ></Form.Control>
              </div>

              <div>
                <Form.Label>Passwort</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={e => handleChange(e)}
                  value={loginData.password}
                ></Form.Control>
              </div>
            </Form.Row>
            <Form.Row className="loginButtons">
              <Col>
                <Button type="submit" onClick={e => login(e)}>
                  Einloggen
                </Button>
              </Col>
              <Col>
                <Button type="submit" onClick={e => register(e)}>
                  Registrieren
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </div>
      )}
    </div>
  );
}
